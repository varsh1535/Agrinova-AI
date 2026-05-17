import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { seedDemoData } from "./config/seed.js";

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDemoData();
  app.listen(PORT, () => {
    console.log(`AgriNova API running on port ${PORT}`);
  });
});
