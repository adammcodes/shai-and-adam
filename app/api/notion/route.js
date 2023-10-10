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
