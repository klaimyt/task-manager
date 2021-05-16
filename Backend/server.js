const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config()

const server = express()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


server.use(cors({credentials: true}))
server.use(cookieParser())
server.use(express.json())
server.use('/api/auth', require('./routes/auth'))
server.use('/api/employee', require('./routes/employee'))
server.use('/api/admin', require('./routes/admin'))
server.use('/api/employer', require('./routes/employer'))

const PORT = process.env.PORT || 5000

server.listen(PORT)