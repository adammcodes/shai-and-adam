// Server component page for guest/[id]?group=[number]
import { type NextRequest } from "next/server";

// import types
import { GuestData } from "@/helpers/guestData";

// import components
import Guest from "../_components/Guest";

type GuestRequest = NextRequest & {
  params: {
    id: string;
  };
  searchParams: {
    group: string;
  };
};

export default async function GuestsInGroup(request: GuestRequest) {
  let guests;
  let error;
  // get the id from the URL in the request params
  const { id } = request.params;
  // get the group number from the URL in the request search params
  const { group } = request.searchParams;

  // if there is no id or group number, return an error
  if (!id || !group) {
    console.log("no id or group number");
    error = true;
  }

  try {
    const res = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/group/${group}`,
      {
        cache: "no-store",
      }
    );
    guests = await res.json();
    // check if id is in group
    const guest = guests.find((guest: GuestData) => guest.id === id);

    if (!guest) {
      console.log("guest not found");
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
          <p className="text-lg">Please RSVP for your group:</p>

          <div className="flex flex-col w-full items-center justify-center">
            {guests && guests.length > 0 ? (
              guests.map((guest: GuestData) => <Guest guest={guest} />)
            ) : (
              <p>No guests found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
