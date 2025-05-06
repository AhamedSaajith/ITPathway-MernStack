import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { detectIntent } from "./dialogflowConfig.js";
import Chat from "./ChatSchema.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import projectRoutes from "./routes/ProjectRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DIALOGFLOW_PROJECT_ID) {
  console.error("❌ DIALOGFLOW_PROJECT_ID is not set in environment variables");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// ✅ Mount user, course, and project routes
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);


// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Call connectDB and handle any errors
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

// Store session contexts
const sessionContexts = new Map();

// Chat route
app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ reply: "Message and session ID are required." });
  }

  try {
    const context = sessionContexts.get(sessionId) || [];
    const dialogflowResponse = await detectIntent(message, sessionId, context);
    sessionContexts.set(sessionId, dialogflowResponse.context);

    const chat = new Chat({
      userMessage: message,
      botResponse: dialogflowResponse.reply,
      intent: dialogflowResponse.intent,
      timestamp: new Date(),
    });

    const savedChat = await chat.save();
    console.log("✅ Chat saved at:", savedChat.timestamp);

    return res.json({
      reply: dialogflowResponse.reply,
      intent: dialogflowResponse.intent,
      confidence: dialogflowResponse.confidence,
    });
  } catch (error) {
    console.error("❌ Chat save error:", error);
    return res.status(500).json({ reply: "Sorry, an error occurred." });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
