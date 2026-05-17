import express from "express";
import { createScan, getMyScans, getScan } from "../controllers/scanController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.use(protect);
router.post("/", upload.single("image"), createScan);
router.get("/", getMyScans);
router.get("/:id", getScan);

export default router;
