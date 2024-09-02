// mehndi page
"use client";
import { useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "@/components/Paragraph";

export default function Mehndi() {
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

  return (
    <main className="flex min-h-screen flex-col items-center text-xl">
      <Card title="Mehndi">
        <p className="italic text-center">
          Saturday May 4th, 2024
          <br className="lg:hidden" /> @ 6:30PM
        </p>
        <br />
        <strong>Location:</strong>
        <p className="text-center">
          Dum Pukht, Markham, Ontario.
          <br />
          <Link target="_blank" href="https://maps.app.goo.gl/bkuQLwFXmVVzWt3i6">
            323 Denison St Markham, ON L3R&nbsp;1B7
          </Link>
        </p>
      </Card>

      <Card title="What Is a Mehndi?">
        <Paragraph>
          &emsp;An Ismaili Mehndi (Henna) Ceremony is traditionally a pre-wedding celebration hosted
          by the bride and her family in the bride's home. Although this is typically a small,
          casual affair, modern multi-cultural mehndi ceremonies are becoming more elaborate and
          inclusive of both families. A Mehndi Ceremony involves adorning the hands and feet of the
          bride with a henna design as a celebration. At a Mehndi, guests also have the opportunity
          to decorate their hands with henna. Many believe that the Mehndi Ceremony signifies
          happiness, prosperity, love and strength.
        </Paragraph>
        <Paragraph>
          &emsp;Mehndi (henna) is a paste made from the henna plant that is left on the skin to
          create a beautiful design. The longer henna paste is left on the skin, the darker the
          design will be.
        </Paragraph>
        <Image
          src={"/images/mehndi.png"}
          alt="Mehndi"
          width={410}
          height={410}
          className="rounded-[30px] drop-shadow-lg my-4"
        />
      </Card>

      <Card title="What happens at a Mehndi?">
        <Paragraph>Some traditions you will see:</Paragraph>
        <Paragraph>
          Puro: The women of the groom's family carry the bride's trousseau to welcome her into
          their family. In turn, the bride's mother greets them and will "ponke" each woman to
          welcome them into the bride's family.
        </Paragraph>
        <Paragraph>
          Ponke/Ponkwa: The ponkwa ceremony is performed many times throughout the wedding
          festivities. It is a method of bestowing blessings by the mothers of the couple. The
          mother places a dot of saffron water (chandlo) on the forehead of a person, representing
          good luck. She will then place rice on top of the chandlo, to signify bounty. Coloured
          rice or flower petals are then showered over the person three times as a blessing.
          Finally, the person is fed something sweet to bless them with, "sweetness," in life. After
          the mothers have completed the Ponkwa ceremony, guests are welcome to participate as well
          if they wish.
        </Paragraph>
        <Paragraph>
          Entrance of the Groom: The groom enters the hall accompanied by friends and family of his
          choice in the spirit of celebration as he enters a new phase in his life.
        </Paragraph>
        <Paragraph>
          Entrance of the Bride: The bride enters the hall led by friends and family of her choice.
          They hold a saree above her head to signify protection and dignity. Shaileen will be
          entering under her grandmother's saree.
        </Paragraph>
        <Paragraph>
          Sapatia: Sapatia are two clay pots that are placed on top of each other that are broken
          throughout the wedding ceremonies, and are filled with items of significance; lentils to
          symbolize abundance and bounty, silver to signify wealth, sugar representing sweetness and
          harmony, and turmeric for good health. Filled sapatias are placed in front of the couple
          who will stomp on them to break them open and release their contents. It is said that
          whoever breaks the sapatia first will rule the household.
        </Paragraph>
        <Paragraph>
          Blessing The Couple: Once the couple has entered the hall, it is time for the mothers to
          bestow their blessings. At this time, the mothers will ponke both the bride and groom.
          Both mothers will then hold the ends of their sarees over the heads of the bride and groom
          to symbolize protection. Sapatias are then placed in front of the couple and are broken to
          signify the end of the ceremony.
        </Paragraph>
      </Card>

      <Card title="FAQs">
        <Paragraph>
          <strong>Where is the Mehndi?</strong>
          <br />
          The Mehndi will be held at an Indian Restaurant called{" "}
          <a href="https://dumpukht.com/" target="_blank">
            Dum Pukht
          </a>{" "}
          in Markham, Ontario.
          <br />
          <br />
          <strong>What should I wear?</strong>
          <br />
          Both Indian and Western attire are appropriate. Dress code is similar to cocktail style
          attire.
          <br />
          <br />
          <strong>What are we eating?</strong>
          <br />
          Both Indian and Italian food will be served at the Mehndi.
          <br />
          <br />
          <strong>Where do I park?</strong>
          <br />
          There is a parking lot circling the building. The venue has requested that we park at the
          back or either side of the building.
          <br />
          <br />
          <strong>Will there be alcohol?</strong>
          <br />
          There will be an open bar available.
        </Paragraph>
      </Card>

      <Image
        src={"/images/stpeters.jpeg"}
        alt="Shai and Adam at the Vatican"
        width={300}
        height={200}
        className="rounded-[30px] drop-shadow-lg mt-5"
      />
    </main>
  );
}
