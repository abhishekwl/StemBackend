const mongoose = require("mongoose");
const User = require("./user.model.js");
const Test = require("./test.model.js");
const Collector = require("./collector.model.js");

const orderSchema = mongoose.Schema(
    {
        status: { type: String, required: true, default: "WAITING" },   //WAITING || ENROUTE || ACTIVE || COMPLETE
        user: { type: User.schema, required: true },
        tests: { type: [Test.schema], required: true },
        collector: { type: Collector.schema, required: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);