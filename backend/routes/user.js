import express from "express";

const router = express.Router();
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const validatedData = userSchema.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.errors.map((err) => err.message).join(", "),
    });
  }

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username: username,
    firstName,
    lastName,
    password: hashedPassword,
  });

  await newUser.save();
  const userId = newUser._id;

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const validatedData = signinSchema.safeParse({
    username,
    password,
  });

  if (!validatedData.success) {
    return res.status(411).json({ message: "Invalid format" });
  }

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token: token,
  });
});

export default router;
