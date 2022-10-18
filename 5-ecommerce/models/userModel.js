const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please put a name"],
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, "please put a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please put a password"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// userSchema.methods.createTokenJWT = function () {
//     return jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: "30d" })
// }

module.exports = mongoose.model("User", userSchema)