const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const server = express()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

let users = require('./models/User')

server.use(express.json())
server.use('/', require('./routes/index.js'))
server.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

server.listen(PORT)