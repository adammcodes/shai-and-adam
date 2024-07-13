"use client";
import { Fragment, useEffect, useState } from "react";
// confetti animation
import ConfettiExplosion from "react-confetti-explosion";
// components & types
import { GuestData } from "@/helpers/guestData";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import TextInput from "./TextInput";
import RadioSelect from "./RadioSelect";

// Component for rending each guest in the group
const Guest = ({ guest, allGuests }: { guest: GuestData; allGuests: GuestData[] }) => {
  // all other guest names in the group:
  const guestNames = allGuests
    .filter(g => g.id !== guest.id)
    .map(guest => guest.name)
    .join(", ");
  // state for loading
  const [loading, setLoading] = useState(false);
  // state for error modal
  const [errorModalText, setErrorModalText] = useState("");
  // state for confirmation modal
  const [confirmationModalText, setConfirmationModalText] = useState("");
  // state for confetti
  const [confetti, setConfetti] = useState(false);
  // state for form data
  const [name, setName] = useState(guest.name);
  const [attendingMehndi, setAttendingMehndi] = useState(
    guest.submitted_rsvp ? guest.attending_mehndi : undefined
  );
  const [attendingGrenada, setAttendingGrenada] = useState(
    guest.submitted_rsvp ? guest.attending_grenada : undefined
  );
  const [diet, setDiet] = useState(guest.diet);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    // if they haven't said yes or no to either event, don't submit
    if (attendingMehndi === undefined || attendingGrenada === undefined) {
      // open error modal
      setErrorModalText("Please let us know if you are coming to both events before submitting 😄");
      setLoading(false);
      return;
    }

    try {
      // submit RSVP form data to API
      fetch(`/api/guest/${guest.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attending_mehndi: attendingMehndi,
          attending_grenada: attendingGrenada,
          diet,
        }),
      })
        .then(async res => {
          if (res.ok) {
            const data = await res.json(); // Parse response body as JSON
            return data; // Return the parsed data
          } else {
            setLoading(false);
            throw new Error("Network response was not ok");
          }
        })
        .then(data => {
          // open confirmation modal
          setLoading(false);
          const attending = data.attending_mehndi || data.attending_grenada;
          if (attending) {
            // run the confetti animation
            setConfetti(true);
          }
          const message = attending ? `We will see you there! 🎉` : data.message;
          setConfirmationModalText(message);
        });
    } catch (err) {
      console.log(err);
      // open error modal
      setErrorModalText(
        "Something went wrong. Please refresh the page and try again. If you continue to have issues please email your RSVP responses to wedding@shaileenandadam.rsvp"
      );
    }
  };

  const handleAttendingMehndi = (value: boolean) => {
    setAttendingMehndi(value);
  };
  const handleAttendingGrenada = (value: boolean) => {
    setAttendingGrenada(value);
  };

  // workaround for Next.js issue with broken radio buttons: https://github.com/vercel/next.js/issues/49499
  useEffect(() => {
    // use the dom to set the value of the radio buttons
    const yesMehndi = document.getElementById(
      `yes-mehndi-attending-${guest.id}`
    ) as HTMLInputElement;
    const noMehndi = document.getElementById(`no-mehndi-attending-${guest.id}`) as HTMLInputElement;
    const yesGrenada = document.getElementById(
      `yes-grenada-attending-${guest.id}`
    ) as HTMLInputElement;
    const noGrenada = document.getElementById(
      `no-grenada-attending-${guest.id}`
    ) as HTMLInputElement;

    // if the guest has already submitted their RSVP, set the radio buttons to their response
    if (guest.submitted_rsvp) {
      if (guest.attending_mehndi) {
        yesMehndi.checked = true;
      } else {
        noMehndi.checked = true;
      }
      if (guest.attending_grenada) {
        yesGrenada.checked = true;
      } else {
        noGrenada.checked = true;
      }
    }
  }, [guest]);

  return (
    <Fragment key={guest.id}>
      <Card title={guest.name}>
        <form className="flex w-full flex-col items-around" onSubmit={handleSubmit}>
          {/* Name - text */}
          <TextInput
            label="Name"
            value={name}
            onChange={(value: string) => setName(value)}
            id={`name-${guest.id}`}
            name={`name-${guest.id}`}
          />

          {/* Attending Mehndi - checkbox */}
          <RadioSelect
            label="Attending Mehndi"
            value={attendingMehndi}
            onChange={handleAttendingMehndi}
            id={`mehndi-attending-${guest.id}`}
            name="mehndi-attending"
          />

          {/* Attending Grenada - checkbox */}
          <RadioSelect
            label="Attending Grenada"
            value={attendingGrenada}
            onChange={handleAttendingGrenada}
            id={`grenada-attending-${guest.id}`}
            name="grenada-attending"
          />

          {/* Dietary Restrictions - text */}
          <TextInput
            label="Dietary Restrictions"
            value={diet}
            onChange={(value: string) => setDiet(value)}
            id={`diet-${guest.id}`}
            name={`diet-${guest.id}`}
          />

          {/* Submit Button */}
          {!loading && (
            <button
              type="submit"
              className="bg-[#06b6d4] text-white rounded-md p-2 m-2 hover:bg-[#d9f99d] hover:text-black"
            >
              Submit RSVP
            </button>
          )}
          {loading && (
            <button type="submit" className="bg-[#EEE] text-black rounded-md p-2 m-2" disabled>
              Submitting...
            </button>
          )}
        </form>
      </Card>
      {errorModalText && (
        <Modal
          title="Error"
          isOpen={Boolean(errorModalText)}
          handleClose={() => setErrorModalText("")}
        >
          <p className="text-2xl text-center">{errorModalText}</p>
        </Modal>
      )}
      {confirmationModalText && (
        <Modal
          title="RSVP Submitted"
          isOpen={Boolean(confirmationModalText)}
          handleClose={() => setConfirmationModalText("")}
        >
          {(guest.attending_grenada || guest.attending_mehndi) && confetti && (
            <div className="w-full flex justify-center items-center">
              <ConfettiExplosion
                width={1600}
                zIndex={1000}
                onComplete={() => {
                  setConfetti(false);
                }}
              />
            </div>
          )}
          <p className="text-center text-xl lg:text-3xl">{confirmationModalText}</p>
          <br />
          <br />
          <p className="text-center text-lg lg:text-2xl">
            If you haven't done so already please submit the RSVP for the other guests in your group
            on this page:
            <br /> {guestNames}
          </p>
        </Modal>
      )}
    </Fragment>
  );
};

export default Guest;
