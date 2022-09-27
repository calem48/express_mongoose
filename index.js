
require('dotenv').config()
const express = require('express')
const app = express()
const Emp = require('./routers/empRoute')
const User = require('./routers/userRouter')
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware = require('./midleware/errorHandlerMiddleware')
const connectDatabase = require('./controllers/db/connect')


app.use(express.json())
app.use(cookieParser())



app.use('/api/employee', Emp)
app.use('/api/user', User)

app.all('*', (req, res) => {
    res.status(404).json({ msg: "page not found" })
})

app.use(errorHandlerMiddleware)


// connect to database
let PORT = process.env.PORT || 5000
let connect = async () => {
    await connectDatabase(process.env.MONGO_DB_URL)
    app.listen(PORT, (req, res) => console.log(`server listening in port ${PORT} ...`))
}
connect()
