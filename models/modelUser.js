const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [6, "name must to be contain at least 6 character"],
        maxlength: 40
    },
    email: {
        type: String,
        unique: true
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean }
})


userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.createJsonWebToken = function () {
    return jwt.sign({ _isAdmin: this.isAdmin, _id: this._id }, "privatekeyy")
}

userSchema.methods.checkPassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
}


module.exports = mongoose.model("User", userSchema)