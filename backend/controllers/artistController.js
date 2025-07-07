const User = require("../models/User");

exports.followArtist = async (req, res) => {
  const { userId, artistId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.followedArtists.includes(artistId)) {
      user.followedArtists.push(artistId);
      await user.save();
    }
    res.json({ message: "Artist followed!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
