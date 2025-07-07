const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  language: String,
  genre: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
});

module.exports = mongoose.model("Song", songSchema);
