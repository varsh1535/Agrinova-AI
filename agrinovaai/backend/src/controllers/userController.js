export const updateProfile = async (req, res) => {
  const allowed = ["name", "language", "region", "crops", "avatar"];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });
  await req.user.save();
  res.json({ user: req.user });
};
