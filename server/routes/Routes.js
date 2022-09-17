const express = require("express");
const router = express.Router();

const Donors = require("../controller/Controller.js");

router.post("/fetchalldonors", Donors.getAllDonors);
router.post("/createdonor", Donors.createDonor);

module.exports = router;
