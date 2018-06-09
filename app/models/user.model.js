const mongoose = require("mongoose");
const Test = require("./test.model.js");

const userSchema = mongoose.Schema(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true, default: "Anonymous" },
        age: { type: Number, required: true },
        blood: { type: String, required: true },
        gender: { type: Boolean, required: true, default: true },
        image: { type: String, required: false, default: "" },
        contact: { type: String, required: true, default: "" },
        additional: { type: String, required: false, default: "" },
        history: { type: [Test], required: false, default: [] }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);