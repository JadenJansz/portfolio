import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const user = import.meta.env.GMAIL_USER;
const pass = import.meta.env.GMAIL_PASS;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  if (!data.name || !data.email || !data.message) {
    return new Response("Missing required fields", { status: 400 });
  }

  const name = data.name;
  const email = data.email;
  const message = data.message;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: user,
      subject: "Contact from Portfolio",
      text: `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Error sending email", { status: 500 });
  }

  return new Response("Email sent successfully", { status: 200 });
};
