import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Create App
const app = express();

// ✅ File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:4173", 
      "https://portfolio-client-iber.onrender.com",
      "https://portfolio-client.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Blog Routes
app.use("/api/blogs", blogRoutes);

//contact route
app.use("/api", contactRoutes)

app.get("/", (req, res) => {
  res.send("Blog API running ✅");
});

// ✅ Global error handler (catches multer and other errors)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message || "Internal Server Error" });
});

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
