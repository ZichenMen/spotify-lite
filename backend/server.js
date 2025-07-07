const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const artistRoutes = require("./routes/artistRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/songs", songRoutes);
app.use("/artists", artistRoutes);

app.get("/", (req, res) => res.send("API running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 4000, () => console.log("Server running"))
  )
  .catch((err) => console.error(err));
