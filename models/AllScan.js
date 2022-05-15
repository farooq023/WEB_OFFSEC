const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
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

module.exports = AllScan = mongoose.model("allscan", ScanSchema);