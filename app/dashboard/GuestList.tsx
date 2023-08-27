// list of guests on the Invite List, which is a notion database
// Fetches Invite List from Notion database
import { useEffect, useState } from "react";

interface Guest {
  id: string;
  name: string;
  email: string;
}

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await fetch("/api/notion");
        const data = await response.json();
        setGuests(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
          if (e.message && typeof e.message === "string") {
            setErrorMessage(e.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getGuests();
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center mt-[2em] text-black">
      <div>
        <h1 className="text-center font-bold text-2xl py-5">Guest List</h1>
        {loading && <p>Loading...</p>}
        {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}
        <ul>
          {guests.map((guest: Guest) => (
            <li key={guest.id}>
              <p>{guest.name}</p>
              <p>{guest.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
