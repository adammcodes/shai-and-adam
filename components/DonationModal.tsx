"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button, IconButton } from "@chakra-ui/react";
import Image from "next/image";

const ICON_WIDTH = 40;
const ICON_HEIGHT = 60;

const GiftSVG = () => (
  <div className="text-yellow-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12"
    >
      <rect x="3" y="8" width="18" height="14" rx="2" ry="2" />
      <path d="M12 8v14" />
      <path d="M3 12h18" />
      <path d="M12 3l4 5H8l4-5" />
    </svg>
  </div>
);

export default function DonationModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) {
    return (
      <IconButton
        aria-label="Donation Modal"
        onClick={() => setIsModalOpen(true)}
        icon={<GiftSVG />}
        colorScheme="blue"
        variant="outline"
        size="lg"
        borderRadius="full"
      />
    );
  }

  return (
    <Modal
      title=""
      isOpen={isModalOpen}
      handleClose={closeModal}
      background="bg-gradient-img"
      confirmCancel={true}
    >
      <div className="flex flex-col h-full pb-4">
        <Image src={"/images/top-divider.png"} alt="divider" width={600} height={500} />
        <div className="h-full max-h-unset lg:max-h-[500px] p-2 lg:p-4 text-[#30518A] text-center font-bold flex flex-col justify-around gap-y-6">
          <p className="text-lg">
            In lieu of wedding favours,
            <br /> Adam and Shaileen have donated&nbsp;to
          </p>
          <div className="flex justify-center flex-col items-center gap-y-2">
            <Image src={"/images/dog.png"} alt="dog" width={ICON_WIDTH} height={ICON_HEIGHT} />
            <em>
              <a
                href="https://www.instagram.com/explore/locations/340181289374718/grenada-spca-animal-shelter/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#30518A] hover:text-[#FFD700]"
              >
                Grenada SPCA
              </a>
            </em>
          </div>
          <div className="flex justify-center flex-col items-center gap-y-2">
            <Image src={"/images/cat.png"} alt="dog" width={ICON_WIDTH} height={ICON_HEIGHT} />
            <em>
              <a
                href="https://nextchancecatrescue.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#30518A] hover:text-[#FFD700]"
              >
                Next Chance Cat Rescue
              </a>
            </em>
          </div>
          <div className="flex justify-center flex-col items-center gap-y-2">
            <Image src={"/images/house.png"} alt="dog" width={ICON_WIDTH} height={ICON_HEIGHT} />
            <em>
              <a
                href="https://theconnectiongrenada.com/listing/grand-anse-home-for-the-aged/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#30518A] hover:text-[#FFD700]"
              >
                Grand Anse Home for the Aged
              </a>
            </em>
          </div>
          <p className="text-lg">Visit the links above for more information.</p>
          <Button
            onClick={closeModal}
            colorScheme="blue"
            className="w-1/4 mx-auto text-xl border border-2 py-2 px-4 rounded-lg hover:bg-[#06b6d4] hover:text-white"
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
}
