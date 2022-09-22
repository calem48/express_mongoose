const express = require('express')
const mongoose = require('mongoose')
const app = express()
const users = require('./routers/empRoute')


mongoose.connect('mongodb://localhost:27017/Emp')
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log(e);
    })

app.use(express.json())

app.use('/api/employees', users)



app.listen(3000, (req, res) => console.log("server connected"))