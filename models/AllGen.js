const mongoose = require("mongoose");

const GenListSchema = new mongoose.Schema({
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

module.exports = AllGen = mongoose.model("allgen", GenListSchema);