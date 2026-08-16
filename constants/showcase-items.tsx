import {
  ChevronDownIcon,
  CodeIcon,
  CommandIcon,
  EyeIcon,
  LayersIcon,
  StarIcon,
  SwatchBookIcon,
} from "lucide-react"

import AccordionDemo from "@/components/accordion-demo"
import InputDemo from "@/components/input-demo"
import KbdDemo from "@/components/kbd-demo"
import RatingDemo from "@/components/rating-demo"
import StatsDemo from "@/components/stats-demo"
import TabsDemo from "@/components/tabs-demo"
import ThemeDemo from "@/components/theme-demo"

export interface ShowcaseItem {
  id: string
  name: string
  description: string
  icon: React.ElementType
  component: React.ReactNode
  badge?: string
  href: string
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "tabs",
    name: "Tabs",
    description:
      "Versatile tab component with smooth transitions and multi-framework code snippets.",
    icon: LayersIcon,
    component: <TabsDemo />,
    badge: "UI Pattern",
    href: "/components/tabs",
  },
  {
    id: "accordion",
    name: "Accordion",
    description:
      "Animated accordion with smooth expand/collapse — perfect for FAQs and menus.",
    icon: ChevronDownIcon,
    component: <AccordionDemo />,
    badge: "UI Pattern",
    href: "/components/accordion",
  },
  {
    id: "kbd",
    name: "Keyboard Shortcuts",
    description:
      "Beautiful keyboard shortcut display with platform-aware key styling.",
    icon: CommandIcon,
    component: <KbdDemo />,
    badge: "Primitive",
    href: "/components/kbd",
  },
  {
    id: "themes",
    name: "Theme System",
    description:
      "8 handcrafted themes — Vega, Nova, Lyra, Maia, and more — ready to go.",
    icon: SwatchBookIcon,
    component: <ThemeDemo />,
    badge: "Design",
    href: "/design-system",
  },
  {
    id: "stats",
    name: "Live Stats",
    description: "Animated counters and progress bars that engage on scroll.",
    icon: EyeIcon,
    component: <StatsDemo />,
    badge: "Interactive",
    href: "/components",
  },
  {
    id: "input",
    name: "CLI Input",
    description:
      "Styled input with command hint and one-click copy for install commands.",
    icon: CodeIcon,
    component: <InputDemo />,
    badge: "Utility",
    href: "/components/input",
  },
  {
    id: "rating",
    name: "Star Rating",
    description:
      "Animated rating component with hover effects and selection state.",
    icon: StarIcon,
    component: <RatingDemo />,
    badge: "Interactive",
    href: "/components/rating",
  },
]
