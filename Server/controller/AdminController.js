import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Static admin check
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { isAdmin: true, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, message: "Admin login successful" });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
};
