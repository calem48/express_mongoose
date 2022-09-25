const express = require('express')
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/my_database')
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log(e);
    })


const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    descreption: String
})



const bookSchema = new mongoose.Schema({
    name: String,
    descreption: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
})
const author = mongoose.model('Author', authorSchema)
const book = mongoose.model('Book', bookSchema)

async function creatAuthor(name, age, descreption) {
    let auth = new author({ name, age, descreption })
    await auth.save()
}

async function creatBook(name, descreption, author) {
    let newbook = new book({ name, descreption, author })
    await newbook.save()
}

function getBooks() {

}

app.use('/book', async (req, res) => {
    // let auth = await author.findById('632c9cb98498603c062e51e1').select("name age")
    // let b = await book.find({ author: { _id: "632c9cb98498603c062e51e1" } })
    // let b = await book.find().populate('author', "name -_id").select("name descreption -_id")
    let b = await book.find().populate('author').where({ author: { _id: "632c9cb98498603c062e51e1" } })
    res.send(b)
})

app.use('/author', async (req, res) => {
    let b = await author.find()//.populate('author', "name").select("name descreption")
    res.send(b)
})

// creatAuthor("ahmed", 25, "Networking")
// creatBook("TCP", "learn all thing about TCP", "632c9f5d67a43bec33380f5d")

app.listen(3000, () => console.log("server connect" + 3000))