const mongoose = require("mongoose");

const collectorSchema = mongoose.Schema(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        rating: { type: Number, required: false, default: 3 },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        status: { type: String, required: false, default: "FREE" },
        image: { type: String, required: false, default: "" },
        orderId: { type: String, required: false, default: "" }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.Model("Collector", collectorSchema);