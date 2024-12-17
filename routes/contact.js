const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route - POST
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const mailOptions = {
        from: `${process.env.EMAIL_USER}`,
        to: `${process.env.TO_EMAIL}`,
        subject: "Portfolio Contact Form: New Submission",
        // text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `,
    };

    try {
        // Sending Email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

        return res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
});

module.exports = router;
