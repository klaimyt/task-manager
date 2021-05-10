// Frameworks
const express = require('express')
// Permissions
const verifyToken = require('../permissions/verifyToken')
const { isAdmin } = require('../permissions/authorization')
// Data model
const UserData = require('../models/DB/UserData')

const router = express.Router()

// Get all availabel employees
router.get('/', verifyToken, (req, res) => {
    UserData.find({employerId: req.user._id}, (err, employees) => {
        if (err) return res.status(500).json(err)
        res.json(employees)
    })
})

module.exports = router