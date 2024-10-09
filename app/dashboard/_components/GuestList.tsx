// list of guests on the Invite List, which is a notion database
// Fetches Invite List from Notion database
import { useEffect, useState, useMemo } from "react";

import Button from "./Button";
import Modal from "@/components/Modal";
import PersonIcon from "@mui/icons-material/Person";
import ConfettiExplosion from "react-confetti-explosion";
import Counter from "./Counter";
import PersonEditModal from "./PersonEditModal";
import CustomMessageModal from "./CustomMessageModal";

// emails
// import sendWeddingInvite from "../_helpers/sendWeddingInvite";
import sendThankyouEmail from "../_helpers/sendThankyouEmail";
// import sendUpdateEmail from "../_helpers/sendUpdateEmail";

// import types
import type { GuestData } from "@/helpers/guestData";

type SendingInvites = string[];

export default function GuestList() {
  // For counting things
  const [counter, setCounter] = useState(0);

  const [guests, setGuests] = useState<GuestData[]>([]);
  // loading state for fetching guest list
  const [loading, setLoading] = useState(true);
  // error message state for fetching guest list
  const [errorMessage, setErrorMessage] = useState<string>("");
  // loading state for sending invite (array of id strings that are loading)
  const [sendingEmail, setSendingEmail] = useState<SendingInvites>([]);
  // Modal state for sending email success
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Modal state for sending custom message
  const [customMessageGuest, setCustomMessageGuest] = useState<GuestData | null>(null);
  // state for confetti explosion
  const [confetti, setConfetti] = useState(false);
  // Success message for modal
  const [successModalText, setSuccessModalText] = useState("");
  // Error modal state
  const [errorModalText, setErrorModalText] = useState("");
  // state for selected guests (array of id strings)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  // sort guests by column name
  const [sortColumn, setSortColumn] = useState<string>("group_number");
  // sort direction
  const [sortDirection, setSortDirection] = useState<string>("asc");
  // active guest being edited in PersonEditModal
  const [activeGuest, setActiveGuest] = useState<GuestData | null>(null);

  // const guestsWithEmails = guests.filter((guest) => guest.email);

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await fetch("/api/notion", {
          cache: "no-store",
        });

        if (!response.ok) {
          // Try to get error message from response
          const errorText = await response.text();
          throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { guests } = data;
        setGuests(guests);
      } catch (e: unknown) {
        console.error("Error fetching guests:", e);

        if (e instanceof Error) {
          setErrorMessage(e.message);
        } else if (typeof e === "string") {
          setErrorMessage(e);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getGuests();
  }, []);

  // Function to toggle sort direction and set sort column
  const handleSort = (columnName: string) => {
    setSortColumn(columnName);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Sorted guests array based on sortColumn and sortDirection
  const sortedGuests = useMemo(() => {
    const sorter = (a: any, b: any) => {
      let A = a[sortColumn];
      let B = b[sortColumn];

      // If sorting by name, split and use the last name
      if (sortColumn === "name") {
        A = a[sortColumn].split(" ").slice(-1)[0];
        B = b[sortColumn].split(" ").slice(-1)[0];
      }

      if (A < B) return sortDirection === "asc" ? -1 : 1;
      if (A > B) return sortDirection === "asc" ? 1 : -1;
      return 0;
    };
    return [...guests].sort(sorter);
  }, [guests, sortColumn, sortDirection]);

  // number of guests who are attending the mehndi
  // const attendingMehndiCount = guests.filter((guest: GuestData) => guest.attending_mehndi).length;

  // number of guests who are attending the wedding in Grenada
  // const attendingGrenadaCount = guests.filter((guest: GuestData) => guest.attending_grenada).length;

  const guestsAttendingAtLeastOneEventWithEmail = guests
    .filter(guest => guest.email && (guest.attending_grenada || guest.attending_mehndi))
    .filter(guest => guest.thank_you_sent === false);

  // update Invite Delivered field in Notion database for guest
  const updateCheckboxField = async (guest: GuestData, field: string) => {
    console.log(`Updating Notion data ${field} status for ${guest.name}`);
    const response = await fetch("/api/notion", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: guest.id,
        delivered: true,
        name: guest.name,
        field: field,
      }),
    });
    const data = await response.json();
    return data;
  };

  // handler for sending wedding invite for 1 guest
  // const handleSendWeddingInvite = async (guest: GuestData) => {
  //   // turn on loading state for this guest
  //   setSendingEmail([...sendingEmail, guest.id]);

  //   // send wedding invite
  //   const response = await sendWeddingInvite(guest.email, guest.id, guest.name, guest.group_number);

  //   // if successful, update the database
  //   if (response?.accepted.length && response.accepted.includes(guest.email)) {
  //     // Update the notion database with the invite_delivered field
  //     const data = await updateCheckboxField(guest, "Invite Delivered");

  //     if (data.status === "success") {
  //       // confetti
  //       setConfetti(true);
  //       // open modal
  //       setModalIsOpen(true);
  //     } else {
  //       console.log("Error updating Notion database");
  //       setErrorModalText("Error updating Notion database. Check logs.");
  //     }
  //   } else {
  //     console.log(response);
  //     console.log(response?.rejected);
  //     setErrorModalText("Error sending wedding invite. Check logs.");
  //   }
  //   // turn off loading state for this guest
  //   setSendingEmail(sendingEmail.filter(id => id !== guest.id));
  // };

  // handler for selecting a guest (local state)
  const handleSelectGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedGuests([...selectedGuests, name.split("-")[1]]);
    } else {
      setSelectedGuests(selectedGuests.filter(id => id !== name.split("-")[1]));
    }
  };

  // const handleSendToSelected = async () => {
  //   // turn on loading state for selected guests
  //   setSendingEmail([...sendingEmail, ...selectedGuests]);

  //   // send wedding invite for each selected guest
  //   const responses = await Promise.all(
  //     selectedGuests.map(async id => {
  //       const guest = guests.find(guest => guest.id === id);
  //       if (guest) {
  //         return await sendWeddingInvite(guest.email, guest.id, guest.name, guest.group_number);
  //       }
  //     })
  //   );

  //   const successfulDeliveries = responses.filter(response => response?.accepted.length);

  //   // if any email is rejected, log error to console
  //   if (responses.some(response => response?.rejected.length)) {
  //     console.error(responses.filter(response => response?.rejected.length));
  //     setErrorModalText("Error sending some emails. Check logs.");
  //   }

  //   // if there is at least one successful delivery
  //   if (successfulDeliveries.length) {
  //     // if email successful, update the database for each guest
  //     // Update the notion database with the invite_delivered field for successful deliveries
  //     console.log("Updating Notion database with invite_delivered field for each selected guest");
  //     const updateResponses = await Promise.all(
  //       successfulDeliveries.map(async response => {
  //         const guest = guests.find(guest => guest.email === response?.accepted[0]);
  //         if (guest) {
  //           return await updateCheckboxField(guest, "Invite Delivered");
  //         }
  //       })
  //     );

  //     // successful updates
  //     const successfulUpdates = updateResponses.filter(response => response?.status === "success");
  //     // unsuccessful updates
  //     const unsuccessfulUpdates = updateResponses.filter(
  //       response => response?.status !== "success"
  //     );
  //     console.log("Successful updates:", successfulUpdates);
  //     console.log("Unsuccessful updates:", unsuccessfulUpdates);

  //     if (successfulUpdates.length === selectedGuests.length) {
  //       console.log("All deliveries and updates successful!");
  //       // confetti
  //       setConfetti(true);
  //       // open modal
  //       setModalIsOpen(true);
  //     } else {
  //       // open modal but no confetti
  //       setModalIsOpen(true);
  //     }
  //   }

  //   // turn off loading state for selected guests
  //   setSendingEmail(sendingEmail.filter(id => !selectedGuests.includes(id)));
  // };

  // send update email to everyone
  // const sendUpdateEmailToSelected = async () => {
  //   // turn on loading state for selected guests
  //   setSendingEmail([...sendingEmail, ...selectedGuests]);

  //   // send update email for each guest
  //   const responses = await Promise.all(
  //     selectedGuests.map(async id => {
  //       const guest = guests.find(guest => guest.id === id);
  //       if (guest) {
  //         return await sendUpdateEmail(guest.email, guest.id, guest.name, guest.group_number);
  //       }
  //     })
  //   );

  //   const successfulDeliveries = responses.filter(response => response?.accepted.length);

  //   // if any email is rejected, log error to console
  //   if (responses.some(response => response?.rejected.length)) {
  //     console.error(responses.filter(response => response?.rejected.length));
  //     setErrorModalText("Error sending some emails. Check logs.");
  //   }

  //   // if there is at least one successful delivery
  //   if (successfulDeliveries.length) {
  //     setConfetti(true);
  //     // open modal
  //     setModalIsOpen(true);
  //   }

  //   // turn off loading state for selected guests
  //   setSendingEmail([]);
  // };

  const handleSelectAll = () => {
    if (selectedGuests.length === guestsAttendingAtLeastOneEventWithEmail.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(guestsAttendingAtLeastOneEventWithEmail.map(guest => guest.id));
    }
  };

  type EmailResponse = {
    response: any;
    guest: GuestData;
  };

  const handleSendThankYouEmailToSelected = async () => {
    setSendingEmail([...sendingEmail, ...selectedGuests]);
    // For each guest, send a thank you email
    const successfulSends: EmailResponse[] = [];
    const failedSends: EmailResponse[] = [];
    // For each sent email, update the checkbox field (Thank You Sent) in the Notion database
    const successfulUpdates: EmailResponse[] = [];
    const failedUpdates: EmailResponse[] = [];

    // Send a thank you email to each selected guest with no custom message
    await Promise.all(
      selectedGuests.map(async id => {
        const guest: GuestData | undefined = guests.find(guest => guest.id === id);
        if (guest) {
          const groupNames = getGroupNames(guest);
          const sendResponse = await sendThankyouEmail(guest.email, groupNames);
          // if successful, update the database
          if (sendResponse?.accepted.length && sendResponse.accepted.includes(guest.email)) {
            // save a record of the successful send
            successfulSends.push({ response: sendResponse, guest });
            // Update the notion database "Thank You Sent" field
            const updateResponse = await updateCheckboxField(guest, "Thank You Sent");
            if (updateResponse.status === "success") {
              // save a record of the successful update
              successfulUpdates.push({ response: updateResponse, guest });
            } else {
              // save a record of the failed update
              failedUpdates.push({ response: updateResponse, guest });
              console.log("Error updating Notion database");
            }
          } else {
            // save a record of the failed send
            failedSends.push({ response: sendResponse, guest });
            console.log("Email Rejected: ", sendResponse?.rejected);
            console.log("Failed send response: ", sendResponse);
          }
          return sendResponse;
        } else {
          console.error("Error: Guest not found when sending thank you email");
          return null;
        }
      })
    );

    console.log("Successful sends:", successfulSends);
    console.log("Failed sends:", failedSends);

    console.log("Successful updates:", successfulUpdates);
    console.log("Failed updates:", failedUpdates);

    if (failedSends.length || failedUpdates.length) {
      setErrorModalText("Error sending some emails or updating fields. Check logs.");
    }

    if (
      successfulSends.length === selectedGuests.length &&
      successfulUpdates.length === selectedGuests.length
    ) {
      setConfetti(true);
      setModalIsOpen(true);
      setSuccessModalText("All thank you emails sent and database updated successfully!");
    }

    // turn off loading state for selected guests
    setSendingEmail([]);
  };

  const getGroupNames = (guestData: GuestData) => {
    const guestGroupNumber = guestData?.group_number;
    const groupNames: string[] = guests
      .filter(guest => guest.group_number === guestGroupNumber)
      .map(guest => guest.name);
    return groupNames;
  };

  const getGroupEmails = (guestData: GuestData) => {
    const guestGroupNumber = guestData?.group_number;
    const groupEmails: string[] = guests
      .filter(guest => guest.group_number === guestGroupNumber)
      .map(guest => guest.email)
      .filter(email => email);
    return groupEmails;
  };

  if (loading) {
    return <p>Fetching data from Notion...</p>;
  }

  return (
    <section className="flex min-h-screen flex-col items-center mt-[2em] text-black">
      <div className="text-center">
        <header className="p-2">
          <h1 className="font-bold text-2xl py-5">Guest List ({guests.length} people)</h1>

          {/* <h2 className="font-bold text-blue-500 text-xl py-5">
            {attendingMehndiCount} are attending the mehndi.
          </h2>

          <h2 className="font-bold text-blue-500 text-xl py-5">
            {attendingGrenadaCount} are attending in Grenada.
          </h2> */}

          <h2 className="font-bold text-blue-500 text-xl py-5">
            {selectedGuests.length} selected.
          </h2>
        </header>

        <section className="flex flex-col lg:flex-row justify-between items-center w-full px-10">
          <Counter counter={counter} setCounter={setCounter} />

          <div>
            <Button
              disabled={guests.length === 0}
              text={
                selectedGuests.length === guestsAttendingAtLeastOneEventWithEmail.length
                  ? "Deselect All"
                  : "Select All Attending At Least One Event"
              }
              onClick={handleSelectAll}
            />
          </div>
          <div className="flex flex-col">
            <Button
              text={sendingEmail.length ? "Sending..." : "Send Thank You Email To Selected"}
              onClick={handleSendThankYouEmailToSelected}
              disabled={selectedGuests.length === 0 || sendingEmail.length > 0}
            />
            {/* <Button
              text={sendingEmail.length > 0 ? "Sending..." : "Send RSVP Reminder To Selected"}
              onClick={handleSendToSelected}
              disabled={selectedGuests.length === 0 || sendingEmail.length > 0}
            /> */}

            {/* <Button
              text={sendingEmail.length ? "Sending..." : "Send Update Email To Selected"}
              onClick={sendUpdateEmailToSelected}
              disabled={selectedGuests.length === 0 || sendingEmail.length > 0}
            /> */}
          </div>
        </section>

        {errorMessage && <p className="text-red-500">Error: {errorMessage}</p>}

        {guests.length > 0 && (
          <div className="overflow-x-auto max-w-[100vw] mt-10 max-h-[100vh] shadow-lg">
            <table className="w-full overflow-x-auto text-center table-auto text-sm md:text-md">
              <thead>
                <tr>
                  <th className="px-5 sticky top-0 bg-black text-white">Select</th>
                  {/* <th className="px-5 sticky top-0 bg-black text-white">Delivered</th> */}
                  <th
                    onClick={() => handleSort("name")}
                    className="cursor:pointer px-5 sticky z-10 top-0 left-0 bg-black text-white"
                  >
                    Name
                  </th>
                  {/* <th
                    onClick={() => handleSort("submitted_rsvp")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    RSVP Submitted
                  </th> */}
                  <th
                    onClick={() => handleSort("thank_you_sent")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Thank You Sent
                  </th>
                  <th
                    onClick={() => handleSort("group_number")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Group #
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Email
                  </th>
                  <th
                    onClick={() => handleSort("attending_mehndi")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Attending mehndi
                  </th>
                  <th
                    onClick={() => handleSort("attending_grenada")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Attending Grenada
                  </th>
                  {/* <th
                    onClick={() => handleSort("invite_to_mehndi")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Invite to mehndi
                  </th>
                  <th
                    onClick={() => handleSort("invite_to_grenada")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Invite to Grenada
                  </th> */}
                  {/* <th
                    onClick={() => handleSort("diet")}
                    className="cursor:pointer px-5 sticky top-0 bg-black text-white"
                  >
                    Diet
                  </th> */}
                  <th className="px-5 sticky z-20 top-0 bg-black text-white">Send Email</th>
                </tr>
              </thead>
              <tbody>
                {sortedGuests.map((guest: GuestData) => (
                  <tr key={guest.id}>
                    <td className="border border-black">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus-none"
                        name={`select-${guest.id}`}
                        id={`select-${guest.id}`}
                        checked={selectedGuests.includes(guest.id)}
                        onChange={handleSelectGuest}
                        disabled={
                          !guest.email ||
                          (!guest.attending_grenada && !guest.attending_mehndi) ||
                          guest.thank_you_sent
                        }
                      />
                    </td>
                    {/* <td className="border border-black">
                      {guest.invite_delivered ? <GreenCheckMark /> : <EmptyBox />}
                    </td> */}
                    <td className="relative sticky left-[-1px] z-[5] bg-black text-white p-1">
                      {guest.name}
                      <button
                        onClick={() => {
                          // open person edit modal by passing the guest data
                          setActiveGuest(guest);
                        }}
                        className="absolute top-0 right-0 text-xs hover:bg-[#06b6d4] rounded-md px-3 hover:text-white p-1"
                      >
                        <PersonIcon />
                      </button>
                    </td>
                    {/* <td className="border border-black">{guest.submitted_rsvp ? <GreenCheckMark /> : <EmptyBox />}</td> */}
                    <td className="border border-black">
                      {guest.thank_you_sent ? <GreenCheckMark /> : <EmptyBox />}
                    </td>
                    <td className="border border-black">{guest.group_number}</td>
                    <td className="border border-black">{guest.email}</td>
                    <td className="border border-black">
                      {guest.attending_mehndi ? <GreenCheckMark /> : <EmptyBox />}
                    </td>
                    <td className="border border-black">
                      {guest.attending_grenada ? <GreenCheckMark /> : <EmptyBox />}
                    </td>
                    {/* <td className="border border-black">{guest.invite_to_grenada ? <GreenCheckMark /> : <EmptyBox />}</td>
                    <td className="border border-black">{guest.invite_to_mehndi ? <GreenCheckMark /> : <EmptyBox />}</td> */}
                    {/* <td className="border border-black px-5">{guest.diet}</td> */}
                    <td className="border-black p-5 flex flex-col">
                      {/* <Button
                        text={sendingEmail.includes(guest.id) ? "Sending..." : "Send RSVP Reminder"}
                        onClick={() => {
                          handleSendWeddingInvite(guest);
                        }}
                        disabled={
                          sendingEmail.includes(guest.id) ||
                          !guest.email ||
                          !guest.invite_to_grenada ||
                          !guest.invite_to_mehndi
                        }
                      /> */}
                      <Button
                        text={
                          sendingEmail.includes(guest.id)
                            ? "Sending..."
                            : guest.thank_you_sent
                              ? "Sent"
                              : "Send Custom Thank You Invite"
                        }
                        onClick={() => {
                          setCustomMessageGuest(guest);
                        }}
                        disabled={
                          sendingEmail.includes(guest.id) || !guest.email || guest.thank_you_sent
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {customMessageGuest && (
          <CustomMessageModal
            guestData={customMessageGuest}
            groupNames={getGroupNames(customMessageGuest)}
            isOpen={Boolean(customMessageGuest)}
            onClose={() => setCustomMessageGuest(null)}
            onSubmit={async (customMessage, guestData, sendToGroup) => {
              const groupNames = getGroupNames(guestData);
              const groupEmails = getGroupEmails(guestData);
              const groupGuests = guests.filter(
                guest => guest.group_number === guestData.group_number
              );
              const groupIds = sendToGroup ? groupGuests.map(guest => guest.id) : [guestData.id];
              setSendingEmail([...sendingEmail, ...groupIds]);
              try {
                const response = sendToGroup
                  ? groupEmails.map(async email => {
                      const guest = groupGuests.find(guest => guest.email === email);
                      await sendThankyouEmail(email, groupNames, customMessage)
                        .then(async response => {
                          if (
                            guest &&
                            response?.accepted.length &&
                            response.accepted.includes(email)
                          ) {
                            // Update the guest in the notion database with the thank_you_sent field
                            return await updateCheckboxField(guest, "Thank You Sent");
                          } else {
                            console.error("Email send not accepted");
                            return false;
                          }
                        })
                        .catch(e => {
                          console.error("Error sending thank you email to group: ", e);
                          throw new Error(`Error sending thank you email to group: ${groupNames}`);
                        });
                    })
                  : await sendThankyouEmail(guestData.email, [guestData.name], customMessage)
                      .then(async response => {
                        if (
                          response?.accepted.length &&
                          response.accepted.includes(guestData.email)
                        ) {
                          // Update the notion database with the thank_you_sent field
                          return await updateCheckboxField(guestData, "Thank You Sent");
                        } else {
                          console.error("Email send not accepted");
                          return false;
                        }
                      })
                      .catch(e => {
                        console.error("Email send failed: ", e);
                        throw new Error(`Error sending thank you email to ${guestData.email}`);
                      });

                console.log(response);

                setSuccessModalText(
                  sendToGroup
                    ? `Custom thank you emails sent successfully to ${groupNames.join(", ")} (${groupEmails.join(", ")})."`
                    : `Custom thank you email sent successfully to ${guestData.email}.`
                );
              } catch (e: unknown) {
                if (e instanceof Error) {
                  console.error(e.message);
                  if (e.message && typeof e.message === "string") {
                    setErrorModalText(e.message);
                  }
                } else {
                  setErrorModalText("Error sending thank you email(s). Check logs.");
                }
              } finally {
                setSendingEmail([]);
              }
            }}
          ></CustomMessageModal>
        )}

        {successModalText && (
          <Modal
            title="Success"
            isOpen={Boolean(successModalText)}
            height="h-full"
            maxHeight="max-h-[400px]"
            handleClose={() => {
              setSuccessModalText("");
            }}
          >
            <div className="flex justify-center items-center h-full">{successModalText}</div>
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

        {errorModalText && (
          <Modal
            title="Error"
            isOpen={Boolean(errorModalText)}
            handleClose={() => setErrorModalText("")}
          >
            <p className="text-2xl text-center">{errorModalText}</p>
          </Modal>
        )}

        {activeGuest && (
          <PersonEditModal
            guest={activeGuest}
            modalIsOpen={Boolean(activeGuest)}
            setModalIsOpen={setActiveGuest}
            refetchGuests={() => {
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
            }}
          />
        )}
      </div>
    </section>
  );
}

const GreenCheckMark = () => (
  <div className="flex w-full justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const EmptyBox = () => (
  <div className="flex w-full justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-100"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
    </svg>
  </div>
);
