import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getBalance, transfer } from "../controllers/accountController.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);

router.post("/transfer", authMiddleware, transfer);

export default router;
