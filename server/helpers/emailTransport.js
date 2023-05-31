import "dotenv/config";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const mailAuth = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },

};
const transporter = nodemailer.createTransport(mailAuth);

export default transporter;
