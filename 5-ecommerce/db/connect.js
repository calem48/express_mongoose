
const mongoose = require('mongoose')

const connectDatabase = (url) => {
    mongoose.connect(url)
}

module.exports = connectDatabase