const mongoose = require("mongoose");
const Hospital = require("../models/hospital.model.js");

const testSchema = mongoose.Schema(
    {
        name: { type: String, required: true, text: true },
        price: { type: Number, required: true },
        popularity: { type: Number, required: false, default: 0 },
        hospital: { type: Hospital.schema, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Test", testSchema);