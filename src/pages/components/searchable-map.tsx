import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import searchablemapSource from '@templates/searchable-map?raw'

function SearchableMapPreview() {
  return (
    <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
      <div className="text-center space-y-2">
        <div className="text-6xl">🗺️🔍</div>
        <p className="text-sm text-muted-foreground">
          Map with integrated search and list
        </p>
        <p className="text-xs text-muted-foreground">
          (Preview requires react-native-maps)
        </p>
      </div>
    </div>
  )
}

export function SearchableMapDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Searchable Map</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A compositional searchable map component that combines map view with list, filters, and synchronized selection.
        </p>
      </div>

      <ComponentPreview
        name="SearchableMap"
        preview={<SearchableMapPreview />}
        code={`import {
  SearchableMap,
  SearchableMapView,
  SearchableMapList,
  SearchableMapListHeader,
  SearchableMapEmpty,
  SearchableMapFilters
} from '@/components/ui/searchable-map';
import { Sheet, SheetContent, SheetDragHandle } from '@/components/ui/sheet';

const sportsCenters = [
  { id: '1', latitude: 6.9271, longitude: 79.8612, name: 'Sports Center 1' },
  { id: '2', latitude: 6.9371, longitude: 79.8712, name: 'Sports Center 2' },
];

<SearchableMap>
  <SearchableMapView
    markers={sportsCenters}
    userLocation={{ latitude: 6.9271, longitude: 79.8612 }}
    radius={5}
  />

  <SearchableMapFilters onPress={() => {}} />

  <Sheet open>
    <SheetContent draggable minHeight={200} maxHeight={600}>
      <SheetDragHandle />
      <SearchableMapListHeader title="Results" count={sportsCenters.length} />
      <SearchableMapList
        data={sportsCenters}
        renderItem={(item, isSelected) => (
          <View className="p-4">
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </SheetContent>
  </Sheet>
</SearchableMap>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-ui add searchable-map map-view sheet"
        manual={searchablemapSource}
        dependencies={['react-native-maps', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  SearchableMap,
  SearchableMapView,
  SearchableMapList,
  SearchableMapListHeader,
  SearchableMapEmpty,
  SearchableMapFilters,
} from '@/components/ui/searchable-map';`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMap</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Root component that provides context for synchronized selection between map and list.
            </p>
            <CodeBlock
              code={`<SearchableMap
  selectedId={selectedId}
  onSelectedIdChange={setSelectedId}
  onMarkerPress={(id, data) => console.log('Marker:', id)}
  onItemPress={(item) => console.log('Item:', item)}
>
  {/* Children */}
</SearchableMap>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMapView</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Map view component that automatically syncs with the SearchableMap context.
            </p>
            <CodeBlock
              code={`<SearchableMapView
  markers={locations}
  userLocation={userLocation}
  radius={10}
  showRadius
  showUserLocation
  markerColor="#2563eb"
  selectedMarkerColor="#1e40af"
  renderMarker={(marker, isSelected) => <CustomMarker />}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMapList</h3>
            <p className="text-sm text-muted-foreground mb-4">
              List component that displays items and syncs selection with the map.
            </p>
            <CodeBlock
              code={`<SearchableMapList
  data={locations}
  renderItem={(item, isSelected) => (
    <View className={isSelected ? 'bg-accent' : ''}>
      <Text>{item.name}</Text>
    </View>
  )}
  contentContainerStyle={{ paddingBottom: 20 }}
  showsVerticalScrollIndicator={false}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMapListHeader</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Header component for the list.
            </p>
            <CodeBlock
              code={`<SearchableMapListHeader
  title="Sports Centers"
  description="Within 10km radius"
  count={sportsCenters.length}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMapEmpty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Empty state component when no results are found.
            </p>
            <CodeBlock
              code={`<SearchableMapEmpty
  title="No results found"
  description="Try adjusting your filters"
  icon={<Ionicons name="search-outline" size={48} />}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">SearchableMapFilters</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Floating filter button positioned over the map.
            </p>
            <CodeBlock
              code={`<SearchableMapFilters
  active={hasActiveFilters}
  onPress={() => setShowFilters(true)}
>
  <CustomFilterIcon />
</SearchableMapFilters>`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Complete Example</h2>
        <CodeBlock
          code={`import { useState } from 'react';
import { View, Text } from 'react-native';
import {
  SearchableMap,
  SearchableMapView,
  SearchableMapList,
  SearchableMapListHeader,
  SearchableMapEmpty,
  SearchableMapFilters
} from '@/components/ui/searchable-map';
import { Sheet, SheetContent, SheetDragHandle } from '@/components/ui/sheet';

export function SearchableMapExample() {
  const [showFilters, setShowFilters] = useState(false);

  const sportsCenters = [
    {
      id: '1',
      latitude: 6.9271,
      longitude: 79.8612,
      name: 'Downtown Sports Center',
      distance: 1.2,
      rating: 4.5
    },
    {
      id: '2',
      latitude: 6.9371,
      longitude: 79.8712,
      name: 'City Fitness Arena',
      distance: 2.5,
      rating: 4.8
    },
  ];

  const userLocation = { latitude: 6.9271, longitude: 79.8612 };

  return (
    <SearchableMap
      onMarkerPress={(id, data) => {
        console.log('Marker pressed:', id, data);
      }}
      onItemPress={(item) => {
        console.log('Item pressed:', item);
      }}
    >
      {/* Map */}
      <SearchableMapView
        markers={sportsCenters}
        userLocation={userLocation}
        radius={5}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {/* Filter Button */}
      <SearchableMapFilters
        active={showFilters}
        onPress={() => setShowFilters(true)}
      />

      {/* Draggable Bottom Sheet with List */}
      <Sheet open>
        <SheetContent
          draggable
          minHeight={200}
          maxHeight={600}
          className="p-0"
        >
          <SheetDragHandle />

          <SearchableMapListHeader
            title="Sports Centers"
            count={sportsCenters.length}
            description={\`Within 5 km radius\`}
          />

          {sportsCenters.length > 0 ? (
            <SearchableMapList
              data={sportsCenters}
              renderItem={(item, isSelected) => (
                <View className={\`p-4 border-b border-border \${
                  isSelected ? 'bg-accent' : ''
                }\`}>
                  <Text className="font-semibold">{item.name}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {item.distance.toFixed(1)} km away • ⭐ {item.rating}
                  </Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <SearchableMapEmpty
              title="No sports centers found"
              description="Try adjusting your search radius"
            />
          )}
        </SheetContent>
      </Sheet>
    </SearchableMap>
  );
}`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Props</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">SearchableMap Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">selectedId</td>
                    <td className="py-2 px-4 font-mono text-xs">string | null</td>
                    <td className="py-2 px-4">Controlled selected item ID</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">onSelectedIdChange</td>
                    <td className="py-2 px-4 font-mono text-xs">(id) =&gt; void</td>
                    <td className="py-2 px-4">Called when selection changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">onMarkerPress</td>
                    <td className="py-2 px-4 font-mono text-xs">(id, data) =&gt; void</td>
                    <td className="py-2 px-4">Called when map marker is pressed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">onItemPress</td>
                    <td className="py-2 px-4 font-mono text-xs">(item) =&gt; void</td>
                    <td className="py-2 px-4">Called when list item is pressed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4 mt-6">
        <h3 className="font-semibold mb-2">💡 Tip</h3>
        <p className="text-sm text-muted-foreground">
          Combine SearchableMap with the enhanced Sheet component (with draggable support) for a complete map browsing experience.
        </p>
      </div>

    </div>
  )
}
