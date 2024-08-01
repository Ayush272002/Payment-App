import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//utils
import connectDB from "./config/db.js";
import rootRouter from "./routes/index.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/v1", rootRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
