const express = require('express')
const app = express()
const mongoose = require("mongoose")
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/oneToManyV1')
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log(e);
    })


const userSchema = mongoose.Schema({
    name: String,
    age: Number
})


const userAddress = mongoose.Schema({
    wilaya: String,
    city: String,
    postal_code: String,
    user: userSchema
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})
const user = mongoose.model('User', userSchema)

const address = mongoose.model('Address', userAddress)

async function creatUser(name, age) {
    let newUser = new user({ name, age })
    await newUser.save()
}

async function creatAddress(wilaya, city, postal_code, user) {
    let newAddress = new address({ wilaya, city, postal_code, user })
    await newAddress.save()
}

// creatUser("walid", 40)

// creatAddress("bouira", "dira", "27002", '632ce6c48e643afb087e4a16')
// creatAddress("chlef", "chlef", "27002", new user({ name: "hamza", age: 28 }))

app.use('/address', async (req, res) => {
    // let auth = await author.findById('632c9cb98498603c062e51e1').select("name age")
    // let b = await book.find({ author: { _id: "632c9cb98498603c062e51e1" } })
    // let b = await book.find().populate('author', "name -_id").select("name descreption -_id")
    let u = await user.findById("632ce6da65de3223a99f5866")
    let a = await address.find({ userId: { _id: u.id } })//.populate({ path: 'userId', select: 'name -_id' })
    // let b = await address.find()//.populate('userId')
    res.send(a)
})

// app.use('/adress', async (req, res) => {
//     let b = await author.find()//.populate('author', "name").select("name descreption")
//     res.send(b)
// })
app.listen(3000, () => console.log("server connect   " + 3000))

