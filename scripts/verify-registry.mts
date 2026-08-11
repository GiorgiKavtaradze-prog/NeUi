/// <reference types="node" />

import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "..")
const STYLES_DIR = path.join(PROJECT_ROOT, "public", "r", "styles")

const SCAFFOLD_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "@types/react",
  "@types/react-dom",
])

type RegistryFile = { path?: string; content?: unknown }
type RegistryItem = {
  name?: unknown
  type?: unknown
  files?: RegistryFile[]
  dependencies?: unknown
  registryDependencies?: unknown
}

function packageNameFromImport(specifier: string): string | null {
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("@/") ||
    specifier.startsWith("node:")
  ) {
    return null
  }
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    return parts.length >= 2 ? parts.slice(0, 2).join("/") : null
  }
  return specifier.split("/")[0] || null
}

function collectImportedPackages(content: string): Set<string> {
  const packages = new Set<string>()
  const patterns = [
    /\bfrom\s+["']([^"']+)["']/g, // import/export ... from "x"
    /\bimport\s+["']([^"']+)["']/g, // side-effect import "x"
    /\bimport\(\s*["']([^"']+)["']\s*\)/g, // dynamic import("x")
    /\brequire\(\s*["']([^"']+)["']\s*\)/g, // require("x")
  ]
  for (const pattern of patterns) {
    let match: RegExpExecArray | null
    while ((match = pattern.exec(content)) !== null) {
      const name = packageNameFromImport(match[1] ?? "")
      if (name) packages.add(name)
    }
  }
  return packages
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === "string" && entry.trim().length > 0)
  )
}

async function main() {
  const startTime = Date.now()
  const errors: string[] = []
  let itemCount = 0

  const ALIGN_STYLES = ["base-nova", "radix-nova"] as const
  const examplesByStyle = new Map<string, Set<string>>(
    ALIGN_STYLES.map((style) => [style, new Set<string>()])
  )

  let styleDirs: string[]
  try {
    styleDirs = (await fs.readdir(STYLES_DIR, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  } catch {
    console.error(
      `verify-registry: ${STYLES_DIR} not found. Run registry:build first.`
    )
    process.exit(1)
  }

  for (const styleName of styleDirs) {
    const styleDir = path.join(STYLES_DIR, styleName)
    const files = (await fs.readdir(styleDir)).filter((f) =>
      f.endsWith(".json")
    )

    for (const entry of files) {
      if (entry === "index.json" || entry === "registry.json") {
        try {
          JSON.parse(await fs.readFile(path.join(styleDir, entry), "utf-8"))
        } catch (error) {
          errors.push(`${styleName}/${entry}: invalid JSON (${String(error)})`)
        }
        continue
      }

      const id = `${styleName}/${entry}`
      let item: RegistryItem
      try {
        item = JSON.parse(
          await fs.readFile(path.join(styleDir, entry), "utf-8")
        )
      } catch (error) {
        errors.push(`${id}: invalid JSON (${String(error)})`)
        continue
      }
      itemCount++

      if (typeof item.name !== "string" || typeof item.type !== "string") {
        errors.push(`${id}: missing or invalid "name"/"type"`)
      }

      if (
        item.type === "registry:block" &&
        typeof item.name === "string" &&
        examplesByStyle.has(styleName)
      ) {
        examplesByStyle.get(styleName)!.add(item.name)
      }
      if (
        item.dependencies !== undefined &&
        !isStringArray(item.dependencies)
      ) {
        errors.push(
          `${id}: "dependencies" is not an array of non-empty strings`
        )
      }
      if (
        item.registryDependencies !== undefined &&
        !isStringArray(item.registryDependencies)
      ) {
        errors.push(
          `${id}: "registryDependencies" is not an array of non-empty strings`
        )
      }

      const declaredDeps = new Set(
        isStringArray(item.dependencies) ? item.dependencies : []
      )

      if (!Array.isArray(item.files)) {
        errors.push(`${id}: missing "files" array`)
        continue
      }

      const missingDeps = new Set<string>()
      for (const file of item.files) {
        const content = file?.content
        if (typeof content !== "string" || content.length === 0) {
          errors.push(`${id}: file "${file?.path}" has no content`)
          continue
        }

        if (
          /@\/registry-neui\//.test(content) ||
          /@\/registry\/bases\//.test(content)
        ) {
          errors.push(`${id}: file "${file.path}" leaks a registry import path`)
        }
        if (
          /\bstyle-(?:vega|nova|maia|lyra|mira|luma|sera|rhea):/.test(content)
        ) {
          errors.push(`${id}: file "${file.path}" leaks a style-*: token`)
        }

        // Dependency completeness.
        for (const pkg of collectImportedPackages(content)) {
          if (SCAFFOLD_PACKAGES.has(pkg)) continue
          if (!declaredDeps.has(pkg)) missingDeps.add(pkg)
        }
      }

      if (missingDeps.size > 0) {
        errors.push(
          `${id}: imports not declared in "dependencies": ${[...missingDeps]
            .sort()
            .join(", ")}`
        )
      }
    }
  }

  const baseExamples = examplesByStyle.get("base-nova")!
  const radixExamples = examplesByStyle.get("radix-nova")!
  const onlyBase = [...baseExamples].filter((n) => !radixExamples.has(n)).sort()
  const onlyRadix = [...radixExamples]
    .filter((n) => !baseExamples.has(n))
    .sort()
  const preview = (names: string[]) =>
    `${names.slice(0, 20).join(", ")}${names.length > 20 ? ", ..." : ""}`
  if (onlyBase.length > 0) {
  }
  if (onlyRadix.length > 0) {
    errors.push(
      `base/radix install misalignment: ${onlyRadix.length} example(s) built for radix-nova but not base-nova (the base AI-prompt install guide would 404): ${preview(onlyRadix)}`
    )
  }

  if (errors.length > 0) {
    console.error(`verify-registry: FAILED with ${errors.length} issue(s):`)
    for (const error of errors) console.error(`  - ${error}`)
    process.exit(1)
  }
}

main().catch((error) => {
  process.exit(1)
})
