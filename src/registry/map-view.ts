export const mapViewTemplate = `import * as React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Region } from 'react-native-maps';

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface MapMarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  distance?: number;
  [key: string]: any;
}

// Context for sharing map state
type MapViewContextValue = {
  mapRef: React.RefObject<MapView>;
  selectedMarkerId: string | null;
  setSelectedMarkerId: (id: string | null) => void;
  onMarkerPress?: (markerId: string, markerData: MapMarkerData) => void;
  markerColor: string;
  selectedMarkerColor: string;
};

const MapViewContext = React.createContext<MapViewContextValue | undefined>(undefined);

function useMapView() {
  const context = React.useContext(MapViewContext);
  if (!context) {
    throw new Error('MapView components must be used within <MapView>');
  }
  return context;
}

// Root MapView Component
interface MapViewRootProps extends Omit<React.ComponentPropsWithoutRef<typeof MapView>, 'children'> {
  selectedMarkerId?: string | null;
  onSelectedMarkerIdChange?: (id: string | null) => void;
  onMarkerPress?: (markerId: string, markerData: MapMarkerData) => void;
  initialRegion?: Region;
  markerColor?: string;
  selectedMarkerColor?: string;
  children?: React.ReactNode;
}

const MapViewRoot = React.forwardRef<MapView, MapViewRootProps>(
  (
    {
      selectedMarkerId,
      onSelectedMarkerIdChange,
      onMarkerPress,
      initialRegion,
      markerColor = '#2563eb',
      selectedMarkerColor = '#1e40af',
      children,
      ...props
    },
    ref
  ) => {
    const mapRef = React.useRef<MapView>(null);
    const [internalSelectedId, setInternalSelectedId] = React.useState<string | null>(null);

    React.useImperativeHandle(ref, () => mapRef.current as MapView);

    const isControlled = selectedMarkerId !== undefined;
    const currentSelectedId = isControlled ? selectedMarkerId : internalSelectedId;
    const handleSelectedIdChange = isControlled ? onSelectedMarkerIdChange : setInternalSelectedId;

    const contextValue = React.useMemo(
      () => ({
        mapRef,
        selectedMarkerId: currentSelectedId,
        setSelectedMarkerId: handleSelectedIdChange || (() => {}),
        onMarkerPress,
        markerColor,
        selectedMarkerColor,
      }),
      [currentSelectedId, handleSelectedIdChange, onMarkerPress, markerColor, selectedMarkerColor]
    );

    return (
      <MapViewContext.Provider value={contextValue}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '100%' }}
          initialRegion={initialRegion}
          showsMyLocationButton={false}
          {...props}
        >
          {children}
        </MapView>
      </MapViewContext.Provider>
    );
  }
);
MapViewRoot.displayName = 'MapView';

// MapViewMarker - Individual marker
interface MapViewMarkerProps extends React.ComponentPropsWithoutRef<typeof Marker> {
  id: string;
  markerData?: MapMarkerData;
  children?: React.ReactNode;
}

const MapViewMarker = React.forwardRef<
  React.ElementRef<typeof Marker>,
  MapViewMarkerProps
>(({ id, markerData, coordinate, children, onPress, ...props }, ref) => {
  const { selectedMarkerId, setSelectedMarkerId, onMarkerPress, markerColor, selectedMarkerColor } = useMapView();
  const isSelected = selectedMarkerId === id;

  const handlePress = React.useCallback(
    (e: any) => {
      setSelectedMarkerId(id);
      if (markerData) {
        onMarkerPress?.(id, markerData);
      }
      onPress?.(e);
    },
    [id, markerData, setSelectedMarkerId, onMarkerPress, onPress]
  );

  // Default marker view
  const defaultMarker = (
    <View
      className="rounded-full p-2 items-center shadow-md border-2"
      style={{
        backgroundColor: isSelected ? selectedMarkerColor : '#fff',
        borderColor: isSelected ? selectedMarkerColor : markerColor,
      }}
    >
      <Text className="text-xl">{isSelected ? '📍' : '📌'}</Text>
      {markerData?.distance !== undefined && (
        <Text
          className="text-xs font-semibold mt-0.5"
          style={{ color: isSelected ? '#fff' : markerColor }}
        >
          {markerData.distance.toFixed(1)}km
        </Text>
      )}
    </View>
  );

  return (
    <Marker
      ref={ref}
      coordinate={coordinate}
      onPress={handlePress}
      {...props}
    >
      {children || defaultMarker}
    </Marker>
  );
});
MapViewMarker.displayName = 'MapViewMarker';

// MapViewMarkers - Render multiple markers
interface MapViewMarkersProps {
  data: MapMarkerData[];
  renderMarker?: (marker: MapMarkerData, isSelected: boolean) => React.ReactNode;
}

const MapViewMarkers = ({ data, renderMarker }: MapViewMarkersProps) => {
  const { selectedMarkerId } = useMapView();

  return (
    <>
      {data.map((marker) => {
        if (!marker.latitude || !marker.longitude) return null;

        const isSelected = marker.id === selectedMarkerId;
        const coordinate = {
          latitude: marker.latitude,
          longitude: marker.longitude,
        };

        return (
          <MapViewMarker
            key={marker.id}
            id={marker.id}
            markerData={marker}
            coordinate={coordinate}
            title={marker.title}
            description={marker.description}
          >
            {renderMarker?.(marker, isSelected)}
          </MapViewMarker>
        );
      })}
    </>
  );
};
MapViewMarkers.displayName = 'MapViewMarkers';

// MapViewUserLocation - User location marker
interface MapViewUserLocationProps {
  location: MapLocation;
  children?: React.ReactNode;
}

const MapViewUserLocation = React.forwardRef<
  React.ElementRef<typeof Marker>,
  MapViewUserLocationProps
>(({ location, children, ...props }, ref) => {
  const defaultUserMarker = (
    <View className="bg-background rounded-full p-1 shadow-lg">
      <Text className="text-2xl">📍</Text>
    </View>
  );

  return (
    <Marker
      ref={ref}
      coordinate={location}
      anchor={{ x: 0.5, y: 0.5 }}
      {...props}
    >
      {children || defaultUserMarker}
    </Marker>
  );
});
MapViewUserLocation.displayName = 'MapViewUserLocation';

// MapViewCircle - Radius circle
interface MapViewCircleProps extends React.ComponentPropsWithoutRef<typeof Circle> {
  center: MapLocation;
  radius: number; // in kilometers
  strokeColor?: string;
  fillColor?: string;
}

const MapViewCircle = React.forwardRef<
  React.ElementRef<typeof Circle>,
  MapViewCircleProps
>(
  (
    {
      center,
      radius,
      strokeColor = 'rgba(37, 99, 235, 0.5)',
      fillColor = 'rgba(37, 99, 235, 0.1)',
      strokeWidth = 2,
      ...props
    },
    ref
  ) => (
    <Circle
      ref={ref}
      center={center}
      radius={radius * 1000} // Convert km to meters
      strokeColor={strokeColor}
      fillColor={fillColor}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
);
MapViewCircle.displayName = 'MapViewCircle';

// Helper hook to fit map to coordinates
interface UseFitToCoordinatesOptions {
  markers?: MapMarkerData[];
  userLocation?: MapLocation;
  edgePadding?: { top: number; right: number; bottom: number; left: number };
}

function useFitToCoordinates({
  markers = [],
  userLocation,
  edgePadding = { top: 50, right: 50, bottom: 300, left: 50 },
}: UseFitToCoordinatesOptions) {
  const { mapRef } = useMapView();

  React.useEffect(() => {
    if (markers.length > 0 && mapRef.current) {
      const coordinates = markers
        .filter((m) => m.latitude && m.longitude)
        .map((m) => ({
          latitude: m.latitude,
          longitude: m.longitude,
        }));

      if (userLocation) {
        coordinates.push(userLocation);
      }

      if (coordinates.length > 0) {
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding,
            animated: true,
          });
        }, 100);
      }
    }
  }, [markers, userLocation, edgePadding, mapRef]);
}

export {
  MapViewRoot as MapView,
  MapViewMarker,
  MapViewMarkers,
  MapViewUserLocation,
  MapViewCircle,
  useFitToCoordinates,
};
`;
