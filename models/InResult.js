const mongoose = require("mongoose");

const InResultSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Date: {
        type: String,
    },
    Time: {
        type: String,
    },
    Test1: {
        type: String,
    },
    Test2: {
        type: String,
    },
    Test3: {
        type: String,
    },
    gateScore: {
        type: String,
    },
    gateStatus: {
        type: String,
    },
});

module.exports = InResult = mongoose.model("inresult", InResultSchema);