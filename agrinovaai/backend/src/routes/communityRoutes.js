import express from "express";
import { commentPost, createPost, likePost, listPosts } from "../controllers/communityController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.get("/", listPosts);
router.post("/", protect, upload.single("image"), createPost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comments", protect, commentPost);

export default router;
