import express from "express";
import { overview } from "../controllers/dashboardController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/overview", protect, authorize("admin", "farmer"), overview);

export default router;
