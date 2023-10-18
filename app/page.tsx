"use client";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
// import images from "public/images";
import mondello from "public/images/mondello.jpeg";
import cefalu from "public/images/cefalu.jpeg";
import tomatoes from "public/images/tomatoes.jpeg";

export default withPageAuthRequired(function Home() {
  return (
    <main className="grid grid-rows-2 gap-y-5">
      <Image
        src={mondello}
        alt="Mondello Beach"
        width={400}
        height={200}
        className="rounded-[30px] drop-shadow-lg"
      />
      <Image
        src={tomatoes}
        alt="Naples"
        width={400}
        height={200}
        className="rounded-[30px] drop-shadow-lg"
      />
      <Image
        src={cefalu}
        alt="Naples"
        width={400}
        height={200}
        className="rounded-[30px] drop-shadow-lg"
      />
    </main>
  );
});
