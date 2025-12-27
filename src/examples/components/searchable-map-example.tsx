 
import { View, Text } from 'react-native-web';

/**
 * SearchableMap requires react-native-maps which uses native map APIs
 * (Google Maps on Android, Apple Maps on iOS).
 * This component is not available for web preview.
 */
export function SearchableMapExample() {
  return (
    <View className="w-full max-w-md p-8 border-2 border-dashed border-border rounded-lg">
      <View className="text-center gap-4">
        <Text className="text-lg font-semibold">Searchable Map Component</Text>
        <Text className="text-sm text-muted-foreground">
          This component combines a map view with a searchable list and requires native map APIs.
          Not available for web preview.
        </Text>
        <Text className="text-xs text-muted-foreground">
          Install with: npx native-shadcn-cli add searchable-map
        </Text>
        <View className="mt-4 p-4 bg-muted rounded-md">
          <Text className="text-xs font-mono">
            {`<SearchableMap>
  <SearchableMapView
    data={locations}
    initialRegion={region}
  />
  <SearchableMapList
    data={locations}
    renderItem={({item}) => (
      <ListItem>{item.title}</ListItem>
    )}
  />
</SearchableMap>`}
          </Text>
        </View>
      </View>
    </View>
  );
}
