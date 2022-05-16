const mongoose = require("mongoose");

const OutListSchema = new mongoose.Schema({
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

module.exports = AllOut = mongoose.model("allout", OutListSchema);