require('dotenv').config()
require('express-async-errors');

const express = require('express')
const connectDatabase = require('./db/connect')
const router = require('./routes/userRoutes')

const app = express()
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const notFound = require('./middleware/notFound')
const cookieParser = require('cookie-parser')


app.use(express.static('./public'));
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/v1', router)



//handler errors
app.use(notFound)
app.use(errorHandlerMiddleware)

// for connect db
const port = process.env.PORT || 5000
const connect = async () => {
    await connectDatabase(process.env.DB_URL)
    app.listen(port, () => console.log("server connect on port " + port))
}

connect()
