const mongoose = require("mongoose");

const SslResultSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Domain: {
        type: String,
    },
    SupportedCiphers: [{
        type: String,
    }],
    BypassedCiphers : [{
        type: String,
    }],
});

module.exports = SslResult = mongoose.model("sslresult", SslResultSchema);