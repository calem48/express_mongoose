

const notFound = (req, res, next) => {
    res.status(404).json('this route doesn\'t exist ')
}

module.exports = notFound