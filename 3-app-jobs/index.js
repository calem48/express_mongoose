require('dotenv').config()
require('express-async-errors')

const express = require('express')
const connectDatabase = require('./db/connect')
const middlewareErrorsHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const app = express()




//middleware
app.use(notFound)
app.use(middlewareErrorsHandler)


//connect server and database
const port = process.env.PORT || 5000
const connect = async () => {
    await connectDatabase(process.env.DB_URL)
    app.listen(port, `Server connect on port ${port}...`)
}

connect()