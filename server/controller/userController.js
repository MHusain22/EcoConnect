import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  console.log(username, email);
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Signup failed" });
  }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedProfile = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}