import Modal from "@/components/Modal";
import { useState } from "react";
import { GuestData } from "@/helpers/guestData";

interface PersonEditModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: GuestData | null) => void;
  guest: GuestData;
  refetchGuests: () => void;
}

export default function PersonEditModal({
  modalIsOpen,
  setModalIsOpen,
  guest,
  refetchGuests,
}: PersonEditModalProps) {
  // Name input value
  const [name, setName] = useState(guest.name);
  // Dietary restriction input value
  const [diet, setDiet] = useState(guest.diet);
  // Attending Mehndi checkbox value
  const [attendingMehndi, setAttendingMehndi] = useState(
    guest.attending_mehndi
  );
  // Attending Grenada checkbox value
  const [attendingGrenada, setAttendingGrenada] = useState(
    guest.attending_grenada
  );
  // Error state
  const [error, setError] = useState("");
  // Loading state for update request
  const [loading, setLoading] = useState(false);
  // Success message state
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update guest data
    const updatedGuest = {
      ...guest,
      name,
      diet,
      attending_mehndi: attendingMehndi,
      attending_grenada: attendingGrenada,
    };

    try {
      // Set loading state
      setLoading(true);
      // Update guest data in the database
      fetch(`/api/guest/${guest.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGuest),
      }).then(async () => {
        // Reset loading state
        setLoading(false);
        // Show success message
        setSuccess("Guest updated successfully.");
        // Refetch Guests & Close the modal after 2 seconds
        await refetchGuests();
        setTimeout(async () => {
          setSuccess("Reloading guests...");
        }, 2000);
        setTimeout(() => {
          setModalIsOpen(null);
        }, 4000);
      });
    } catch (error) {
      console.log("Error updating guest: ", error);
      setError("An error occurred. Check the logs.");
    }
  };

  const disableSubmitButton = loading || Boolean(success);

  return (
    <Modal
      title={guest.name}
      isOpen={Boolean(modalIsOpen)}
      handleClose={() => {
        setModalIsOpen(null);
      }}
      confirmCancel
    >
      <form className="w-full flex flex-col items-start justify-center gap-y-6">
        {/* Guest name text input */}
        <div className="flex flex-col items-start w-full">
          <label className="text-lg">Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full border-2 p-1 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start">
          {/* Guest attending mehndi checkbox */}
          <label>
            <input
              type="checkbox"
              checked={attendingMehndi}
              onChange={(e) => setAttendingMehndi(e.target.checked)}
              className="mr-2"
            />
            Attending Mehndi
          </label>
          {/* Guest attending wedding checkbox */}
          <label>
            <input
              type="checkbox"
              checked={attendingGrenada}
              onChange={(e) => setAttendingGrenada(e.target.checked)}
              className="mr-2"
            />
            Attending Grenada
          </label>
        </div>
        {/* Guest dietary restriction text input */}
        <div className="flex flex-col items-start w-full">
          <label className="text-lg">Dietary restrictions:</label>
          <input
            type="text"
            placeholder="Dietary restrictions"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="border w-full border-2 p-1 rounded-lg"
          />
        </div>
        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Success message */}
        {success && <p className="text-green-500">{success}</p>}

        {/* Confirm and Cancel buttons */}
        <div className="flex justify-between w-full mt-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`text-2xl border border-2 py-2 px-5 rounded-lg ${
              disableSubmitButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#06b6d4] hover:text-white cursor-pointer"
            }`}
            disabled={disableSubmitButton}
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
          <button
            onClick={() => {
              setModalIsOpen(null);
            }}
            className="text-2xl border border-2 py-2 px-5 rounded-lg hover:bg-[#06b6d4] hover:text-white ml-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
