import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/images/shaiandadam.png";

const googleFont = DM_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shai & Adam",
  description: "Custom wedding website for Shai & Adam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={googleFont.className}>
        <nav className="flex flex-col sm:flex-row mb-10">
          <Image src={hero} alt="Shai and Adam" width={200} height={200} />
          <ul className="flex space-x-4 text-blue p-5">
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/mehendi">Mehendi</Link>
            </li>
            <li>
              <Link href="/grenada">Grenada</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}