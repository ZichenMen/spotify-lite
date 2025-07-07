const User = require("../models/User");

exports.getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("likedSongs");
    res.json(user.likedSongs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
