import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  intent: { type: String },
  timestamp: { 
    type: Date, 
    default: Date.now // Ensure timestamp is automatically added
  }
}, { timestamps: true }); // Enables createdAt and updatedAt automatically

export default mongoose.model("chats", ChatSchema);
