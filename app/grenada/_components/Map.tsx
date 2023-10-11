import { GoogleMap } from "@react-google-maps/api";
import { mapStyle } from "../_helpers/mapStyle.js";
import MapMarkers from "./MapMarkers";

const containerStyle = {
  width: "680px",
  height: "600px",
};

type MapProps = {
  filteredMarkers: any[];
  selectedMarkerId: number;
  selectedFilter: string;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<number>>;
};

export default function Map({
  filteredMarkers,
  selectedMarkerId,
  selectedFilter,
  setSelectedMarkerId,
}: MapProps) {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedFilter === "stay"
          ? { lat: 12.011048958021288, lng: -61.76749576836825 }
          : { lat: 12.011048958021288, lng: -61.76749576836825 }
      }
      zoom={selectedFilter === "stay" ? 13 : 11}
      options={{
        styles: mapStyle, // Set the custom map style here
        zoomControl: true, // Enable zoom control (you can adjust this as needed)
        mapTypeControl: false, // Hide the map type toggle
        streetViewControl: false, // Hide the pegman button (Street View)
      }}
    >
      <MapMarkers
        filteredMarkers={filteredMarkers}
        selectedMarkerId={selectedMarkerId}
        setSelectedMarkerId={setSelectedMarkerId}
      />
    </GoogleMap>
  );
}
