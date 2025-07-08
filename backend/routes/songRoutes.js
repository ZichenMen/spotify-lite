const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const Artist = require("../models/Artist");

// GET /songs?search=...&language=...&genre=...
// Search and filter songs
router.get("/", async (req, res) => {
  const { search = "", language, genre } = req.query;

  try {
    // First: find matching artist IDs by name
    const matchingArtists = await Artist.find({
      name: { $regex: search, $options: "i" },
    }).select("_id");

    const artistIds = matchingArtists.map((artist) => artist._id);

    // Now build a query for songs:
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { artist: { $in: artistIds } },
      ],
    };

    if (language) query.language = language;
    if (genre) query.genre = genre;

    const songs = await Song.find(query).populate("artist");

    res.json(songs);
  } catch (err) {
    console.error("Song search error:", err.message);
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

router.put("/unlike", async (req, res) => {
  const { userId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    user.likedSongs = user.likedSongs.filter((id) => id.toString() !== songId);
    await user.save();

    res.json({ message: "Song unliked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
