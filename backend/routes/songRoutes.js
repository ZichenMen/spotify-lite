const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const Artist = require("../models/Artist");

// GET /songs?search=...&language=...&genre=...
// Search and filter songs
router.get("/", async (req, res) => {
  const { search = "", language, genre } = req.query;

  const query = {
    title: { $regex: search, $options: "i" },
  };
  if (language) query.language = language;
  if (genre) query.genre = genre;

  try {
    const songs = await Song.find(query).populate("artist");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  PUT /songs/like
// Like a song for a user
router.put("/like", async (req, res) => {
  const { userId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }
    res.json({ message: "Song liked!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
