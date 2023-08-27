const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Retrieve pages from the database
async function getGuests() {
  // Paginate results
  const pages = [];
  let cursor = undefined;

  do {
    const { results, next_cursor } = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      start_cursor: cursor,
    });
    pages.push(...results);
    cursor = next_cursor;
  } while (cursor);

  // Map pages to guests
  const guests = pages.map((page) => {
    // database columns
    const columns = page.properties;
    return {
      id: columns.id.formula.string,
      name: columns.Name.title[0].plain_text,
      email: columns.Email.email,
      group_number: columns["Group Number"].number,
      invite_to_mehendi: columns["Invite to Mehendi"].checkbox,
      attending_mehendi: columns["Attending Mehendi"].checkbox,
      invite_to_grenada: columns["Invite to Grenada"].checkbox,
      attending_grenada: columns["Attending Grenada"].checkbox,
    };
  });

  return guests;
}

export const GET = getGuests();
