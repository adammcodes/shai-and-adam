"use client";
// Grenada page
import Card from "@/components/Card";
// helpers for google maps, data, and styles
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "@/helpers/mapLibraries";
import { mapMarkers } from "@/helpers/mapMarkers";
// react
import { useState } from "react";
// components
import MapContainer from "./MapContainer";

export default function Grenada() {
  // state for the selected marker id to open the info window
  const [selectedMarkerId, setSelectedMarkerId] = useState(0);
  // state for the selected filter
  const [selectedFilter, setSelectedFilter] = useState("stay");

  // begin loading google maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries,
    language: "en",
  });

  // markers to display on the map
  const filteredMarkers = mapMarkers.filter(
    (marker) => selectedFilter === marker.filterId
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card title="Grenada">
        <p className="italic">May 9, 2024</p>
        <br />
        <strong>Location:</strong>
        <p className="text-center">St. George's, Grenada</p>
        <br />
        <strong>Details:</strong>
        <p className="text-center">
          We&apos;re still working out the details.
          <br /> We&apos;ll be sharing more information as we get closer to the
          date!
        </p>
      </Card>

      {/* Display Error for loading map */}
      {loadError && (
        <div className="my-10 w-full flex justify-center">
          <Card title="">
            <p className="text-[#E53E34] text-center">
              An error has occurred loading the map.
            </p>
          </Card>
        </div>
      )}

      {/* Display map if loaded */}
      {isLoaded && (
        <MapContainer
          filteredMarkers={filteredMarkers}
          selectedMarkerId={selectedMarkerId}
          setSelectedMarkerId={setSelectedMarkerId}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      )}
    </main>
  );
}
