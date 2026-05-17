import express from "express";
import { market, weather } from "../controllers/intelligenceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/weather", protect, weather);
router.get("/market", protect, market);

export default router;
