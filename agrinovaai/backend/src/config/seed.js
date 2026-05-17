import User from "../models/User.js";
import Post from "../models/Post.js";

export const seedDemoData = async () => {
  const demoEmail = "farmer@agrinova.ai";
  const adminEmail = "admin@agrinova.ai";
  const existing = await User.findOne({ email: demoEmail });
  if (existing) return;

  const farmer = await User.create({
    name: "Ravi Gowda",
    email: demoEmail,
    password: "password123",
    role: "farmer",
    language: "en-IN",
    region: "Mandya",
    crops: ["Paddy", "Tomato"],
  });

  await User.create({
    name: "Ananya Rao",
    email: adminEmail,
    password: "password123",
    role: "admin",
    language: "en-IN",
    region: "Karnataka",
    crops: ["Regional portfolio"],
  });

  await Post.create([
    {
      user: farmer._id,
      title: "Paddy leaf tips turning yellow after rain",
      content: "Reduced urea this week and improved field drainage. Sharing this field note for others seeing similar symptoms.",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      tags: ["paddy", "rainfall", "nutrients"],
      likes: [farmer._id],
    },
    {
      user: farmer._id,
      title: "Tomato blight prevention schedule",
      content: "Wider spacing and humidity-based spray timing helped reduce leaf spots across two blocks.",
      imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80",
      tags: ["tomato", "blight", "spray"],
      likes: [farmer._id],
    },
  ]);

  console.log("Demo users seeded: farmer@agrinova.ai / admin@agrinova.ai with password password123");
};
