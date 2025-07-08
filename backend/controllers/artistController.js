const mongoose = require("mongoose");
const User = require("../models/User");

exports.followArtist = async (req, res) => {
  const { userId, artistId } = req.body;
  console.log("💬 followArtist called with:", req.body);
  try {
    if (!userId || !artistId) {
      return res.status(400).json({ error: "userId and artistId required" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Convert artistId to ObjectId for comparison
    const artistObjId = new mongoose.Types.ObjectId(artistId);

    if (!user.followedArtists.some((id) => id.equals(artistObjId))) {
      user.followedArtists.push(artistObjId);
      await user.save();
    }
    res.json({ message: "Artist followed!" });
  } catch (err) {
    console.error("Follow artist error:", err);
    res.status(500).json({ error: err.message });
  }
};
