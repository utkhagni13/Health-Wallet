const mongoose = require("mongoose");
const donorSchema = require("../models/Donors");

module.exports.createDonor = async (req, res) => {
    try {
        // check if the donor already exist
        const donor = await donorSchema.findOne({
            public_addr: req.body.public_addr,
        });
        if (donor !== null) {
            return res.status(400).json({ data: null, error: "Donor already exists" });
        }
        // add the donor
        await donorSchema.insertMany([
            {
                id: new mongoose.Types.ObjectId(),
                public_addr: req.body.public_addr,
                name: req.body.name,
                bloodGroup: req.body.bloodGroup,
                hospital_addr: req.body.hospital_addr,
                last_donated: req.body.last_donated,
                phone: req.body.phone,
                email: req.body.email,
                donation_cnt: 0,
            },
        ]);
        return res.status(200).json({ data: "Success", error: null });
    } catch (error) {
        return res.status(500).json({ data: null, error: error.message });
    }
};

module.exports.getAllDonors = async (req, res) => {
    try {
        const donors = await donorSchema.find();
        if (donors.length > 0) {
            return res.status(200).json({ data: donors, error: null });
        } else {
            return res.status(404).json({ data: null, error: "No donors found" });
        }
    } catch (error) {
        return res.status(500).json({ data: null, error: error.message });
    }
};
