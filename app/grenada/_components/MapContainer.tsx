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
// things to do images (png)
import choco from "@/public/images/things_to_do_icons/choco.png";
import food from "@/public/images/things_to_do_icons/food.png";
import hiking from "@/public/images/things_to_do_icons/hiking.png";
import spices from "@/public/images/things_to_do_icons/spices.png";
import rum from "@/public/images/things_to_do_icons/rum.png";
import turtle from "@/public/images/things_to_do_icons/turtle.png";
import waterfall from "@/public/images/things_to_do_icons/waterfall.png";
import fort from "@/public/images/things_to_do_icons/fort.png";
// dates pngs
import day1 from "@/public/images/dates/6.png";
import day2 from "@/public/images/dates/7.png";
import day3 from "@/public/images/dates/8.png";
import day4 from "@/public/images/dates/9.png";
import day5 from "@/public/images/dates/10.png";
import day6 from "@/public/images/dates/11.png";
import day7 from "@/public/images/dates/12.png";

const pngs = [
  turtle,
  food,
  hiking,
  choco,
  fort,
  spices,
  waterfall,
  rum,
  hiking,
];

const dates = [day1, day2, day3, day4, day5, day6, day7];

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
        <div className="border-2 border-[#002F6C] rounded-lg overflow-scroll flex flex-col w-[90vw] lg:mr-5 lg:max-w-[400px] lg:h-[600px] pt-5">
          {selectedFilter === "stay" && (
            <div className="text-[#3f83f8] flex justify-center items-center pb-5">
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
          )}
          {filteredMarkers.sort(sortMarkers).map((marker) => (
            <div key={marker.id} className="flex flex-col">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 m-3 rounded-full bg-[#FFF] flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    openInfoWindow(marker.id);
                  }}
                >
                  {/* Render the marker svg here: parse svg string into Next Image component */}
                  {marker.svg && (
                    <Image
                      src={`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                        marker.svg
                      )}`}
                      alt={marker.title}
                      width={20}
                      height={20}
                    />
                  )}
                  {(marker.png === 0 || marker.png) && (
                    <Image
                      src={
                        selectedFilter === "do"
                          ? pngs[marker.png]
                          : dates[marker.png]
                      }
                      alt={marker.title}
                      width={25}
                      height={25}
                    />
                  )}
                </div>
                <p
                  className="text-[#002F6C] cursor-pointer max-w-[300px]"
                  onClick={() => {
                    openInfoWindow(marker.id);
                  }}
                >
                  {marker.title}
                  {selectedFilter === "stay" && (
                    <>
                      <br />
                      <span className="text-[#3f83f8]">
                        {selectedSort === "distanceFromVenue"
                          ? marker.distanceFromVenue
                          : marker.distanceFromCouple}{" "}
                        km
                      </span>
                    </>
                  )}
                </p>
              </div>
              {marker.desc && (
                <p className="ml-5 text-blue-500">{marker.desc}</p>
              )}
            </div>
          ))}
        </div>

        {/* Render the map */}
        <div className={styles.map}>
          <Map
            selectedFilter={selectedFilter}
            filteredMarkers={filteredMarkers}
            selectedMarkerId={selectedMarkerId}
            setSelectedMarkerId={setSelectedMarkerId}
          />
        </div>
      </div>
    </>
  );
}
