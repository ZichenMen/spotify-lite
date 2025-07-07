const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  followedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
});

module.exports = mongoose.model("User", userSchema);
