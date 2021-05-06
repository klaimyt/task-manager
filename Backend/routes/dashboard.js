const express = require('express')
const mongoose = require('mongoose')
const verifyToken = require('../premissions/verifyToken')
const userData = require('../models/DB/UserData')
const { checkRole } = require('../premissions/checkAuth')
const ROLE = require('../models/Role')
const UserData = require('../models/DB/UserData')
const Task = require('../models/DB/Task')

const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
    if (req.user.role === ROLE.EMPLOYEE) {
        try {
            const userData = await UserData.findOne({employeeId: req.user._id})
            if (!userData) return res.status(404).send()
            // Always return empty array even if there is misspel. Potentional danger. 
            const tasks = await Task.find({'_id': { $in: userData.tasks }})
            res.send(tasks)
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        try {
            if (req.user.role === ADMIN) {
                const allUsers = await User.find()
            }
            const userData = await UserData.findById(req.user._id)
        } catch (err) {
            
        }
    }
})

module.exports = router