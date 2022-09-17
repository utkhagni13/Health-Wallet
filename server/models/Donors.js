const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        public_addr: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        hospital_addr: {
            type: String,
            required: true,
        },
        last_donated: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        donation_cnt: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Donors", donorSchema);
