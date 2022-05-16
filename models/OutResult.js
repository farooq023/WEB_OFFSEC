const mongoose = require("mongoose");

const OutResultSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    trequests: {
        type: String,
    },
    oks: {
        type: String,
    },
    gateStatus: {
        type: String,
    },
});

module.exports = OutResult = mongoose.model("outresult", OutResultSchema);