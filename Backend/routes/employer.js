const express = require('express')
const verifyToken = require('../premissions/verifyToken')
const UserData = require('../models/DB/UserData')
const { isAdmin } = require('../premissions/authorization')

const router = express.Router()

async function canViewPage(req, res, next) {
    res.locals.userData = await UserData.find({employerId: req.params.userId})

    if (!res.locals.userData) return res.status(404).send("User not found")

    if (res.locals.userData.employerId === req.params.userId ||
        req.user.role === ROLE.ADMIN) {
            next()
    } else {
        return res.status(401).send("Access denied")
    }
}

// Get all availabel users
router.get('/', verifyToken, (req, res) => {
    UserData.find({employerId: req.user._id}, (err, employees) => {
        if (err) return res.status(500).json(err)
        console.log(req.user._id)
        res.json(employees)
    })
})

module.exports = router