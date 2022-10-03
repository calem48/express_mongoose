require('dotenv').config()
require('express-async-errors')

const express = require('express')
const connectDatabase = require('./db/connect')
const auth = require('./middleware/auth')
const middlewareErrorsHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const job = require('./routes/jobRoute')
const user = require('./routes/userRoute')
const app = express()

app.use(express.json())

//Routes
app.use('/api/v1/user', user)
app.use('/api/v1/job', auth, job)


//
app.use(notFound)
app.use(middlewareErrorsHandler)


//connect server and database
const port = process.env.PORT || 5000
const connect = async () => {
    try {
        await connectDatabase(process.env.DB_URL)
        app.listen(port, () => console.log(`Server connect on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

connect()