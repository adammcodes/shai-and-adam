// map callback function to return the properties of each guest
// takes in a page object from Notion API and returns the properties we need for each guest
export interface GuestData {
  id: string;
  name: string;
  email: string;
  group_number: number;
  submitted_rsvp: boolean;
  invite_to_mehndi: boolean;
  attending_mehndi: boolean;
  invite_to_grenada: boolean;
  attending_grenada: boolean;
  diet: string;
}

type PlainText = {
  plain_text: string;
};

type GuestDataColumns = {
  id: {
    formula: {
      string: string;
    };
  };
  Name: {
    title: PlainText[];
  };
  Email: {
    email: string;
  };
  "Group Number": {
    number: number;
  };
  "Submitted RSVP": {
    checkbox: boolean;
  };
  "Invite to Mehndi": {
    checkbox: boolean;
  };
  "Attending Mehndi": {
    checkbox: boolean;
  };
  "Invite to Grenada": {
    checkbox: boolean;
  };
  "Attending Grenada": {
    checkbox: boolean;
  };
  "Dietary Restrictions": {
    rich_text: PlainText[];
  };
};

export default function guestData(page: any): GuestData {
  // database columns
  const columns: GuestDataColumns = page.properties;

  // dietary restrictions
  const rich_text = columns["Dietary Restrictions"].rich_text;
  const diet = rich_text.length > 0 ? rich_text[0].plain_text : "";

  return {
    id: columns.id.formula.string,
    name: columns.Name.title[0].plain_text,
    email: columns.Email.email, // email
    group_number: columns["Group Number"].number,
    submitted_rsvp: columns["Submitted RSVP"].checkbox,
    invite_to_mehndi: columns["Invite to Mehndi"].checkbox,
    attending_mehndi: columns["Attending Mehndi"].checkbox,
    invite_to_grenada: columns["Invite to Grenada"].checkbox,
    attending_grenada: columns["Attending Grenada"].checkbox,
    diet: diet,
  };
}
