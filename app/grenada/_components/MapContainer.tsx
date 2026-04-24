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

const pngs = [turtle, food, hiking, choco, fort, spices, waterfall, rum, hiking];

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
      <div className="my-10 w-full flex justify-center px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 bg-gray-50 rounded-full p-2 shadow-inner">
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

      <div className="lg:w-full flex flex-col-reverse lg:flex-row justify-center items-start px-4 pb-10 gap-5">
        {/* Render list of markers beside the map */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-[90vw] lg:max-w-[400px] lg:h-[600px]">
          {selectedFilter === "stay" && (
            <div className="text-sm text-gray-500 flex justify-center items-center py-4 px-4 border-b border-gray-100">
              Sort by
              <select
                className="ml-2 text-[#002F6C] bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002F6C] focus:ring-offset-1"
                value={selectedSort}
                onChange={e => {
                  setSelectedSort(e.target.value);
                }}
              >
                <option value="distanceFromVenue">Distance from Venue</option>
                <option value="distanceFromCouple">Distance from Couple</option>
              </select>
            </div>
          )}
          <div className="overflow-y-auto flex-1">
            {filteredMarkers.sort(sortMarkers).map((marker, index) => (
              <div
                key={marker.id}
                className={`flex flex-col px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  index !== filteredMarkers.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onClick={() => openInfoWindow(marker.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex-shrink-0 flex justify-center items-center">
                    {marker.svg && (
                      <Image
                        src={`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(marker.svg)}`}
                        alt={marker.title}
                        width={20}
                        height={20}
                      />
                    )}
                    {(marker.png === 0 || marker.png) && (
                      <Image
                        src={selectedFilter === "do" ? pngs[marker.png] : dates[marker.png]}
                        alt={marker.title}
                        width={22}
                        height={22}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-[#002F6C] font-medium text-base leading-snug">
                      {marker.title}
                    </p>
                    {selectedFilter === "stay" && (
                      <p className="text-sm text-gray-400 mt-0.5">
                        {selectedSort === "distanceFromVenue"
                          ? marker.distanceFromVenue
                          : marker.distanceFromCouple}{" "}
                        km
                      </p>
                    )}
                  </div>
                </div>
                {marker.desc && (
                  <p className="ml-[52px] text-sm text-gray-500 mt-1">{marker.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Render the map */}
        <div className={`${styles.map} rounded-2xl overflow-hidden shadow-lg`}>
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
