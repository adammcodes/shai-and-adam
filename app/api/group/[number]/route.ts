// import { NextResponse } from "next/server";
import notion from "@/config/notion";
import guestData from "@/helpers/guestData";

// route that handles group requests by the number parameter
// returns the list of guests in the group
export async function GET(
  request: Request,
  { params }: { params: { number: string } }
) {
  const { number } = params;

  // query the database for the group number
  const group = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Group Number",
      number: {
        equals: parseInt(number),
      },
    },
  });

  // if the group number doesn't exist, return 404
  if (group.results.length === 0) {
    return new Response(`Group ${number} not found`, {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // if the group has results, map the properties of each guest (page) into a response
  const response = group.results.map(guestData);

  // if the group number exists, return the list of guests
  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}
