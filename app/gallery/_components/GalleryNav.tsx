import Link from "next/link";
import { events } from "../_constants/links";

export default function GalleryNav({ eventName }: { eventName: string }) {
  return (
    <nav className="flex flex-col lg:flex-row items-center justify-center space-y-2 lg:space-y-0 lg:space-x-4 mt-4 px-4">
      {events.map(event => {
        const currentPage = event.route.split("/")[2] === eventName;

        if (currentPage) {
          return (
            <span key={event.name} className="text-gray-500">
              {event.name}
            </span>
          );
        }

        return (
          <Link
            key={event.name}
            href={event.route}
            className={`text-blue-500 hover:text-blue-700 hover:underline transition`}
          >
            {event.name}
          </Link>
        );
      })}
    </nav>
  );
}
