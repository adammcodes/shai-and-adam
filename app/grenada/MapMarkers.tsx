import { Marker, InfoWindow } from "@react-google-maps/api";
import InfoWindowContent from "@/components/InfoWindowContent";

type MapMarkersProps = {
  filteredMarkers: any[];
  selectedMarkerId: number;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<number>>;
};

export default function MapMarkers({
  filteredMarkers,
  selectedMarkerId,
  setSelectedMarkerId,
}: MapMarkersProps) {
  return (
    <>
      {/* map markers defined in helpers/mapMarkers */}
      {filteredMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => {
            setSelectedMarkerId(marker.id);
          }}
        >
          {/* display info window if marker is selected */}
          {/* Prevent map from recentering when InfoWindow opens */}
          {selectedMarkerId === marker.id && (
            <InfoWindow
              position={marker.position}
              onCloseClick={() => {
                setSelectedMarkerId(0);
              }}
            >
              <InfoWindowContent {...marker} />
            </InfoWindow>
          )}
        </Marker>
      ))}
    </>
  );
}
