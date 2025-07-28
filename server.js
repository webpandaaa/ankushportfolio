const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // <<--- Add this at the top

const app = express();
const PORT = process.env.PORT || 5000; // <<-- Use from .env or default 5000

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// POST route to handle form
app.post("/send-email", async (req, res) => {
  const { user_name, user_email, message, phone, subject } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // <-- from .env
        pass: process.env.GMAIL_PASS, // <-- from .env
      },
    });


    await transporter.sendMail({
      from: process.env.SENDING_MAIL,
      to: process.env.SENDING_MAIL,
      replyTo: user_email, // <- this is what you want
      subject: "New Contact Form Submission From Your Portfolio Website",
      html: `
       <h3>New Message From Your Portfolio Website</h3>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    

    // Send confirmation mail to use
    await transporter.sendMail({
      from:process.env.SENDING_MAIL,
      to: user_email,
      subject: "Thank you for reaching out!",
      html: `
          <h3>Hello ${user_name},</h3>
        <p>Thank you for reaching out through my portfolio. I’ve received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Ankush Raj Singh <br>MERN Stack Developer </p>

      `,
    });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});