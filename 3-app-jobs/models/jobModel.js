
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "please provide company"]
    },
    position: {
        type: String,
        required: [true, "please provide position"]
    },
    status: {
        type: String,
        enum: ["pending", "interview", "decline"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user"]
    },
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)