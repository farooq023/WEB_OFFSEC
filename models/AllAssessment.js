
const mongoose = require("mongoose");

const AllAssessmentSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Domain: {
        type: String,
    },
    Type: {
        type: String,
    }
});

module.exports = AllAssessment = mongoose.model("allAssessment", AllAssessmentSchema);