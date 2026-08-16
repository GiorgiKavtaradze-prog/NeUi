"use client"

import { CODE_SNIPPETS } from "@/constants/demo-content"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <div className="flex flex-col gap-3 py-4">
      <Tabs defaultValue="react">
        <TabsList className="bg-site-muted/60 w-full">
          {CODE_SNIPPETS.map((s) => (
            <TabsTrigger key={s.id} value={s.id} className="flex-1 text-xs">
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {CODE_SNIPPETS.map((s) => (
          <TabsContent key={s.id} value={s.id}>
            <div className="bg-site-muted/40 border-site-border relative mt-2 rounded-lg border p-3">
              <pre className="text-site-foreground/80 overflow-x-auto text-[11px] leading-relaxed">
                <code>{s.code}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
