
require('dotenv').config()
require('express-async-errors')



const express = require('express');
const app = express()

const connectDatabase = require('./db/connect');



//routers
const authRoute = require('./routers/authRoute');

//errors
const middlewareErrorHandler = require('./middleware/errorHandler');
const middlewareNotFoundError = require('./middleware/notFound');

app.use(express.json())
app.use('/api/v1/auth', authRoute)


app.use(middlewareNotFoundError)
app.use(middlewareErrorHandler)


const port = process.env.PORT || 3001

const start = async () => {
    await connectDatabase(process.env.URL_DB)
    app.listen(port, () => console.log(`server connect at port ${port}`))
}

start()