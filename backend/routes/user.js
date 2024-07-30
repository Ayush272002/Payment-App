import express from "express";

const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";

//controller
import {
  createUser,
  signin,
  updateUser,
  getVia_Name_Surname,
} from "../controllers/userController.js";

router.post("/signup", createUser);

router.post("/signin", signin);

router.put("/", authMiddleware, updateUser);

router.get("/bulk", getVia_Name_Surname);

export default router;
