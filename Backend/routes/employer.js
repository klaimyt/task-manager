const express = require('express')
const verifyToken = require('../premissions/verifyToken')
const UserData = require('../models/DB/UserData')
const { isAdmin } = require('../premissions/authorization')

const router = express.Router()

// Get all availabel users
router.get('/', verifyToken, (req, res) => {
    UserData.find({employerId: req.user._id}, (err, employees) => {
        if (err) return res.status(500).json(err)
        res.json(employees)
    })
})

module.exports = router