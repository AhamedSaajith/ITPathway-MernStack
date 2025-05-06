import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chats", async (req, res) => {
  const { message } = req.body;

  try {
    const aiResponse = await axios.post("http://localhost:8000/ai-response", { message });
    res.json({ response: aiResponse.data.response });
  } catch (error) {
    res.status(500).json({ error: "AI Model Error" });
  }
});

export default router;
