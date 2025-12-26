export const searchableMapTemplate = `import * as React from 'react';
import { View, Text, FlatList, Pressable, Dimensions, FlatListProps } from 'react-native';
import MapView from 'react-native-maps';
import { MapView as CustomMapView, MapMarkerData, MapLocation } from '@/components/ui/map-view';
import { cn } from '@/lib/utils';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Context for sharing state between components
type SearchableMapContextValue = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onMarkerPress?: (markerId: string, markerData: any) => void;
  onItemPress?: (item: any) => void;
};

const SearchableMapContext = React.createContext<SearchableMapContextValue | undefined>(undefined);

function useSearchableMap() {
  const context = React.useContext(SearchableMapContext);
  if (!context) {
    throw new Error('SearchableMap components must be used within <SearchableMap>');
  }
  return context;
}

// Root SearchableMap Component
interface SearchableMapProps extends React.ComponentPropsWithoutRef<typeof View> {
  selectedId?: string | null;
  onSelectedIdChange?: (id: string | null) => void;
  onMarkerPress?: (markerId: string, markerData: any) => void;
  onItemPress?: (item: any) => void;
}

const SearchableMap = React.forwardRef<
  React.ElementRef<typeof View>,
  SearchableMapProps
>(({ selectedId, onSelectedIdChange, onMarkerPress, onItemPress, className, children, ...props }, ref) => {
  const [internalSelectedId, setInternalSelectedId] = React.useState<string | null>(null);

  const isControlled = selectedId !== undefined;
  const currentSelectedId = isControlled ? selectedId : internalSelectedId;
  const handleSelectedIdChange = isControlled ? onSelectedIdChange : setInternalSelectedId;

  const contextValue = React.useMemo(
    () => ({
      selectedId: currentSelectedId,
      setSelectedId: handleSelectedIdChange || (() => {}),
      onMarkerPress,
      onItemPress,
    }),
    [currentSelectedId, handleSelectedIdChange, onMarkerPress, onItemPress]
  );

  return (
    <SearchableMapContext.Provider value={contextValue}>
      <View ref={ref} className={cn('flex-1', className)} {...props}>
        {children}
      </View>
    </SearchableMapContext.Provider>
  );
});
SearchableMap.displayName = 'SearchableMap';

// SearchableMapView - The map component
interface SearchableMapViewProps extends Omit<React.ComponentPropsWithoutRef<typeof CustomMapView>, 'selectedMarkerId' | 'onMarkerPress'> {
  markers: MapMarkerData[];
  userLocation?: MapLocation;
  radius?: number;
  markerColor?: string;
  selectedMarkerColor?: string;
  renderMarker?: (marker: MapMarkerData, isSelected: boolean) => React.ReactNode;
  renderUserMarker?: () => React.ReactNode;
}

const SearchableMapView = React.forwardRef<
  MapView,
  SearchableMapViewProps
>(({ markers, userLocation, radius, ...props }, ref) => {
  const { selectedId, setSelectedId, onMarkerPress } = useSearchableMap();

  const handleMarkerPress = React.useCallback(
    (markerId: string, marker: MapMarkerData) => {
      setSelectedId(markerId);
      onMarkerPress?.(markerId, marker);
    },
    [setSelectedId, onMarkerPress]
  );

  return (
    <CustomMapView
      ref={ref}
      markers={markers}
      userLocation={userLocation}
      radius={radius}
      selectedMarkerId={selectedId}
      onMarkerPress={handleMarkerPress}
      {...props}
    />
  );
});
SearchableMapView.displayName = 'SearchableMapView';

// SearchableMapList - The list component
interface SearchableMapListProps<T extends MapMarkerData> extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data: T[];
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
}

function SearchableMapList<T extends MapMarkerData>({
  data,
  renderItem,
  ...props
}: SearchableMapListProps<T>) {
  const { selectedId, setSelectedId, onItemPress } = useSearchableMap();

  const handleItemPress = React.useCallback(
    (item: T) => {
      setSelectedId(item.id);
      onItemPress?.(item);
    },
    [setSelectedId, onItemPress]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleItemPress(item)}>
          {renderItem(item, item.id === selectedId)}
        </Pressable>
      )}
      {...props}
    />
  );
}
SearchableMapList.displayName = 'SearchableMapList';

// SearchableMapListHeader - Header for the list
interface SearchableMapListHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  title?: string;
  description?: string;
  count?: number;
}

const SearchableMapListHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  SearchableMapListHeaderProps
>(({ className, title, description, count, children, ...props }, ref) => (
  <View ref={ref} className={cn('px-4 pb-2 border-b border-border', className)} {...props}>
    {title && (
      <Text className="font-semibold text-base text-foreground">
        {title} {count !== undefined && \`(\${count})\`}
      </Text>
    )}
    {description && (
      <Text className="text-sm text-muted-foreground mt-1">{description}</Text>
    )}
    {children}
  </View>
));
SearchableMapListHeader.displayName = 'SearchableMapListHeader';

// SearchableMapEmpty - Empty state
interface SearchableMapEmptyProps extends React.ComponentPropsWithoutRef<typeof View> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const SearchableMapEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  SearchableMapEmptyProps
>(({ className, title = 'No results', description, icon, children, ...props }, ref) => (
  <View ref={ref} className={cn('items-center justify-center p-8', className)} {...props}>
    {icon}
    <Text className="text-muted-foreground text-center font-medium">{title}</Text>
    {description && (
      <Text className="text-muted-foreground text-center text-sm mt-1">{description}</Text>
    )}
    {children}
  </View>
));
SearchableMapEmpty.displayName = 'SearchableMapEmpty';

// SearchableMapFilters - Floating filter button
interface SearchableMapFiltersProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  active?: boolean;
}

const SearchableMapFilters = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SearchableMapFiltersProps
>(({ className, active, children, ...props }, ref) => (
  <View className="absolute top-4 right-4 z-10">
    <Pressable
      ref={ref}
      className={cn(
        'bg-background rounded-full p-3 shadow-lg flex-row items-center',
        active && 'bg-primary',
        className
      )}
      {...props}
    >
      {children || <Text className={active ? 'text-primary-foreground' : 'text-foreground'}>🔍</Text>}
      {active && <View className="ml-2 w-2 h-2 rounded-full bg-primary-foreground" />}
    </Pressable>
  </View>
));
SearchableMapFilters.displayName = 'SearchableMapFilters';

export {
  SearchableMap,
  SearchableMapView,
  SearchableMapList,
  SearchableMapListHeader,
  SearchableMapEmpty,
  SearchableMapFilters,
};
`;
