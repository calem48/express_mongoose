

const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')



const login = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequest("please provied username and passwaord")
    }

    let token = jwt.sign({ username }, process.env.JWT_TOKEN, { expiresIn: "30d" })

    res.status(200).json({ msg: "user created", token })
}

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, ${req.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })

}


module.exports = { login, dashboard }