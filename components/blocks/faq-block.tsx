import { type ReactNode } from "react"
import Link from "next/link"

import { getFAQCategories } from "@/lib/data/faq-data"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heading } from "@/components/custom/heading"
import { PageGridBackdrop } from "@/components/page-grid-backdrop"

const FAQ_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function renderAnswer(answer: string): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  FAQ_LINK_RE.lastIndex = 0
  while ((match = FAQ_LINK_RE.exec(answer)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(answer.slice(lastIndex, match.index))
    }
    const [, label, href] = match
    const linkClass = "text-site-primary underline underline-offset-2"
    nodes.push(
      href.startsWith("/") ? (
        <Link key={key++} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={key++} href={href} className={linkClass}>
          {label}
        </a>
      )
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < answer.length) {
    nodes.push(answer.slice(lastIndex))
  }
  return nodes
}

export async function FAQBlock() {
  const categories = await getFAQCategories()

  if (categories.length === 0) return null

  const defaultCategory = categories[0]?.id

  return (
    <section className="container-wrapper relative overflow-hidden py-16 lg:py-24">
      <PageGridBackdrop variant="section" />
      <div className="relative z-10 container">
        <Heading
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Browse questions by topic. Pick a tab, then click any question to reveal the answer."
          className="mb-6"
        />

        <div className="mx-auto max-w-3xl">
          <Tabs defaultValue={defaultCategory}>
            <div className="flex justify-center overflow-x-auto">
              <TabsList
                className={cn(
                  "bg-site-muted/60 dark:bg-site-muted/40 border-site-border/60",
                  "inline-flex h-auto w-fit items-center gap-1 rounded-full! border p-0.5"
                )}
              >
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={cn(
                      "h-auto flex-none rounded-full! border-0",
                      "focus-visible:ring-site-ring relative inline-flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none",
                      "data-[state=active]:bg-site-primary data-[state=active]:text-site-primary-foreground data-[state=active]:shadow-sm",
                      "text-site-muted-foreground hover:text-site-foreground"
                    )}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-8"
              >
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-site-accent-foreground text-base leading-relaxed">
                        {renderAnswer(faq.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
