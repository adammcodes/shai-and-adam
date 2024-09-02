import "./globals.css";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import github_small from "@/public/images/github_small.png";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Viewport, Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Shai & Adam",
  description:
    "Only the GOAT of all wedding websites for the GOAT of all weddings for the GOAT of all couples.",
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

const googleFont = DM_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={googleFont.className}>
          <div className="min-h-screen">
            <Nav />

            <div className="flex flex-col min-h-screen items-center">
              <div className="w-full flex-grow">{children}</div>
              <footer className="mt-auto py-10 flex flex-col justify-center items-center">
                <a
                  href="https://github.com/MagicMark5/shai-and-adam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={github_small} alt="GitHub Logo" width={25} height={25} />
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
