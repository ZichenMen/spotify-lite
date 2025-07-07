const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

router.put("/follow", artistController.followArtist);

module.exports = router;
