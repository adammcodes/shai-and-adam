// app/gallery/page.tsx
import Link from "next/link";
import Image from "next/image";
import PasswordProtection from "./_components/PasswordProtection";
import { events } from "./_constants/links";
import type { GalleryEvent } from "./_constants/links";

export default function GalleryLanding() {
  return (
    <PasswordProtection>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Wedding Gallery</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map((event: GalleryEvent) => (
            <Link href={event.route} key={event.name} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={event.coverImage}
                    alt={`${event.name} cover`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{event.label || event.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PasswordProtection>
  );
}
