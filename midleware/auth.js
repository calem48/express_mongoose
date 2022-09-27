const jwt = require('jsonwebtoken');

let authenticateUser = (req, res, next) => {
    let token = req.cookies["accessToken"]

    if (!token) {
        return res.status(400).json({ msg: "you don't have access" })
    }
    jwt.verify(token, "privatekeyy", (err, user) => {
        if (err)
            return res.send(err)
        req.putAnyName = user
        next()
    })

    // try {
    //     let isValidToken = jwt.verify(token, "putPrivateKey")
    //     console.log(req.emp)
    //     if (isValidToken) {

    //         return next()
    //     } else {
    //         return res.status(400).json({ msg: "you don't have access" })
    //     }

    // } catch (error) {
    //     res.send(error)
    // }
}

let authorazationUser = (req, res, next) => {

    if (!req.putAnyName.isAdmin) {
        return res.status(403).json({ msg: "you don't have permisson" })
    }
    next()
}


module.exports = { authenticateUser, authorazationUser }

