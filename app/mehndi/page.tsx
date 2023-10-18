// mehndi page
"use client";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import stpeters from "public/images/stpeters.jpeg";

export default function Mehndi() {
  return (
    <main className="flex min-h-screen flex-col items-center text-xl">
      <Card title="Mehndi">
        <p className="italic">Saturday May 4th, 2024</p>
        <br />
        <strong>Location:</strong>
        <p className="text-center">
          Simply Delicious, Markham, Ontario.
          <br />
          <Link
            target="_blank"
            href="https://www.google.com/maps/place/Simply+Delicious/@43.8338783,-79.3574414,17z"
          >
            7850 Woodbine Ave, Markham, ON L3R 4S1
          </Link>
        </p>
        <br />
        <strong>Details:</strong>
        <p className="text-center">
          We&apos;re still working out the details. We&apos;ll be sharing more
          information as we get closer to the date.
        </p>
      </Card>

      <Image
        src={stpeters}
        alt="Shai and Adam at the Vatican"
        width={600}
        height={400}
        className="rounded-[30px] drop-shadow-lg mt-5"
      />
    </main>
  );
}
