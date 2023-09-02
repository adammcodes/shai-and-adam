// const nodemailer = require("nodemailer");
// import saveTheDate from "@/emails/saveTheDate.js";

export async function POST() {
  // Get the email from the request body which is a readable stream
  // const body = JSON.parse(request.body);
  // Create a transporter object with ProtonMail SMTP settings from .env
  // const transporter = nodemailer.createTransport({
  //   host: process.env.PROTON_SMTP_HOST,
  //   port: process.env.PROTON_SMTP_PORT,
  //   secure: false,
  //   auth: {
  //     user: process.env.PROTON_USERNAME,
  //     pass: process.env.PROTON_PASSWORD,
  //   },
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // // Define the email content
  // const mailOptions = {
  //   from: `Shai & Adam <${process.env.PROTON_USERNAME}>`,
  //   to: email,
  //   subject: "Save the date for Shai and Adam's wedding: May 9th, 2024",
  //   html: saveTheDate(),
  // };
  // try {
  //   // Send the email
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       // console.error("Error:", error);
  //       throw new Error("Email send error");
  //     } else {
  //       console.log("Email sent:", info.response);
  //     }
  //   });
  //   return {
  //     status: 200,
  //     body: { message: "Email sent successfully" },
  //   };
  // } catch (error) {
  //   // console.error("Error:", error);
  //   return {
  //     status: 500,
  //     body: { message: "Email send error" },
  //   };
  // }
}
