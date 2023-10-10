import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/images/600px.webp";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
              <ul className="flex space-x-4 text-blue p-5 mt-10 sm:mt-0 text-xl">
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/mehndi">Mehndi</Link>
                </li>
                <li>
                  <Link href="/grenada">Grenada</Link>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col min-h-screen items-center">
              <div className="flex-grow">{children}</div>
              <footer className="mt-auto py-10">
                <p className="text-center text-sm">
                  Made with ❤️ by{" "}
                  <a
                    href="https://adamm.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Adam
                  </a>
                </p>
              </footer>
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
