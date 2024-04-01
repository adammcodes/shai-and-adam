"use client";
import Image from "next/image";
import Link from "next/link";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import mondello from "public/images/mondello.jpeg";
import cefalu from "public/images/cefalu.jpeg";
import tomatoes from "public/images/tomatoes.jpeg";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-lg">
      <Card title="Shaileen&nbsp;Wallani & Adam&nbsp;Marsala">
        <h2 className="font-bold">are getting married 🥂</h2>
        <br />
        <strong>We will be hosting two events:</strong>
        <ol className="list-disc p-5">
          <li>
            <Link href="/mehndi" className="underline">
              Mehndi
            </Link>{" "}
            - May 4, 2024 in Markham, Ontario
          </li>
          <li>
            Ceremony & Reception - May 9, 2024 in{" "}
            <Link href="/grenada" className="underline">
              Grenada
            </Link>{" "}
          </li>
        </ol>

        <p className="text-center mb-3">
          Please read our page about{" "}
          <Link href="/about" className="underline">
            what to expect
          </Link>{" "}
          to learn more about our plans.
        </p>

        <p className="text-center">
          If you have any questions please reach out to us at{" "}
          <Link
            href="mailto:pineappleshirt473@gmail.com"
            target="_blank"
            className="underline"
          >
            pineappleshirt473@gmail.com
          </Link>
          .
        </p>
      </Card>

      <Image
        src={mondello}
        alt="Mondello Beach"
        width={350}
        height={200}
        className="rounded-[30px] drop-shadow-lg mb-5 max-w-[90%]"
      />
    </main>
  );
}
