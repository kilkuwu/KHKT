import express from "express";
import {
  getUser,
  getUserDevices,
  addRemoveDevice,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

export default router;

router.get("/:id", verifyToken, getUser);
router.get("/:id/device", verifyToken, getUserDevices);

router.patch("/:id/:deviceId", verifyToken, addRemoveDevice);
