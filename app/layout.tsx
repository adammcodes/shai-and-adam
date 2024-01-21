import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/images/600px.webp";
import github_small from "@/public/images/github_small.png";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const googleFont = DM_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shai & Adam",
  description:
    "Only the GOAT of all wedding websites for the GOAT of all weddings for the GOAT of all couples.",
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={googleFont.className}>
          <div className="min-h-screen">
            <nav className="flex flex-col sm:flex-row">
              <div className="h-[200px] w-[200px]">
                <Image
                  src={hero}
                  alt="Shai and Adam"
                  width={200}
                  height={200}
                  priority
                  loading="eager"
                />
              </div>
              <ul className="flex flex-wrap space-x-4 text-blue p-5 mt-10 sm:mt-0 text-xl">
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
                  <Link href="/rsvp">RSVP</Link>
                </li>
                {process.env.NODE_ENV === "development" && (
                  <li>
                    <a href="/api/auth/logout">Logout</a>
                  </li>
                )}
              </ul>
            </nav>

            <div className="flex flex-col min-h-screen items-center">
              <div className="flex-grow">{children}</div>
              <footer className="mt-auto py-10 flex flex-col justify-center items-center">
                <a
                  href="https://github.com/MagicMark5/shai-and-adam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={github_small}
                    alt="GitHub Logo"
                    width={25}
                    height={25}
                  />
                </a>
                <p className="text-center text-sm pt-2">
                  Custom build from code and ❤️ by{" "}
                  <a
                    href="https://adamm.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Adam
                  </a>
                  .<br />
                  Do you need a website as special as this?{" "}
                  <a
                    href="mailto:adammarsala@hotmail.com?subject=Custom Website Inquiry&body=Hi Adam, I'm interested in a custom website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Email&nbsp;me
                  </a>
                  .
                </p>
              </footer>
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
