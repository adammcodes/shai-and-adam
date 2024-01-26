"use client";
import Link from "next/link";
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
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default function Grenada() {
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
        <br />
        <strong>Where we are staying:</strong>
        <p className="text-center">
          <Link
            target="_blank"
            className="underline"
            href="https://www.coyaba.com/"
          >
            Coyaba Beach Resort
          </Link>{" "}
          <br />
        </p>
        <br />
        <strong>When:</strong>
        <p className="text-center">
          from Monday, May 6th to Monday, May 13th, 2024
          <br />
        </p>
        <br />
        <strong>Ceremony&nbsp;&&nbsp;Reception:</strong>
        <p className="text-left lg:text-center">
          True Blue Bay Resort, True&nbsp;Blue&nbsp;Bay, Grenada.
          <br />
          on May 9th, 2024.
        </p>
        <br />
        <p className="text-center">
          Please refer to the map and tabs below on "Where the couple will be"
          for more information on these locations.
          <br />
          <br />
          The currency in Grenada is Eastern Carribean Dollars. US dollars are
          also accepted.
          <br />
          <br />
          Please{" "}
          <Link
            href="mailto:pineappleshirt473@gmail.com"
            target="_blank"
            className="underline"
          >
            reach out to us
          </Link>{" "}
          if you have any questions.
        </p>
        <br />
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
}
