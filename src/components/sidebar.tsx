import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'CLI', href: '/docs/cli' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Accordion', href: '/docs/components/accordion' },
      { title: 'Alert', href: '/docs/components/alert' },
      { title: 'Alert Dialog', href: '/docs/components/alert-dialog' },
      { title: 'Aspect Ratio', href: '/docs/components/aspect-ratio' },
      { title: 'Avatar', href: '/docs/components/avatar' },
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Calendar', href: '/docs/components/calendar' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Carousel', href: '/docs/components/carousel' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Collapsible', href: '/docs/components/collapsible' },
      { title: 'Combobox', href: '/docs/components/combobox' },
      { title: 'Command', href: '/docs/components/command' },
      { title: 'Context Menu', href: '/docs/components/context-menu' },
      { title: 'Data Table', href: '/docs/components/data-table' },
      { title: 'Dialog', href: '/docs/components/dialog' },
      { title: 'Drawer', href: '/docs/components/drawer' },
      { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
      { title: 'Empty State', href: '/docs/components/empty-state' },
      { title: 'Error State', href: '/docs/components/error-state' },
      { title: 'Form', href: '/docs/components/form' },
      { title: 'Hover Card', href: '/docs/components/hover-card' },
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Label', href: '/docs/components/label' },
      { title: 'Loader', href: '/docs/components/loader' },
      { title: 'Map View', href: '/docs/components/map-view' },
      { title: 'Menu Item', href: '/docs/components/menu-item' },
      { title: 'Popover', href: '/docs/components/popover' },
      { title: 'Progress', href: '/docs/components/progress' },
      { title: 'Radio Group', href: '/docs/components/radio-group' },
      { title: 'Searchable Map', href: '/docs/components/searchable-map' },
      { title: 'Select', href: '/docs/components/select' },
      { title: 'Selection Card', href: '/docs/components/selection-card' },
      { title: 'Separator', href: '/docs/components/separator' },
      { title: 'Sheet', href: '/docs/components/sheet' },
      { title: 'Skeleton', href: '/docs/components/skeleton' },
      { title: 'Slider', href: '/docs/components/slider' },
      { title: 'Sonner', href: '/docs/components/sonner' },
      { title: 'Star Rating', href: '/docs/components/star-rating' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Table', href: '/docs/components/table' },
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Text', href: '/docs/components/text' },
      { title: 'Textarea', href: '/docs/components/textarea' },
      { title: 'Toast', href: '/docs/components/toast' },
      { title: 'Toggle', href: '/docs/components/toggle' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 overflow-y-auto">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <nav className="space-y-6 mb-10">
          {navigation.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm hover:underline',
                      location.pathname === item.href
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
