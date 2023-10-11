import { useState } from "react";
// next
import Image from "next/image";
// helpers & types
import { mapFilters } from "@/app/grenada/_helpers/mapFilters";
import { MapMarker } from "@/app/grenada/_helpers/mapMarkers";
// css module
import styles from "./Map.module.css";
// components
import Map from "./Map";
import FilterRadioButton from "@/components/FilterRadioButton";

type MapContainerProps = {
  selectedFilter: string;
  filteredMarkers: any[];
  selectedSort: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  sortMarkers: (a: MapMarker, b: MapMarker) => number;
};

export default function MapContainer({
  selectedFilter,
  filteredMarkers,
  selectedSort,
  setSelectedFilter,
  setSelectedSort,
  sortMarkers,
}: MapContainerProps) {
  // state for the selected marker id to open the info window
  const [selectedMarkerId, setSelectedMarkerId] = useState(0);

  const openInfoWindow = (id: number) => {
    setSelectedMarkerId(id);
    // check if current viewport is mobile
    if (window.innerWidth < 1024) {
      // scroll to the top of the map
      window.scrollTo(0, 1280);
    }
  };

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
        <div className="border-2 border-[#002F6C] rounded-lg overflow-scroll flex flex-col w-[90vw] lg:mr-5 lg:max-w-[400px] lg:h-[600px]">
          <div className="text-[#3f83f8] flex justify-center items-center py-5">
            Sort By:
            <select
              className="ml-2 text-white bg-gradient-to-tl from-blue-500 to-cyan-500 focus:ring-4 focus:outline-none rounded-[20px] px-3 py-2 cursor-pointer"
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
              }}
            >
              <option value="distanceFromVenue">Distance from Venue</option>
              <option value="distanceFromCouple">Distance from Couple</option>
            </select>
          </div>
          {filteredMarkers.sort(sortMarkers).map((marker) => (
            <div key={marker.id} className="flex items-center mb-5">
              <div
                className="w-10 h-10 m-3 rounded-full bg-[#FFF] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  openInfoWindow(marker.id);
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
                  openInfoWindow(marker.id);
                }}
              >
                {marker.title}
                <br />
                <span className="text-[#3f83f8]">
                  {selectedSort === "distanceFromVenue"
                    ? marker.distanceFromVenue
                    : marker.distanceFromCouple}{" "}
                  km
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Render the map */}
        <div className={styles.map}>
          <Map
            filteredMarkers={filteredMarkers}
            selectedMarkerId={selectedMarkerId}
            setSelectedMarkerId={setSelectedMarkerId}
          />
        </div>
      </div>
    </>
  );
}
