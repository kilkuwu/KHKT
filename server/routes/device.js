import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { deviceRegister, getDevice } from "../controllers/device.js";

const router = express.Router();

export default router;

router.get("/:id", verifyToken, getDevice);
router.post("/register", verifyToken, deviceRegister);
