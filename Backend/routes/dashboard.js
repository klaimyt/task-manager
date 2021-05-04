const express = require('express')
const mongoose = require('mongoose')
const verifyToken = require('./verifyToken')
const userData = require('../models/DB/UserData')

const router = express.Router()


router.get('/', verifyToken, async (req, res) => {
    
})

router.get('/:id', verifyToken, (req, res) => {
    
})

module.exports = router