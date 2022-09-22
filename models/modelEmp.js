const mongoose = require('mongoose')
const { Schema } = mongoose;


const schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: [true, "you must put the age"] },
    salary: Number,
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Emp', schema)