"use client";
// Grenada page
import Card from "@/components/Card";
// helpers for google maps, data, and styles
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "@/app/grenada/_helpers/mapLibraries";
import { mapMarkers, MapMarker } from "@/app/grenada/_helpers/mapMarkers";
// react
import { useState } from "react";
// components for this page
import MapContainer from "./_components/MapContainer";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Grenada() {
  // begin loading google maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries,
    language: "en",
  });
  // state for the selected filter
  const [selectedFilter, setSelectedFilter] = useState("stay");
  // state for the selected sort option
  const [selectedSort, setSelectedSort] = useState("distanceFromVenue");

  // sort markers by distance from venue or couple
  const sortMarkers = (a: MapMarker, b: MapMarker) => {
    // only sort markers when the selected filter is "Places to Stay"
    if (selectedFilter !== "stay") {
      return 0;
    }

    if (selectedSort === "distanceFromVenue") {
      return a.distanceFromVenue - b.distanceFromVenue;
    } else if (selectedSort === "distanceFromCouple") {
      return a.distanceFromCouple - b.distanceFromCouple;
    } else {
      return 0;
    }
  };

  // markers to display on the map
  const filteredMarkers = mapMarkers.filter(
    (marker) => selectedFilter === marker.filterId
  );

  return (
    <main className="flex min-h-screen flex-col items-center text-xl">
      <Card title="Grenada">
        <p className="italic">Thursday May 9, 2024</p>
        <br />
        <strong>Location of the Ceremony & Reception:</strong>
        <p className="text-center">The Dodgy Dock, True Blue Bay, Grenada</p>
        <br />
        <strong>Details:</strong>
        <p className="text-center">
          We&apos;re still working out the details. We&apos;ll be sharing more
          information as we get closer to the date.
          <br />
          <br />
          Please reach out to us if you have any questions.
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
          selectedFilter={selectedFilter}
          selectedSort={selectedSort}
          setSelectedFilter={setSelectedFilter}
          sortMarkers={sortMarkers}
          setSelectedSort={setSelectedSort}
        />
      )}
    </main>
  );
});
