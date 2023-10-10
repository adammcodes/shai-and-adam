"use client";
import { Fragment, useState } from "react";
import { GuestData } from "@/helpers/guestData";
// components
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import TextInput from "./TextInput";
import RadioSelect from "./RadioSelect";

// Component for rending each guest in the group
const Guest = ({ guest }: { guest: GuestData }) => {
  // state for confirmation/error modal
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [name, setName] = useState(guest.name);
  const [attendingMehndi, setAttendingMehndi] = useState(
    guest.submitted_rsvp ? guest.attending_mehndi : undefined
  );
  const [attendingGrenada, setAttendingGrenada] = useState(
    guest.submitted_rsvp ? guest.attending_grenada : undefined
  );
  const [diet, setDiet] = useState(guest.diet);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if they haven't said yes or no to either event, don't submit
    if (attendingMehndi === undefined || attendingGrenada === undefined) {
      // open error modal
      setErrorModalOpen(true);
      return;
    }

    try {
      // submit data to API
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
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment key={guest.id}>
      <Card title={guest.name}>
        <form
          className="flex w-full flex-col items-around"
          onSubmit={handleSubmit}
        >
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
            onChange={(value: boolean | undefined) => setAttendingMehndi(value)}
            id={`mehndi-attending-${guest.id}`}
            name="mehndi-attending"
          />

          {/* Attending Grenada - checkbox */}
          <RadioSelect
            label="Attending Grenada"
            value={attendingGrenada}
            onChange={(value: boolean | undefined) =>
              setAttendingGrenada(value)
            }
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
          <button
            type="submit"
            className="bg-[#06b6d4] text-white rounded-md p-2 m-2 hover:bg-[#d9f99d] hover:text-black"
          >
            Submit RSVP
          </button>
        </form>
      </Card>
      {errorModalOpen && (
        <Modal
          title="Error"
          isOpen={errorModalOpen}
          handleClose={() => setErrorModalOpen(false)}
        >
          <p className="text-2xl text-center">
            Please let us know if you are coming to both events before
            submitting 😄
          </p>
        </Modal>
      )}
    </Fragment>
  );
};

export default Guest;
