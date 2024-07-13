import transporter from "@/config/nodemailer.js";
import updateEmail from "@/emails/updateEmail";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

/***
 * @type SendMailError
 * @property {number} responseCode
 * @property {string} response
 * @property {string} code
 * @property {string} command
 */

export async function POST(request: Request) {
  // Define ANSI escape codes for different colors
  const Reset = "\x1b[0m";
  const FgRed = "\x1b[31m";
  const FgGreen = "\x1b[32m";
  // Extract the body of the request
  const body = await request.json();

  // Check if body has id, name, and email
  if (!body.id || !body.name || !body.email) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Define the email content
  const mailOptions = {
    from: `Shai & Adam <${process.env.PROTON_SMTP_USERNAME}>`,
    to: body.email,
    // to: `test-x70d82x1l@srv1.mail-tester.com`, // spam test
    subject: "The Mehndi venue has changed.",
    html: updateEmail({
      name: body.name,
      id: body.id,
      groupNumber: body.group_number,
    }),
    headers: {
      "List-Unsubscribe": "<mailto:adam@shaileenandadam.rsvp>",
    },
  };
  try {
    const result = await new Promise((resolve, reject) => {
      // Send the email
      transporter.sendMail(mailOptions, (sendMailError: any, info: SentMessageInfo) => {
        if (sendMailError) {
          // reject the Promise if there's an error
          reject(JSON.stringify(sendMailError));
        } else {
          // Resolve with the info if there's no error
          console.log(FgGreen, "Email Sent", Reset);
          console.log(info.accepted);
          resolve(info);
        }
      });
    });
    // Return a 250 response if the email was sent
    return new Response(JSON.stringify(result), {
      status: 250,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Extract the responseCode and response from the error
    const { responseCode, response } = JSON.parse(error);
    // Log the error to the console
    console.log(FgRed, response, Reset);
    // Return a response if the email was not sent
    return new Response(response, {
      status: responseCode,
      statusText: "Error sending email",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
