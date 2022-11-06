const { authorizedPermisson } = require("../errors")


const checkPermission = (requestUser, getId) => {
    if (requestUser.role === "admin") return
    if (requestUser.userId === getId.toString()) return

    throw new authorizedPermisson('unauthorized to access ')
}

module.exports = checkPermission