const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please put a name"]
    },
    email: {
        type: String,
        required: [true, "please put a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please put a password"]
    }
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.createTokenJWT = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_TOKEN)
}

module.exports = mongoose.model("User", userSchema)