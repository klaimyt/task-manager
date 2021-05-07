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

router.get('/:userId', verifyToken, canViewPage, (req, res) => {

})

router.get('/', verifyToken, isAdmin, async (req, res) => {
    var user
    try {
        users = await UserData.find({})
        if (user === undefined) return res.status(404).json({ error: "There is no users"})
    } catch (err) {
        res.status(404).json({ error: err })
    }
    

    // res.json(user)
})

router.post('/:employeeId', verifyToken, async (req, res) => {

})

module.exports = router