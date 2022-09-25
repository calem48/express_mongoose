const express = require('express')
const mongoose = require('mongoose')
const Emp = require('./routers/empRoute')
const User = require('./routers/userRouter')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/Emp')
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log(e);
    })

app.use('/api/employee', Emp)
app.use('/api/user', User)

app.all('*', (req, res) => {
    res.status(404).json({ msg: "page not found" })
})


app.listen(3000, (req, res) => console.log("server connected"))