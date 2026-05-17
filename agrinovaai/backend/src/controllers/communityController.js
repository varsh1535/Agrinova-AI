import Post from "../models/Post.js";

export const listPosts = async (_req, res) => {
  const posts = await Post.find().sort("-createdAt").populate("user", "name region role").populate("comments.user", "name");
  res.json({ posts });
};

export const createPost = async (req, res) => {
  const post = await Post.create({
    user: req.user._id,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags ? String(req.body.tags).split(",").map((tag) => tag.trim()) : [],
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
  });
  await post.populate("user", "name region role");
  res.status(201).json({ post });
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const liked = post.likes.some((id) => id.equals(req.user._id));
  post.likes = liked ? post.likes.filter((id) => !id.equals(req.user._id)) : [...post.likes, req.user._id];
  await post.save();
  res.json({ likes: post.likes.length, liked: !liked });
};

export const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  await post.populate("comments.user", "name");
  res.status(201).json({ comments: post.comments });
};
