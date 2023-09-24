// list of guests on the Invite List, which is a notion database
// Fetches Invite List from Notion database
import { useEffect, useState } from "react";

interface Guest {
  id: string;
  name: string;
  email: string;
  group_number: number;
  invite_to_mehndi: Boolean;
  attending_mehndi: Boolean;
  invite_to_grenada: Boolean;
  attending_grenada: Boolean;
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

        const { guests } = data;
        setGuests(guests);
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

  const sendSaveTheDate = async (email: string) => {
    // try {
    //   console.log("Sending save-the-date to:", email);
    //   const response = await fetch("/api/email", {
    //     method: "POST",
    //     body: JSON.stringify({ email }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (e: unknown) {
    //   if (e instanceof Error) {
    //     console.error(e.message);
    //     if (e.message && typeof e.message === "string") {
    //       setErrorMessage(e.message);
    //     }
    //   }
    // }
  };

  return (
    <section className="flex min-h-screen flex-col items-center mt-[2em] text-black">
      <div className="text-center">
        <h1 className="text-center font-bold text-2xl py-5">
          Guest List ({guests.length} people)
        </h1>

        {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}

        {guests.length > 0 && (
          <table className="text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Group Number</th>
                <th className="px-10">Invite to mehndi</th>
                <th className="px-10">Attending mehndi</th>
                <th className="px-10">Invite to Grenada</th>
                <th className="px-10">Attending Grenada</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {guests
                .sort((a: Guest, b: Guest) => a.group_number - b.group_number)
                .map((guest: Guest) => (
                  <tr key={guest.id}>
                    <td className="border border-black">{guest.name}</td>
                    <td className="border border-black">{guest.email}</td>
                    <td className="border border-black">
                      {guest.group_number}
                    </td>
                    <td className="border border-black">
                      {guest.invite_to_mehndi ? "Yes" : "No"}
                    </td>
                    <td className="border border-black">
                      {guest.attending_mehndi ? "Yes" : "No"}
                    </td>
                    <td className="border border-black">
                      {guest.invite_to_grenada ? "Yes" : "No"}
                    </td>
                    <td className="border border-black">
                      {guest.attending_grenada ? "Yes" : "No"}
                    </td>
                    <td className="border border-black p-5 flex flex-col">
                      {guest.email ? "Send Invite" : "No Email"}
                      <button
                        className={`${
                          guest.email
                            ? "border-2 border-black font-bold text-blue bg-white-500 hover:bg-blue-dark hover:text-white"
                            : ""
                        } py-2 px-4 rounded-lg`}
                        onClick={() => {
                          sendSaveTheDate(guest.email);
                        }}
                        disabled={!guest.email}
                      >
                        {guest.email ? "Send Save The Date" : "No Email"}
                      </button>
                      <button
                        className={`${
                          false
                            ? "font-bold text-blue bg-white-500 hover:bg-blue-dark hover:text-white"
                            : ""
                        } py-2 px-4 rounded-lg mt-2`}
                        onClick={() => {
                          console.log("send email to", guest.email);
                        }}
                        disabled={true}
                      >
                        {guest.email ? "Send Invite" : "No Email"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </section>
  );
}
