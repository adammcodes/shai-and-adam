// list of guests on the Invite List, which is a notion database
// Fetches Invite List from Notion database
import { useEffect, useState } from "react";
import Button from "./Button";
import sendWeddingInvite from "../_helpers/sendWeddingInvite";
// import types
import { GuestData } from "@/helpers/guestData";

type SendingInvites = string[];

// Modal
import Modal from "@/components/Modal";
import ConfettiExplosion from "react-confetti-explosion";

export default function GuestList() {
  const [guests, setGuests] = useState<GuestData[]>([]);
  // loading state for fetching guest list
  const [loading, setLoading] = useState(true);
  // error message state for fetching guest list
  const [errorMessage, setErrorMessage] = useState<string>("");
  // loading state for sending invite (array of id strings that are loading)
  const [sendingInvite, setSendingInvite] = useState<SendingInvites>([]);
  // Modal state for sending invite success
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // state for confetti explosion
  const [confetti, setConfetti] = useState(false);
  // Error modal state
  const [errorModalText, setErrorModalText] = useState("");
  // state for selected guests (array of id strings)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await fetch("/api/notion", {
          cache: "no-store",
        });
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

  // number of guests who have submitted an rsvp
  const rsvpCount = guests.filter(
    (guest: GuestData) => guest.submitted_rsvp
  ).length;

  // number of guests who have had their invite delivered
  const deliveredCount = guests.filter(
    (guest: GuestData) => guest.invite_delivered
  ).length;

  // update Invite Delivered field in Notion database for guest
  const updateInviteDelivered = async (guest: GuestData) => {
    console.log(`Updating Notion data delivered status for ${guest.name}`);
    const response = await fetch("/api/notion", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: guest.id,
        delivered: true,
        name: guest.name,
      }),
    });
    const data = await response.json();
    return data;
  };

  // handler for sending wedding invite for 1 guest
  const handleSendWeddingInvite = async (guest: GuestData) => {
    // turn on loading state for this guest
    setSendingInvite([...sendingInvite, guest.id]);

    // send wedding invite
    const response = await sendWeddingInvite(
      guest.email,
      guest.id,
      guest.name,
      guest.group_number
    );

    // if successful, update the database
    if (response?.accepted.length && response.accepted.includes(guest.email)) {
      // Update the notion database with the invite_delivered field
      const data = await updateInviteDelivered(guest);

      if (data.status === "success") {
        // confetti
        setConfetti(true);
        // open modal
        setModalIsOpen(true);
      } else {
        console.log("Error updating Notion database");
        setErrorModalText("Error updating Notion database. Check logs.");
      }
    } else {
      console.log(response);
      console.log(response?.rejected);
      setErrorModalText("Error sending wedding invite. Check logs.");
    }
    // turn off loading state for this guest
    setSendingInvite(sendingInvite.filter((id) => id !== guest.id));
  };

  // handler for selecting a guest (local state)
  const handleSelectGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedGuests([...selectedGuests, name.split("-")[1]]);
    } else {
      setSelectedGuests(
        selectedGuests.filter((id) => id !== name.split("-")[1])
      );
    }
  };

  // handler for sending wedding invite to selected guests
  const handleSendToSelected = async () => {
    // turn on loading state for selected guests
    setSendingInvite([...sendingInvite, ...selectedGuests]);

    // send wedding invite for each selected guest
    const responses = await Promise.all(
      selectedGuests.map(async (id) => {
        const guest = guests.find((guest) => guest.id === id);
        if (guest) {
          return await sendWeddingInvite(
            guest.email,
            guest.id,
            guest.name,
            guest.group_number
          );
        }
      })
    );

    console.log(responses);

    const successfulDeliveries = responses.filter(
      (response) => response?.accepted.length
    );

    // if any email is rejected, log error to console
    if (responses.some((response) => response?.rejected.length)) {
      console.error(responses.filter((response) => response?.rejected.length));
      setErrorModalText("Error sending some emails. Check logs.");
    }

    // if there is at least one successful delivery
    if (successfulDeliveries.length) {
      // if email successful, update the database for each guest
      // Update the notion database with the invite_delivered field for successful deliveries
      console.log(
        "Updating Notion database with invite_delivered field for each selected guest"
      );
      const updateResponses = await Promise.all(
        successfulDeliveries.map(async (response) => {
          const guest = guests.find(
            (guest) => guest.email === response?.accepted[0]
          );
          if (guest) {
            return await updateInviteDelivered(guest);
          }
        })
      );

      // successful updates
      const successfulUpdates = updateResponses.filter(
        (response) => response?.status === "success"
      );
      // unsuccessful updates
      const unsuccessfulUpdates = updateResponses.filter(
        (response) => response?.status !== "success"
      );
      console.log("Successful updates:", successfulUpdates);
      console.log("Unsuccessful updates:", unsuccessfulUpdates);

      if (successfulUpdates.length === selectedGuests.length) {
        console.log("All deliveries and updates successful!");
        // confetti
        setConfetti(true);
        // open modal
        setModalIsOpen(true);
      } else {
        // open modal but no confetti
        setModalIsOpen(true);
      }
    }

    // turn off loading state for selected guests
    setSendingInvite(
      sendingInvite.filter((id) => !selectedGuests.includes(id))
    );
  };

  return (
    <section className="flex min-h-screen flex-col items-center mt-[2em] text-black">
      <div className="text-center">
        <h1 className="text-center font-bold text-2xl py-5">
          Guest List ({guests.length} people)
        </h1>

        <h2 className="text-center font-bold text-blue-500 text-xl py-5">
          {deliveredCount}/{guests.length} have had their invite delivered.
        </h2>

        <h2 className="text-center font-bold text-blue-500 text-xl py-5">
          {rsvpCount}/{guests.length} have submitted an RSVP.
        </h2>

        <Button
          text={sendingInvite.length > 0 ? "Sending..." : "Send To Selected"}
          onClick={handleSendToSelected}
          // className="bg-[#06b6d4] text-white rounded-md p-2 m-2 hover:bg-[#d9f99d] hover:text-black"
          disabled={selectedGuests.length === 0 || sendingInvite.length > 0}
        />

        {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}

        {guests.length > 0 && (
          <table className="text-center mt-10">
            <thead>
              <tr>
                <th className="px-5">Select</th>
                <th className="px-5">Delivered</th>
                <th className="px-5">Name</th>
                <th className="px-5">RSVP Submitted</th>
                <th className="px-5">Group #</th>
                <th className="px-5">Email</th>
                <th className="px-5">Invite to mehndi</th>
                <th className="px-5">Attending mehndi</th>
                <th className="px-5">Invite to Grenada</th>
                <th className="px-5">Attending Grenada</th>
                <th className="px-5">Diet</th>
                <th className="px-5">Send Email</th>
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
                    <td className="border border-black">
                      <input
                        type="checkbox"
                        name={`select-${guest.id}`}
                        id={`select-${guest.id}`}
                        checked={selectedGuests.includes(guest.id)}
                        onChange={handleSelectGuest}
                      />
                    </td>
                    <td className="border border-black">
                      {guest.invite_delivered ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black">{guest.name}</td>
                    <td className="border border-black">
                      {guest.submitted_rsvp ? "✅" : "🔲"}
                    </td>
                    <td className="border border-black">
                      {guest.group_number}
                    </td>
                    <td className="border border-black">{guest.email}</td>
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
                          text={
                            sendingInvite.includes(guest.id)
                              ? "Sending..."
                              : "Send Wedding Invite"
                          }
                          onClick={() => {
                            handleSendWeddingInvite(guest);
                          }}
                          disabled={
                            sendingInvite.includes(guest.id) ||
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

        {modalIsOpen && confetti && (
          <Modal
            title="Success"
            isOpen={modalIsOpen}
            handleClose={() => {
              setModalIsOpen(false);
            }}
          >
            <h1>Invite sent successfully!</h1>
            {confetti && (
              <ConfettiExplosion
                width={1600}
                zIndex={1000}
                onComplete={() => {
                  setConfetti(false);
                }}
              />
            )}
          </Modal>
        )}

        {modalIsOpen && !confetti && (
          <Modal
            isOpen={modalIsOpen}
            title="Partial Success"
            handleClose={() => {
              setModalIsOpen(false);
            }}
          >
            <h1>Invites sent successfully!</h1>
            <p>Check the logs for any unsuccessful deliveries or updates.</p>
          </Modal>
        )}

        {errorModalText && (
          <Modal
            title="Error"
            isOpen={Boolean(errorModalText)}
            handleClose={() => setErrorModalText("")}
          >
            <p className="text-2xl text-center">{errorModalText}</p>
          </Modal>
        )}
      </div>
    </section>
  );
}
