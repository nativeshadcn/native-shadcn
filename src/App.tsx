import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
// import { Footer } from './components/footer'
import { Home } from './pages/home'
import { Installation } from './pages/installation'
import { CLI } from './pages/cli'
import { AvatarDoc } from './pages/components/avatar'
import { BadgeDoc } from './pages/components/badge'
import { ButtonDoc } from './pages/components/button'
import { CardDoc } from './pages/components/card'
import { InputDoc } from './pages/components/input'
import { TextDoc } from './pages/components/text'
import { CheckboxDoc } from './pages/components/checkbox'
import { LabelDoc } from './pages/components/label'
import { RadioGroupDoc } from './pages/components/radio-group'
import { SliderDoc } from './pages/components/slider'
import { SwitchDoc } from './pages/components/switch'
import { SelectDoc } from './pages/components/select'
import { DialogDoc } from './pages/components/dialog'
import { SheetDoc } from './pages/components/sheet'
import { PopoverDoc } from './pages/components/popover'
import { TooltipDoc } from './pages/components/tooltip'
import { TabsDoc } from './pages/components/tabs'
import { AccordionDoc } from './pages/components/accordion'
import { AlertDoc } from './pages/components/alert'
import { AlertDialogDoc } from './pages/components/alert-dialog'
import { ProgressDoc } from './pages/components/progress'
import { SkeletonDoc } from './pages/components/skeleton'
import { ToastDoc } from './pages/components/toast'
import { SeparatorDoc } from './pages/components/separator'
import { ComboboxDoc } from './pages/components/combobox'
import { CommandDoc } from './pages/components/command'
import { DropdownMenuDoc } from './pages/components/dropdown-menu'
import { TextareaDoc } from './pages/components/textarea'
import { ToggleDoc } from './pages/components/toggle'
import { ContextMenuDoc } from './pages/components/context-menu'
import { CollapsibleDoc } from './pages/components/collapsible'
import { CalendarDoc } from './pages/components/calendar'
import { DrawerDoc } from './pages/components/drawer'
import { AspectRatioDoc } from './pages/components/aspect-ratio'
import { FormDoc } from './pages/components/form'
import { HoverCardDoc } from './pages/components/hover-card'
import { SonnerDoc } from './pages/components/sonner'
import { TableDoc } from './pages/components/table'
import { DataTableDoc } from './pages/components/data-table'
import { CarouselDoc } from './pages/components/carousel'
import { EmptyStateDoc } from './pages/components/empty-state'
import { ErrorStateDoc } from './pages/components/error-state'
import { LoaderDoc } from './pages/components/loader'
import { MenuItemDoc } from './pages/components/menu-item'
import { SelectionCardDoc } from './pages/components/selection-card'
import { StarRatingDoc } from './pages/components/star-rating'
import { MapViewDoc } from './pages/components/map-view'
import { SearchableMapDoc } from './pages/components/searchable-map'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="container">
          <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar />
            <main className="relative py-6 lg:gap-10 lg:py-8">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs/installation" element={<Installation />} />
              <Route path="/docs/cli" element={<CLI />} />
              <Route path="/docs/components/avatar" element={<AvatarDoc />} />
              <Route path="/docs/components/badge" element={<BadgeDoc />} />
              <Route path="/docs/components/button" element={<ButtonDoc />} />
              <Route path="/docs/components/card" element={<CardDoc />} />
              <Route path="/docs/components/carousel" element={<CarouselDoc />} />
              <Route path="/docs/components/input" element={<InputDoc />} />
              <Route path="/docs/components/text" element={<TextDoc />} />
              <Route path="/docs/components/checkbox" element={<CheckboxDoc />} />
              <Route path="/docs/components/label" element={<LabelDoc />} />
              <Route path="/docs/components/radio-group" element={<RadioGroupDoc />} />
              <Route path="/docs/components/slider" element={<SliderDoc />} />
              <Route path="/docs/components/switch" element={<SwitchDoc />} />
              <Route path="/docs/components/select" element={<SelectDoc />} />
              <Route path="/docs/components/dialog" element={<DialogDoc />} />
              <Route path="/docs/components/sheet" element={<SheetDoc />} />
              <Route path="/docs/components/popover" element={<PopoverDoc />} />
              <Route path="/docs/components/tooltip" element={<TooltipDoc />} />
              <Route path="/docs/components/tabs" element={<TabsDoc />} />
              <Route path="/docs/components/accordion" element={<AccordionDoc />} />
              <Route path="/docs/components/alert" element={<AlertDoc />} />
              <Route path="/docs/components/alert-dialog" element={<AlertDialogDoc />} />
              <Route path="/docs/components/progress" element={<ProgressDoc />} />
              <Route path="/docs/components/skeleton" element={<SkeletonDoc />} />
              <Route path="/docs/components/toast" element={<ToastDoc />} />
              <Route path="/docs/components/separator" element={<SeparatorDoc />} />
              <Route path="/docs/components/combobox" element={<ComboboxDoc />} />
              <Route path="/docs/components/command" element={<CommandDoc />} />
              <Route path="/docs/components/dropdown-menu" element={<DropdownMenuDoc />} />
              <Route path="/docs/components/textarea" element={<TextareaDoc />} />
              <Route path="/docs/components/toggle" element={<ToggleDoc />} />
              <Route path="/docs/components/context-menu" element={<ContextMenuDoc />} />
              <Route path="/docs/components/collapsible" element={<CollapsibleDoc />} />
              <Route path="/docs/components/calendar" element={<CalendarDoc />} />
              <Route path="/docs/components/drawer" element={<DrawerDoc />} />
              <Route path="/docs/components/aspect-ratio" element={<AspectRatioDoc />} />
              <Route path="/docs/components/form" element={<FormDoc />} />
              <Route path="/docs/components/hover-card" element={<HoverCardDoc />} />
              <Route path="/docs/components/sonner" element={<SonnerDoc />} />
              <Route path="/docs/components/table" element={<TableDoc />} />
              <Route path="/docs/components/data-table" element={<DataTableDoc />} />
              <Route path="/docs/components/empty-state" element={<EmptyStateDoc />} />
              <Route path="/docs/components/error-state" element={<ErrorStateDoc />} />
              <Route path="/docs/components/loader" element={<LoaderDoc />} />
              <Route path="/docs/components/menu-item" element={<MenuItemDoc />} />
              <Route path="/docs/components/selection-card" element={<SelectionCardDoc />} />
              <Route path="/docs/components/star-rating" element={<StarRatingDoc />} />
              <Route path="/docs/components/map-view" element={<MapViewDoc />} />
              <Route path="/docs/components/searchable-map" element={<SearchableMapDoc />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default App
