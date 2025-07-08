const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const artistRoutes = require("./routes/artistRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/songs", songRoutes);
app.use("/artists", artistRoutes);

app.get("/", (req, res) => res.send("API running"));

// ✅ Only connect & listen if run directly (not when imported for testing)
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () =>
        console.log(`✅ Server running on http://localhost:${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}

module.exports = app; // Export for testing
