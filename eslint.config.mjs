import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import { defineConfig, globalIgnores } from "eslint/config"

function stripReactRules(configs) {
  return configs.map((config) => {
    if (!config.rules) {
      return config
    }

    return {
      ...config,
      rules: Object.fromEntries(
        Object.entries(config.rules).filter(
          ([ruleName]) => !ruleName.startsWith("react/")
        )
      ),
    }
  })
}

export default defineConfig([
  ...stripReactRules(nextVitals),
  ...stripReactRules(nextTs),
  {
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated output (never hand-edited; see reui-project standards).
    ".source/**",
    "lib/generated/**",
    "public/**",
    "registry-neui/_meta/**",
  ]),
])
