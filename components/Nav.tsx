"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/600px.webp";
import DonationModal from "@/components/DonationModal";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-row sm:items-start justify-between">
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="h-[200px] w-[200px] hidden lg:block">
          <Image
            src={hero}
            alt="Shai and Adam"
            style={{
              borderRadius: "0px 0px 50% 0px",
              boxShadow: "0px 0px 10px 0px #6f6a91",
            }}
            width={200}
            height={200}
            priority
            loading="eager"
          />
        </div>
        {/* Hamburger Icon */}
        <button className="sm:hidden p-5" onClick={toggleMenu} aria-label="Toggle menu">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Menu Items */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-blue p-5 text-xl sm:flex`}
        >
          <li>
            <Link href="/">Us</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/mehndi">Mehndi</Link>
          </li>
          <li>
            <Link href="/grenada">Grenada</Link>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
          {process.env.NODE_ENV === "development" && (
            <li>
              <a href="/api/auth/logout">Logout</a>
            </li>
          )}
        </ul>
      </div>

      <div className="mx-5 my-3">
        <DonationModal />
      </div>
    </nav>
  );
}
