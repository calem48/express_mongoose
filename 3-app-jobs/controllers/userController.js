

const login = (req, res) => {

    res.status(200).json({ msg: 'login seccessfully' })
}

const register = (req, res) => {
    res.status(200).json({ msg: 'registered seccessfully' })
}

module.exports = { login, register }
