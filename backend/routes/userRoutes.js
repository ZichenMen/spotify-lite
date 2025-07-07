const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Artist = require("../models/Artist"); // ✅ Ensure the model is loaded
const Song = require("../models/Song"); // Required if used directly

//  GET user profile (includes followed artists)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "likedSongs",
        populate: { path: "artist" },
      })
      .populate("followedArtists");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error in GET /user/:id:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//  GET liked songs
router.get("/:id/songs", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("likedSongs");
    res.json(user.likedSongs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  UPDATE user profile (username, email, password)
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
