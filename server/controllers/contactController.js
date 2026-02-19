import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message, service_type } = req.body;

    if (!name || !email || !message || !service_type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      service_type
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${service_type}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service_type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: contact
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
