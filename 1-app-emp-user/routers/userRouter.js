const express = require('express')
const router = express.Router()
const User = require('../models/modelUser')
const jwt = require('jsonwebtoken');
const { authenticateUser, authorazationUser } = require('../midleware/auth')





router.post('/register', async (req, res) => {
    try {
        let newUser = new User(req.body)
        // let findUser = await User.findOne({ email: newUser.email })
        let findUser = await User.find({ email: newUser.email })

        if (findUser.length !== 0) {
            return res.send("this user already register")
        }
        // newUser.password = await bcrypt.hash(newUser.password, 10)
        await newUser.save()
        res.status(200).json({ success: true, newUser })
    } catch (error) {
        res.send(error.errors.name.message)
    }
})


router.post('/login', async (req, res) => {
    try {

        let { email, password } = req.body
        let findUser = await User.findOne({ email })

        if (!findUser) {
            return res.send("check your email or password")
        }

        let checkValidPwd = await findUser.checkPassword(password)
        // let checkValidPwd = await bcrypt.compare(password, findUser.password)

        if (!checkValidPwd) {
            return res.send("check your email or password")
        }

        // let token = jwt.sign({ _id: findUser._id, isAdmin: this.isAdmin }, "putPrivateKeyy")
        let token = findUser.createJsonWebToken()

        res.cookie("accessToken", token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })

        res.status(200).json({ message: "login successfully" })

        // res.send(token)
    } catch (error) {
        res.send(error)
    }
})

router.get('/profile', authenticateUser, authorazationUser, async (req, res) => {
    // let pro = await User.findById({ _id: req.user._id }).select("-password")
    res.json({ msg: "hello in profile" })
})


module.exports = router