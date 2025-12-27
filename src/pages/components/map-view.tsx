import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import mapviewSource from '@templates/map-view?raw'

function MapViewPreview() {
  return (
    <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
      <div className="text-center space-y-2">
        <div className="text-6xl">🗺️</div>
        <p className="text-sm text-muted-foreground">
          Interactive map with customizable markers
        </p>
        <p className="text-xs text-muted-foreground">
          (Preview requires react-native-maps)
        </p>
      </div>
    </div>
  )
}

export function MapViewDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Map View</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A compositional map component with support for markers, user location, radius circles, and custom rendering.
        </p>
      </div>

      <ComponentPreview
        name="MapView"
        preview={<MapViewPreview />}
        code={`import { MapView, MapViewMarkers, MapViewUserLocation, MapViewCircle } from '@/components/ui/map-view';

const sportsCenters = [
  { id: '1', latitude: 6.9271, longitude: 79.8612, title: 'Sports Center 1', distance: 1.2 },
  { id: '2', latitude: 6.9371, longitude: 79.8712, title: 'Sports Center 2', distance: 2.5 },
];

const userLocation = { latitude: 6.9271, longitude: 79.8612 };

<MapView
  initialRegion={{
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <MapViewCircle center={userLocation} radius={5} />
  <MapViewUserLocation location={userLocation} />
  <MapViewMarkers data={sportsCenters} />
</MapView>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-ui add map-view"
        manual={mapviewSource}
        dependencies={['react-native-maps', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  MapView,
  MapViewMarker,
  MapViewMarkers,
  MapViewUserLocation,
  MapViewCircle,
  useFitToCoordinates,
  type MapMarkerData,
  type MapLocation,
} from '@/components/ui/map-view';`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">MapView</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Root component that provides context for all child components.
            </p>
            <CodeBlock
              code={`<MapView
  initialRegion={{
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  markerColor="#2563eb"
  selectedMarkerColor="#1e40af"
  onMarkerPress={(id, data) => console.log('Marker pressed:', id)}
>
  {/* Children */}
</MapView>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">MapViewMarkers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Renders multiple markers from an array of data.
            </p>
            <CodeBlock
              code={`const markers = [
  { id: '1', latitude: 6.9271, longitude: 79.8612, title: 'Location 1', distance: 1.2 },
  { id: '2', latitude: 6.9371, longitude: 79.8712, title: 'Location 2', distance: 2.5 },
];

<MapViewMarkers
  data={markers}
  renderMarker={(marker, isSelected) => (
    <View style={{
      backgroundColor: isSelected ? '#2563eb' : '#fff',
      padding: 8,
      borderRadius: 20,
    }}>
      <Text>{marker.title}</Text>
    </View>
  )}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">MapViewMarker</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Individual marker component for custom placement.
            </p>
            <CodeBlock
              code={`<MapViewMarker
  id="custom-1"
  coordinate={{ latitude: 6.9271, longitude: 79.8612 }}
  markerData={{ name: 'Custom Location' }}
>
  <CustomMarkerView />
</MapViewMarker>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">MapViewUserLocation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Displays the user's current location on the map.
            </p>
            <CodeBlock
              code={`<MapViewUserLocation
  location={{ latitude: 6.9271, longitude: 79.8612 }}
>
  <CustomUserMarker />
</MapViewUserLocation>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">MapViewCircle</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Renders a radius circle around a location.
            </p>
            <CodeBlock
              code={`<MapViewCircle
  center={{ latitude: 6.9271, longitude: 79.8612 }}
  radius={5} // in kilometers
  strokeColor="rgba(37, 99, 235, 0.5)"
  fillColor="rgba(37, 99, 235, 0.1)"
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">useFitToCoordinates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Hook to automatically fit the map to show all markers.
            </p>
            <CodeBlock
              code={`function MyMap() {
  const markers = [...];
  const userLocation = { latitude: 6.9271, longitude: 79.8612 };

  // Auto-fit map to show all markers
  useFitToCoordinates({
    markers,
    userLocation,
    edgePadding: { top: 50, right: 50, bottom: 300, left: 50 }
  });

  return (
    <MapView>
      <MapViewMarkers data={markers} />
      <MapViewUserLocation location={userLocation} />
    </MapView>
  );
}`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Complete Example</h3>
          <CodeBlock
            code={`import { useState } from 'react';
import {
  MapView,
  MapViewMarkers,
  MapViewUserLocation,
  MapViewCircle,
  useFitToCoordinates
} from '@/components/ui/map-view';

export function MapExample() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const markers = [
    {
      id: '1',
      latitude: 6.9271,
      longitude: 79.8612,
      title: 'Sports Center 1',
      distance: 1.2
    },
    {
      id: '2',
      latitude: 6.9371,
      longitude: 79.8712,
      title: 'Sports Center 2',
      distance: 2.5
    },
  ];

  const userLocation = { latitude: 6.9271, longitude: 79.8612 };

  // Auto-fit map
  useFitToCoordinates({ markers, userLocation });

  return (
    <MapView
      initialRegion={{
        latitude: 6.9271,
        longitude: 79.8612,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      selectedMarkerId={selectedId}
      onSelectedMarkerIdChange={setSelectedId}
      onMarkerPress={(id, data) => {
        console.log('Marker pressed:', id, data);
      }}
    >
      {/* Radius circle */}
      <MapViewCircle center={userLocation} radius={5} />

      {/* User location */}
      <MapViewUserLocation location={userLocation} />

      {/* All markers */}
      <MapViewMarkers data={markers} />
    </MapView>
  );
}`}
            language="tsx"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Custom Markers with renderMarker</h3>
          <CodeBlock
            code={`import { View, Text } from 'react-native';
import { MapView, MapViewMarkers } from '@/components/ui/map-view';
import { cn } from '@/lib/utils';

export function CustomMarkersExample() {
  const markers = [
    { id: '1', latitude: 6.9271, longitude: 79.8612, type: 'gym', rating: 4.5 },
    { id: '2', latitude: 6.9371, longitude: 79.8712, type: 'pool', rating: 4.8 },
  ];

  return (
    <MapView>
      <MapViewMarkers
        data={markers}
        renderMarker={(marker, isSelected) => (
          <View className={cn(
            "rounded-full p-3 items-center shadow-lg border-2",
            isSelected ? "bg-primary border-primary" : "bg-background border-border"
          )}>
            <Text className="text-2xl">
              {marker.type === 'gym' ? '🏋️' : '🏊'}
            </Text>
            <Text className={cn(
              "text-xs font-bold mt-1",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}>
              ⭐ {marker.rating}
            </Text>
          </View>
        )}
      />
    </MapView>
  );
}`}
            language="tsx"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Marker Customization</h2>
        <p className="text-sm text-muted-foreground">
          Learn all the ways to customize markers to match your design.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">1. Change Default Colors</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The easiest way - just change the marker colors using props.
            </p>
            <CodeBlock
              code={`<MapView
  markerColor="#10b981"  // Green for unselected
  selectedMarkerColor="#059669"  // Dark green for selected
>
  <MapViewMarkers data={locations} />
</MapView>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">2. Individual Custom Markers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create completely custom markers by passing children to MapViewMarker.
            </p>
            <CodeBlock
              code={`<MapView>
  {/* Custom VIP marker */}
  <MapViewMarker
    id="vip-1"
    coordinate={{ latitude: 6.9271, longitude: 79.8612 }}
  >
    <View className="bg-destructive p-3 rounded-lg shadow-xl">
      <Text className="text-destructive-foreground font-bold text-sm">
        VIP
      </Text>
    </View>
  </MapViewMarker>

  {/* Custom featured marker */}
  <MapViewMarker
    id="featured-1"
    coordinate={{ latitude: 6.9371, longitude: 79.8712 }}
  >
    <View className="bg-primary p-2 rounded-full">
      <Text className="text-2xl">⭐</Text>
    </View>
  </MapViewMarker>

  {/* Regular markers */}
  <MapViewMarkers data={otherLocations} />
</MapView>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">3. Conditional Custom Markers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Show different marker styles based on data properties.
            </p>
            <CodeBlock
              code={`import { cn } from '@/lib/utils';

const markers = [
  { id: '1', name: 'Premium Gym', rating: 4.8, isPremium: true },
  { id: '2', name: 'Basic Gym', rating: 3.5, isPremium: false },
];

<MapViewMarkers
  data={markers}
  renderMarker={(marker, isSelected) => {
    // Premium markers get special styling
    if (marker.isPremium) {
      return (
        <View className={cn(
          "p-3 rounded-lg shadow-xl border-2",
          isSelected
            ? "bg-primary border-primary-foreground"
            : "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-600"
        )}>
          <Text className="text-2xl">👑</Text>
          <Text className="text-xs font-bold text-white mt-1">
            ⭐ {marker.rating}
          </Text>
        </View>
      );
    }

    // Regular markers - return undefined to use default
    return undefined;
  }}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">4. Custom Marker Components</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create reusable marker components for better organization.
            </p>
            <CodeBlock
              code={`// Custom marker component
function SportsCenterMarker({
  sportsCenter,
  isSelected
}: {
  sportsCenter: any;
  isSelected: boolean
}) {
  return (
    <View className={cn(
      "items-center p-2 rounded-2xl shadow-lg",
      isSelected ? "bg-primary scale-110" : "bg-background"
    )}>
      {/* Icon based on sport type */}
      <Text className="text-2xl">
        {sportsCenter.sportType === 'gym' ? '🏋️' :
         sportsCenter.sportType === 'pool' ? '🏊' :
         sportsCenter.sportType === 'tennis' ? '🎾' : '⚽'}
      </Text>

      {/* Rating */}
      <View className="flex-row items-center mt-1">
        <Text className={cn(
          "text-xs font-bold",
          isSelected ? "text-primary-foreground" : "text-foreground"
        )}>
          ⭐ {sportsCenter.rating}
        </Text>
      </View>

      {/* Distance */}
      {sportsCenter.distance && (
        <Text className={cn(
          "text-[10px] font-semibold mt-0.5",
          isSelected ? "text-primary-foreground" : "text-muted-foreground"
        )}>
          {sportsCenter.distance.toFixed(1)}km
        </Text>
      )}
    </View>
  );
}

// Usage
export function MyMap() {
  return (
    <MapView>
      <MapViewMarkers
        data={sportsCenters}
        renderMarker={(marker, isSelected) => (
          <SportsCenterMarker
            sportsCenter={marker}
            isSelected={isSelected}
          />
        )}
      />
    </MapView>
  );
}`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">5. Animated Markers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add animations when markers are selected.
            </p>
            <CodeBlock
              code={`import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

function AnimatedMarker({ marker, isSelected }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isSelected ? 1.2 : 1);
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={cn(
        "p-3 rounded-full shadow-lg",
        isSelected ? "bg-primary" : "bg-background"
      )}
    >
      <Text className="text-2xl">📍</Text>
    </Animated.View>
  );
}

<MapViewMarkers
  data={markers}
  renderMarker={(marker, isSelected) => (
    <AnimatedMarker marker={marker} isSelected={isSelected} />
  )}
/>`}
              language="tsx"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">6. Mix Default and Custom</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use default markers for most items, custom for special ones.
            </p>
            <CodeBlock
              code={`<MapView markerColor="#2563eb" selectedMarkerColor="#1e40af">
  {/* Regular locations use default markers */}
  <MapViewMarkers data={regularLocations} />

  {/* User's current location - custom */}
  <MapViewMarker
    id="user-location"
    coordinate={userLocation}
  >
    <View className="bg-primary p-3 rounded-full shadow-xl">
      <Text className="text-2xl">👤</Text>
    </View>
  </MapViewMarker>

  {/* Featured locations - custom */}
  {featuredLocations.map(location => (
    <MapViewMarker
      key={location.id}
      id={location.id}
      coordinate={location}
    >
      <View className="bg-amber-500 p-2 rounded-lg">
        <Text className="text-xl">⭐</Text>
        <Text className="text-xs font-bold text-white">
          {location.name}
        </Text>
      </View>
    </MapViewMarker>
  ))}
</MapView>`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="font-semibold mb-2">💡 Customization Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">renderMarker</code> for consistent styling across all markers</li>
          <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">children</code> prop for one-off custom markers</li>
          <li>Return <code className="text-xs bg-muted px-1 py-0.5 rounded">undefined</code> from renderMarker to use default styling</li>
          <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">cn()</code> for conditional Tailwind classes</li>
          <li>Keep markers simple - complex components can impact performance</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Props</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">MapView Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">selectedMarkerId</td>
                    <td className="py-2 px-4 font-mono text-xs">string | null</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Controlled selected marker ID</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">onSelectedMarkerIdChange</td>
                    <td className="py-2 px-4 font-mono text-xs">(id: string | null) =&gt; void</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Called when selection changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">onMarkerPress</td>
                    <td className="py-2 px-4 font-mono text-xs">(id, data) =&gt; void</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Called when marker is pressed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">markerColor</td>
                    <td className="py-2 px-4 font-mono text-xs">string</td>
                    <td className="py-2 px-4">#2563eb</td>
                    <td className="py-2 px-4">Default marker color</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-mono">selectedMarkerColor</td>
                    <td className="py-2 px-4 font-mono text-xs">string</td>
                    <td className="py-2 px-4">#1e40af</td>
                    <td className="py-2 px-4">Selected marker color</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
