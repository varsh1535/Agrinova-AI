import User from "../models/User.js";
import { signToken } from "../services/tokenService.js";

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  language: user.language,
  region: user.region,
  crops: user.crops,
});

export const signup = async (req, res) => {
  const { name, email, password, role, language, region, crops } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "An account with this email already exists" });

  const user = await User.create({ name, email, password, role, language, region, crops });
  res.status(201).json({ user: serializeUser(user), token: signToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ user: serializeUser(user), token: signToken(user) });
};

export const me = async (req, res) => {
  res.json({ user: serializeUser(req.user) });
};
