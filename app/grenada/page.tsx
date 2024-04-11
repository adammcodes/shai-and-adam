"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import Paragraph from "@/components/Paragraph";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import tbb from "public/images/tbb.jpeg";
import dodgydock from "public/images/dodgydock.jpeg";

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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Decode the hash to get a selector that matches the encoded titles
      const decodedHash = decodeURIComponent(hash.substring(1));
      const element = document.getElementById(decodedHash);
      if (element) {
        // Scroll the element into view
        element.scrollIntoView({
          behavior: "smooth", // Optional: defines the scrolling behavior
          block: "start", // Optional: defines vertical alignment
        });
      }
    }
  }, []);

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
          from Monday, May 6th to Sunday, May 12th, 2024
          <br />
        </p>
        <br />
        <strong>Ceremony&nbsp;&&nbsp;Reception:</strong>
        <p className="text-center">
          True Blue Bay Resort, True&nbsp;Blue&nbsp;Bay, Grenada. on May 9th,
          2024.
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
        </p>
        <br />
        <Paragraph>
          By the way,{" "}
          <a
            target="_blank"
            className="underline"
            href="https://grenadaturns50.gd/"
          >
            Grenada turns 50
          </a>{" "}
          this year!
        </Paragraph>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/2rterUUISSg?si=CyqyW7FEjWDNQTX7"
          title="YouTube video player"
          style={{ margin: "1.5em" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg mt-8 shadow-lg mx-auto my-4"
        ></iframe>
        <Paragraph>
          Please{" "}
          <Link
            href="mailto:pineappleshirt473@gmail.com"
            target="_blank"
            className="underline"
          >
            reach out to us
          </Link>{" "}
          if you have any questions.
        </Paragraph>
      </Card>

      <Card title="Wedding Itinerary">
        <section className="text-left w-full">
          <div className="font-bold text-center text-xl italic">
            Thursday May 9th
          </div>

          <h3 className="font-bold mt-8">
            Ceremony @ True Blue Bay Resort: 10:00 AM to 12:00 PM
          </h3>
          <ul className="pl-6 list-disc">
            <li>
              Rides will be scheduled for pick up from Coyaba to True Blue Bay
              Resort for the morning ceremony to commence at 10:00&nbsp;AM by
              the pool.
            </li>
            <li>
              There will be light refreshments and drinks available during and
              after the&nbsp;ceremony.
            </li>
            <li>
              Bring your swimming gear if you would like to take a dip in
              the&nbsp;pool.
            </li>
          </ul>

          <h3 className="font-bold mt-8">Intermission: 12:00 PM to 6:00 PM</h3>
          <ul className="pl-6 list-disc">
            <li>
              Rides will be scheduled for transfer back to Coyaba Beach Resort
              so you can relax, have lunch, and freshen up.
            </li>
          </ul>

          <h3 className="font-bold mt-8">
            Evening Reception @ True Blue Bay Resort: 6:30 to 11:00PM
          </h3>
          <ul className="pl-6 list-disc">
            <li>
              The reception dinner will be held at the <em>Dodgy Dock</em>, an
              outdoor restaurant at True Blue Bay Resort.
            </li>
            <li>
              Rides will be scheduled for transfer back to True Blue Bay Resort
              for the dinner reception at 6:30&nbsp;PM.
            </li>
            <li>Dinner will be served at 7:00&nbsp;PM.</li>
            <li>There will be music, dancing, and a coconut bar to enjoy.</li>
          </ul>

          <div className="w-full">
            <Image
              src={tbb}
              alt="True Blue Bay Resort"
              width={400}
              height={300}
              className="rounded-lg mt-8 shadow-lg mx-auto my-4"
            />
            <figcaption className="text-center italic text-sm">
              True Blue Bay - Cocoa Pod Pool
            </figcaption>

            <Image
              src={dodgydock}
              alt="The Dodgy Dock Restaurant at True Blue Bay Resort"
              width={400}
              height={300}
              className="rounded-lg mt-8 shadow-lg mx-auto my-4"
            />
            <figcaption className="text-center italic text-sm">
              True Blue Bay - The Dodgy Dock Restaurant
            </figcaption>
          </div>
        </section>
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
