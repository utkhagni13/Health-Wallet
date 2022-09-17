const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        public_addr: {
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
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Recipient", recipientSchema);
