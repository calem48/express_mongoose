
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minLength: 6,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: 6
    },

})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.createTokenJwt = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: "30d" })
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)