"use client";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";
import Paragraph from "@/components/Paragraph";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-xl">
      <Card title="Shai & Adam">
        <h2 className="font-bold">are getting married 🥂</h2>
        <br />
        <strong>We will be hosting two events:</strong>
        <ol className="list-disc p-5">
          <li>
            <Link href="/mehndi" className="underline">
              Mehndi
            </Link>{" "}
            - May&nbsp;4, 2024 in Markham, Ontario
          </li>
          <li>
            Ceremony & Reception - May&nbsp;9, 2024 in{" "}
            <Link href="/grenada" className="underline">
              Grenada
            </Link>{" "}
          </li>
        </ol>
      </Card>

      <Card title="What To Expect">
        <Paragraph>
          &emsp;We are both delighted to know that so many people are excited to
          celebrate with us, and we would like to use this website to share with
          you what our wedding will look like.
        </Paragraph>
        <Paragraph>
          &emsp;Firstly, we acknowledge that a destination wedding is a lot to
          ask, and we want you all to know your presence is gift enough.
        </Paragraph>
        <Paragraph>
          &emsp;Secondly, in order to celebrate this occasion with as many of
          our guests as possible, we have decided to divide the celebrations
          between two events: the{" "}
          <Link href="/mehndi" className="underline">
            Mehndi
          </Link>{" "}
          (in Markham, Ontario) and the Ceremony & Reception (in St. George's,
          Grenada). Please feel free to attend one or both events. We feel
          blessed to share this milestone with you in any capacity.
        </Paragraph>

        <Paragraph>
          &emsp;The{" "}
          <Link href="/mehndi" className="underline">
            Mehndi
          </Link>{" "}
          page on the website will provide you with all the information you will
          need. Please check the website periodically for updates if you wish to
          stay well informed.
        </Paragraph>

        <Paragraph>
          &emsp;The ceremony and reception will be held in St. George's,
          Grenada, West Indies, at the True Blue Bay Resort. We have chosen this
          location as Grenada holds sentimental value to both of us. You may
          find that our wedding ceremony is structured differently than other
          destination weddings. This is because the entire island brings us joy,
          and our connection to it is much deeper than to a resort alone. As
          Grenada is a place that has brought us both great peace and happiness,
          we want to share the whole island with those closest to us.
        </Paragraph>
        <Paragraph>
          &emsp;Keeping this in mind, we encourage guests to choose
          accommodation that suits your needs. Of course, we will guide and
          assist you in this process. The sections on "Places to Stay," and
          "Things to Do," will hopefully allow all of our guests to have a
          well-rounded vacation and wedding celebration with us. We will also be
          providing information on transportation so that travel on the island
          will be as convenient as possible.
        </Paragraph>
        <Paragraph>
          &emsp;In order to spend as much time together as we can, as well as to
          allow all of our guests the freedom to choose how they spend their
          time, we will be including information about where the couple will be
          on each day/evening in Grenada. Please feel free to meet us in these
          places at your leisure.
        </Paragraph>
        <Paragraph>
          We look forward to seeing you all for our wedding celebrations!
        </Paragraph>
        <p className="w-full p-3">
          <br />
          With Love,
          <br /> Adam and Shai 💕
        </p>
      </Card>
      <Image
        src={"/images/us.jpg"}
        alt="Shai and Adam"
        width={300}
        height={200}
        className="rounded-[30px] drop-shadow-lg"
      />
    </main>
  );
}
