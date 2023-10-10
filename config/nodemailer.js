import nodemailer from "nodemailer";

// Create a transporter object with ProtonMail SMTP settings from .env
// A transporter should only be created once
const transporter = nodemailer.createTransport({
  host: process.env.PROTON_SMTP_SERVER,
  port: process.env.PROTON_SMTP_PORT,
  secureConnection: false,
  auth: {
    user: process.env.PROTON_SMTP_USERNAME,
    pass: process.env.PROTON_SMTP_TOKEN,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

export default transporter;
