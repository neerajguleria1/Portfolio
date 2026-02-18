import Contact from "../models/Contact.js";

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

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: contact
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
