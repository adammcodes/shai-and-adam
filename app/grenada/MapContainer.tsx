import { Marker, InfoWindow, GoogleMap } from "@react-google-maps/api";
import { mapStyle } from "@/helpers/mapStyle.js";
import { mapFilters } from "@/helpers/mapFilters";

// next
import Image from "next/image";
// components
import InfoWindowContent from "@/components/InfoWindowContent";
import FilterRadioButton from "@/components/FilterRadioButton";
// css module
import styles from "./Map.module.css";

const containerStyle = {
  width: "680px",
  height: "600px",
};

type MapContainerProps = {
  selectedFilter: string;
  filteredMarkers: any[];
  selectedMarkerId: number;
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export default function MapContainer({
  selectedFilter,
  filteredMarkers,
  selectedMarkerId,
  setSelectedMarkerId,
  setSelectedFilter,
}: MapContainerProps) {
  return (
    <>
      {/* Filters for markers: "Places to stay", "Things to do", "Where the couple will be" */}
      <div className="my-10 w-full flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center items-center text-[1.2rem]">
          {mapFilters.map((filter, index) => (
            <FilterRadioButton
              key={index}
              {...filter}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          ))}
        </div>
      </div>

      <div className="lg:w-full flex flex-col-reverse lg:flex-row justify-center items-center">
        {/* Render list of markers beside the map */}
        <div className="my-10 py-5 mb-5 flex flex-col w-[90vw] lg:max-w-[400px] lg:h-[600px]">
          {filteredMarkers.map((marker) => (
            <div key={marker.id} className="flex items-center mb-5">
              <div
                className="w-10 h-10 m-3 rounded-full bg-[#FFF] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setSelectedMarkerId(marker.id);
                }}
              >
                {/* Render the marker svg here: parse svg string into Next Image component */}
                <Image
                  src={`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    marker.svg
                  )}`}
                  alt={marker.title}
                  width={20}
                  height={20}
                />
              </div>
              <p
                className="text-[#002F6C] cursor-pointer max-w-[300px]"
                onClick={() => {
                  setSelectedMarkerId(marker.id);
                }}
              >
                {marker.title}
              </p>
            </div>
          ))}
        </div>

        {/* Render the map */}
        <div
          //className="my-10 w-[90%] flex justify-center text-center py-5 mb-5 lg:h-[600px] lg:w-[994px]"
          className={styles.map}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 12.011048958021288, lng: -61.76749576836825 }}
            zoom={14}
            options={{
              styles: mapStyle, // Set the custom map style here
              zoomControl: true, // Enable zoom control (you can adjust this as needed)
              mapTypeControl: false, // Hide the map type toggle
              streetViewControl: false, // Hide the pegman button (Street View)
            }}
          >
            {/* map markers defined in helpers/mapMarkers */}
            {filteredMarkers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                onClick={() => {
                  setSelectedMarkerId(marker.id);
                }}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                    marker.svg
                  )}`,
                }}
              >
                {/* display info window if marker is selected */}
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
          </GoogleMap>
        </div>
      </div>
    </>
  );
}
