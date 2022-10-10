

const middlewareNotFoundError = (req, res) => {
    res.status(404).json('this route does not exist')
}

module.exports = middlewareNotFoundError