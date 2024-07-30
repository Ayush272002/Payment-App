import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//db schema
import User from "../models/userModel.js";
import Account from "../models/accountModel.js";

//zod schema
import userSchema from "../zodSchema/userSchema.js";
import signinSchema from "../zodSchema/signinSchema.js";
import updateBodySchema from "../zodSchema/updateBodySchema.js";

const createUser = async (req, res) => {
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

  // ---create new Account----
  await Account.create({
    userId: userId,
    balance: Number((1 + Math.random() * 10000).toFixed(2)),
  });

  // --------------------------

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
};

const signin = async (req, res) => {
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
};

const updateUser = async (req, res) => {
  const { firstName, lastName, password } = req.body;

  const validatedData = updateBodySchema.safeParse({
    firstName,
    lastName,
    password,
  });

  if (!validatedData.success) {
    return res.status(411).json({
      message: validatedData.error.errors.map((err) => err.message).join(", "),
    });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();

  res.json({ message: "User updated" });
};

const getVia_Name_Surname = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

export { createUser, signin, updateUser, getVia_Name_Surname };
