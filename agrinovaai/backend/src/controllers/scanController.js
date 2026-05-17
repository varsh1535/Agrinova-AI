import Scan from "../models/Scan.js";
import { predictDisease } from "../services/aiService.js";

export const createScan = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Crop image is required" });
    const prediction = await predictDisease(req.file.path);
    const scan = await Scan.create({
      user: req.user._id,
      imageUrl: `/uploads/${req.file.filename}`,
      crop: req.body.crop || "Field crop",
      location: req.body.location || req.user.region,
      ...prediction,
    });
    res.status(201).json({ scan });
  } catch (error) {
    next(error);
  }
};

export const getMyScans = async (req, res) => {
  const scans = await Scan.find({ user: req.user._id }).sort("-createdAt").limit(30);
  res.json({ scans });
};

export const getScan = async (req, res) => {
  const scan = await Scan.findOne({ _id: req.params.id, user: req.user._id });
  if (!scan) return res.status(404).json({ message: "Scan not found" });
  res.json({ scan });
};
