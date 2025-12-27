 
import { View, Text } from 'react-native-web';

/**
 * MapView requires react-native-maps which uses native map APIs
 * (Google Maps on Android, Apple Maps on iOS).
 * This component is not available for web preview.
 */
export function MapViewExample() {
  return (
    <View className="w-full max-w-md p-8 border-2 border-dashed border-border rounded-lg">
      <View className="text-center gap-4">
        <Text className="text-lg font-semibold">Map View Component</Text>
        <Text className="text-sm text-muted-foreground">
          This component requires native map APIs (Google Maps/Apple Maps) and is not available for web preview.
        </Text>
        <Text className="text-xs text-muted-foreground">
          Install with: npx native-shadcn-cli add map-view
        </Text>
        <View className="mt-4 p-4 bg-muted rounded-md">
          <Text className="text-xs font-mono">
            {`<MapView
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <MapMarker
    id="marker1"
    latitude={37.78825}
    longitude={-122.4324}
    title="San Francisco"
  />
</MapView>`}
          </Text>
        </View>
      </View>
    </View>
  );
}
