"use client";
import { useState } from "react";
import Link from "next/link";
import DonationModal from "@/components/DonationModal";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 lg:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-3xl hidden lg:block" aria-label="Home">
          🥭
        </Link>

        {/* Hamburger Icon */}
        <button className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menu Items */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute sm:relative top-14 sm:top-auto left-0 sm:left-auto w-full sm:w-auto flex-col sm:flex-row items-start sm:items-center bg-white/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none shadow-lg sm:shadow-none rounded-b-2xl sm:rounded-none px-6 py-4 sm:p-0 gap-3 sm:gap-1 z-50 sm:flex`}
        >
          {[
            { href: "/", label: "Us" },
            { href: "/about", label: "About" },
            { href: "/mehndi", label: "Mehndi" },
            { href: "/grenada", label: "Grenada" },
            { href: "/gallery", label: "Gallery" },
          ].map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-1.5 rounded-full text-[#002F6C] hover:bg-white/30 transition-colors duration-200 text-base font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {process.env.NODE_ENV === "development" && (
            <li>
              <a
                href="/api/auth/logout"
                className="px-3 py-1.5 rounded-full text-[#002F6C] hover:bg-white/30 transition-colors duration-200 text-base font-medium"
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>

      <div>
        <DonationModal />
      </div>
    </nav>
  );
}
