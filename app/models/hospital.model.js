const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        city: { type: String, required: true },
        image: { type: String, required: false, default: "" },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hospital", hospitalSchema);