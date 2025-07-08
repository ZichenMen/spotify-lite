// const request = require("supertest");
// const mongoose = require("mongoose");
// const { config } = require("dotenv");

// config({ path: ".env.test" }); // ✅ Use test DB, not main DB

// const app = require("../server");
// const User = require("../models/User");
// const Song = require("../models/Song");

// let testUser;
// let testSong;

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI);

//   // Create isolated test data (won't affect your real user)
//   testUser = await User.create({
//     username: "testuser",
//     email: "test@example.com",
//     password: "1234",
//     likedSongs: [],
//     followedArtists: [],
//   });

//   testSong = await Song.create({
//     title: "Test Song",
//     genre: "Test Genre",
//     language: "English",
//     artist: null,
//   });
// });

// afterAll(async () => {
//   // ❌ Do not delete all users or songs anymore
//   // Only delete the ones you created for this test
//   await User.findByIdAndDelete(testUser._id);
//   await Song.findByIdAndDelete(testSong._id);

//   await mongoose.disconnect();
// });

// describe("User routes", () => {
//   it("GET /user/:id - should return user profile", async () => {
//     const res = await request(app).get(`/user/${testUser._id}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.username).toBe("testuser");
//   });

//   it("PUT /user/:id - should update user profile", async () => {
//     const res = await request(app)
//       .put(`/user/${testUser._id}`)
//       .send({ username: "updateduser" });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.username).toBe("updateduser");
//   });
// });

// describe("Song routes", () => {
//   it("PUT /songs/like - should let user like a song", async () => {
//     const res = await request(app)
//       .put("/songs/like")
//       .send({ userId: testUser._id, songId: testSong._id });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Song liked!");
//   });
// });
