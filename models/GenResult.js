const mongoose = require("mongoose");

const GenResultSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Domain: {
        type: String,
    },
    XssVulns: [{
        type: String,
    }],
    SqlVulns: [{
        type: String,
    }],
    Xreqs: {
        type: Number,
    },
    Sreqs: {
        type: Number,
    },
});

module.exports = GenResult = mongoose.model("genresult", GenResultSchema);