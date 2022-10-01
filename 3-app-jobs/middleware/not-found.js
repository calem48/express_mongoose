
const notFound = (req, res, next) => {
    res.status(404).json('route does not exist...')
}

module.exports = notFound