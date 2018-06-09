const mongoose = require("mongoose");
const User = require("./user.model.js");
const Hospital = require("./hospital.model.js");
const Test = require("./test.model.js");
const Collector = require("./collector.model.js");

const orderSchema = mongoose.Schema(
    {
        status: { type: String, required: true, default: "WAITING" },
        user: { type: User, required: true },
        hospital: { type: Hospital, required: true },
        tests: { type: [Test], required: true },
        collector: { type: Collector, required: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);