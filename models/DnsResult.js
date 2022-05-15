const mongoose = require("mongoose");

const DnsResultSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Domain: {
        type: String,
    },
    DnsIpRecords: [{
        type: String,
    }],
    MatchingResponses : [{
        type: String,
    }],
});

module.exports = DnsResult = mongoose.model("dnsresult", DnsResultSchema);