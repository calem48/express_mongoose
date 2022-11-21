
require('dotenv').config()
require('express-async-errors')



const express = require('express');
const app = express()

const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const connectDatabase = require('./db/connect');



//routers
const authRoute = require('./routers/authRoute');
const userRoute = require('./routers/userRoute');
const productRoute = require('./routers/productRoute');
const reviewRoute = require('./routers/reviewRoute');
const orderRoute = require('./routers/orderRoute');

//errors
const middlewareErrorHandler = require('./middleware/errorHandler');
const middlewareNotFoundError = require('./middleware/notFound');

app.use(express.json())
app.use(cookieParser(process.env.JWT_TOKEN))
app.use(express.static("./public"))
app.use(fileUpload())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/order', orderRoute)


app.use(middlewareNotFoundError)
app.use(middlewareErrorHandler)


const port = process.env.PORT || 3001

const start = async () => {
    await connectDatabase(process.env.URL_DB)
    app.listen(port, () => console.log(`server connect at port ${port}`))
}

start()