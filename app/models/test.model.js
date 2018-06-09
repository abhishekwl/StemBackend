const mongoose = require("mongoose");
const Hospital = require("./hospital.model.js");

const testSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        popularity: { type: Number, required: true },
        hospital: { type: Hospital, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Test", testSchema);