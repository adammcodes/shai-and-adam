import notion from "@/config/notion";
import { NextResponse } from "next/server";
import guestData from "@/helpers/guestData";

// Retrieve pages from the database
export async function GET() {
  // Paginate results
  const pages = [];
  let cursor = undefined;

  try {
    do {
      const { results, next_cursor } = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        start_cursor: cursor,
      });
      pages.push(...results);
      cursor = next_cursor;
    } while (cursor);

    // Map pages to guests
    const guests = pages.filter(filterGuests).map(guestData);

    const data = {
      guests: guests,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return JSON.stringify({ error: "An error occurred" });
  }
}

// Filter out guest if they don't have a valid name
function filterGuests(page) {
  // takes a single page.properties object (columns)
  // returns true if guest has a valid name
  const columns = page.properties;
  const name =
    columns.Name.title.length > 0 ? columns.Name.title[0].plain_text : "";
  return name;
}

// PATCH function to update a guest's "Invite Delivered" property
export async function PATCH(request) {
  const { id, delivered, name } = await request.json();

  // Find the guest in notion database by the id
  const row = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "id",
      formula: {
        string: {
          equals: id,
        },
      },
    },
  });

  if (row.results && row.results.length === 0) {
    return new Response(`Guest ${id} not found`, {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const row_id = row.results[0].id;

  // Update the guest in notion for property: "Invite Delivered"
  const response = await notion.pages.update({
    page_id: row_id,
    properties: {
      "Invite Delivered": {
        checkbox: delivered,
      },
    },
  });

  // Return a response
  if (response.properties && response.properties["Invite Delivered"]) {
    return new Response(
      JSON.stringify({
        status: "success",
        message: `Invite status for ${name} was updated.`,
        guestId: id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        status: "error",
        message: `Invite status for ${name} was not updated.`,
        guestId: id,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
