const mongoose = require("mongoose");

const DnsListSchema = new mongoose.Schema({
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

module.exports = AllDns = mongoose.model("alldn", DnsListSchema);