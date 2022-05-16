const mongoose = require("mongoose");

const InListSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Domain: {
        type: String,
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    Duration: {
        type: String,
    }
});

module.exports = AllIn = mongoose.model("allin", InListSchema);