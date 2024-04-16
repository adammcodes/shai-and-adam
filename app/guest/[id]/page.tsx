// Server component page for guest/[id]?group=[number]
// Retrieves all the guests in a group and renders the Guest component for each guest
// import types
import { GuestData } from "@/helpers/guestData";

// import components
import Guest from "../_components/Guest";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let guests: any;
  let error;
  // get the id from the URL in the request params
  const { id } = params;
  // get the group number from the URL in the request search params // e.g. /guest/123?group=1
  const { group } = searchParams;

  // if there is no id or group number, return an error
  if (!id || !group) {
    console.log("no id or group number");
    error = true;
  }

  try {
    if (group) {
      // fetch the group data
      const res = await fetch(
        `${process.env.AUTH0_BASE_URL}/api/group/${group}`,
        {
          cache: "no-store",
        }
      );

      guests = await res.json();

      // check if id is in group
      const guest = guests
        ? guests.find((guest: GuestData) => guest.id === id)
        : null;

      if (!guest) {
        console.log("guest not found");
        error = true;
      }
    } else {
      console.log("no group number");
      error = true;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="flex text-black justify-center flex-col items-center">
      {!guests && !error && <p>Loading...</p>}
      {error && (
        <p className="text-red-500 font-bold text-2xl">
          Sorry, we couldn't find your guest data. Please use the link in your
          email invitation.
        </p>
      )}
      {!error && guests && (
        <>
          <h1 className="font-bold text-3xl mb-2">RSVP</h1>
          <p className="text-lg text-center px-[10px]">
            Please submit an RSVP for <u>each member</u> of your group. You have{" "}
            {guests.length} guests in your group.
          </p>

          <div className="flex flex-col w-full items-center justify-center">
            {guests && guests.length > 0 ? (
              guests.map((guest: GuestData, index: number) => (
                <Guest key={index} guest={guest} allGuests={guests} />
              ))
            ) : (
              <p>No guests found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
