// list of guests on the Invite List, which is a notion database
// Fetches Invite List from Notion database
import { useEffect, useState } from "react";
import Button from "./Button";
import sendWeddingInvite from "../_helpers/sendWeddingInvite";
// import types
import { GuestData } from "@/helpers/guestData";

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

  const sendInviteToMehndi = async (email: string) => {
    console.log("Sending mehndi invite to:", email);
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
                <th>Invite to mehndi</th>
                <th>Attending mehndi</th>
                <th>Invite to Grenada</th>
                <th>Attending Grenada</th>
                <th>Diet</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {guests
                .sort(
                  (a: GuestData, b: GuestData) =>
                    a.group_number - b.group_number
                )
                .map((guest: GuestData) => (
                  <tr key={guest.id}>
                    <td className="border border-black">{guest.name}</td>
                    <td className="border border-black">{guest.email}</td>
                    <td className="border border-black">
                      {guest.group_number}
                    </td>
                    <td className="border border-black">
                      {guest.invite_to_mehndi ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black">
                      {guest.attending_mehndi ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black">
                      {guest.invite_to_grenada ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black">
                      {guest.attending_grenada ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black px-5">{guest.diet}</td>
                    <td className="border-black p-5 flex flex-col">
                      {guest.invite_to_mehndi && !guest.invite_to_grenada && (
                        <Button
                          text="Send Mehndi Invite"
                          onClick={() => {
                            sendInviteToMehndi(guest.email);
                          }}
                          disabled={!guest.email || !guest.invite_to_mehndi}
                        />
                      )}
                      {guest.invite_to_grenada && guest.invite_to_mehndi && (
                        <Button
                          text="Send Wedding Invite"
                          onClick={() => {
                            sendWeddingInvite(
                              guest.email,
                              guest.id,
                              guest.name,
                              guest.group_number
                            );
                          }}
                          disabled={
                            !guest.email ||
                            !guest.invite_to_grenada ||
                            !guest.invite_to_mehndi
                          }
                        />
                      )}
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
