import express from "express";
import { registerUser, loginUser } from "../controller/UserController.js";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const router = express.Router();

// Register
router.post("/", registerUser);

// Login
router.post("/login", loginUser);

// ✅ Get current logged-in user
router.get("/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      if (!process.env.JWT_SECRET) {
        console.log("❌ JWT_SECRET is not defined in .env");
        return res.status(500).json({ message: "Server error: Secret key missing" });
      }
  
      console.log("🔐 JWT_SECRET being used:", process.env.JWT_SECRET);
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
  
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      console.error("Token verification failed:", err);
      res.status(401).json({ message: "Invalid token" });
    }
  });
  

export default router;
