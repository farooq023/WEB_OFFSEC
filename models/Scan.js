const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
    Vulnerability: {
        type: String,
    },
    Severity: {
        type: String,
    },
    URL: {
        type: String,
    },
});

module.exports = Scan = mongoose.model("scanresult", ScanSchema);
