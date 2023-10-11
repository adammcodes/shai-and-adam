// mehndi page
import Card from "@/components/Card";
import Link from "next/link";

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
          There will be Indian food and Italian food! We&apos;re still working
          out the rest of the details. We&apos;ll be sharing more information as
          we get closer to the date!
        </p>
      </Card>
    </main>
  );
}
