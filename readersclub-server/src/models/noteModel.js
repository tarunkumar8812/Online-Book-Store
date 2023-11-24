const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        text: {
            type: String,
            trim: true,
        },
        date: String

    }
);

module.exports = mongoose.model("Note", noteSchema);
