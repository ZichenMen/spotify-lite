const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const User = require("../models/User");

router.put("/follow", artistController.followArtist);

router.put("/unfollow", async (req, res) => {
  const { userId, artistId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("Before unfollow:", user.followedArtists);

    user.followedArtists = user.followedArtists.filter(
      (id) => id.toString() !== artistId
    );

    await user.save();
    console.log(" Artist unfollowed");

    res.json({ message: "Artist unfollowed" });
  } catch (err) {
    console.error(" Error unfollowing artist:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
