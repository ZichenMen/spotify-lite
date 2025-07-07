const mongoose = require("mongoose");
require("dotenv").config();

const Artist = require("./models/Artist");
const Song = require("./models/Song");
const User = require("./models/User");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

const seedData = async () => {
  await Artist.deleteMany();
  await Song.deleteMany();
  await User.deleteMany();

  // Step 1: Insert Artists
  const artists = await Artist.insertMany([
    { name: "Taylor Swift", genre: "Pop" },
    { name: "Drake", genre: "Hip-Hop" },
    { name: "Adele", genre: "Soul" },
  ]);

  // Step 2: Insert Songs with artist references
  const songs = await Song.insertMany([
    {
      title: "Shake It Off",
      language: "English",
      genre: "Pop",
      artist: artists[0]._id,
    },
    {
      title: "God's Plan",
      language: "English",
      genre: "Hip-Hop",
      artist: artists[1]._id,
    },
    {
      title: "Easy On Me",
      language: "English",
      genre: "Soul",
      artist: artists[2]._id,
    },
  ]);

  // Step 3: Insert a User and link liked songs + followed artists
  const user = await User.create({
    username: "testuser",
    email: "test@example.com",
    password: "hashedpassword123",
    likedSongs: [songs[0]._id, songs[2]._id],
    followedArtists: [artists[0]._id, artists[2]._id],
  });

  console.log("Seeded user ID:", user._id.toString());

  mongoose.disconnect();
};

connectDB().then(seedData);
