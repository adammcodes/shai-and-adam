import notion from "@/config/notion";
import { NextRequest } from "next/server";

// This route updates a guest's RSVP status
// It is called from the RSVP form on the client page /guest/[id]?group=[number]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!request.body || !id) {
    return new Response(`Bad Request`, {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // consume the body stream
  const body = await request.json();

  // Find the guest in notion by the id
  const row = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
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

  // Update the guest in notion for properties: "Name", "Attending Mehndi", "Attending Grenada", "Dietary Restrictions"
  const response: any = await notion.pages.update({
    page_id: row_id,
    properties: {
      Name: {
        title: [
          {
            text: {
              content: body.name,
            },
          },
        ],
      },
      "Attending Mehndi": {
        checkbox: body.attending_mehndi,
      },
      "Attending Grenada": {
        checkbox: body.attending_grenada,
      },
      "Dietary Restrictions": {
        rich_text: [
          {
            text: {
              content: body.diet,
            },
          },
        ],
      },
      // Change flag that this person has submitted their RSVP
      "Submitted RSVP": {
        checkbox: true,
      },
    },
  });

  // Return a response
  if (response.properties && response.properties["Submitted RSVP"]) {
    return new Response(
      JSON.stringify({
        message: `RSVP for ${body.name} was recieved.`,
        attending_mehndi: body.attending_mehndi,
        attending_grenada: body.attending_grenada,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    // something went wrong
    console.log("Something went wrong - Notion update response: ", response);
    return new Response(`Guest ${id} not updated`, {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
