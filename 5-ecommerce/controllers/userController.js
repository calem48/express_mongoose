

const login = async (req, res) => {
    res.status(200).json('login success')
}



const register = async (req, res) => {
    res.status(200).json('register success')
}


const dash = async (req, res) => {
    res.status(200).json("hello in dashborad")
}

module.exports = { register, login, dash }