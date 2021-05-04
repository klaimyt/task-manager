const express = require('express')
const mongoose = require('mongoose')
const verifyToken = require('./verifyToken')
const UserData = require('../models/DB/UserData')
const Task = require('../models/DB/Task')

const router = express.Router()

// These methods just for testing
router.get('/', verifyToken, async (req, res) => {
    const user = await UserData.find()
    if (!user) return res.status(500).json({ error: "User ID not found"})
    res.send(user.tasks)
})

// What am i doing wrong with map method?
router.get('/tasks', verifyToken, async (req, res) => {
    // Query for userData
    const userData = await UserData.findOne({employeeId: req.user._id})
    if (!userData) return res.send("There is no user data")
    //Query for array of tasks
    // const tasks = userData.tasks.map(async taskId => {
    //     await Task.find({_id: taskId})
    // })
    // res.send(tasks)
    var a = []
    for (const taskId of userData.tasks) {
        const task = await Task.findOne({_id: taskId})
        a.push(task)
    }
    res.send(a)
})


router.post('/newTask', verifyToken, async (req, res) => {
    // Finding employee
    const userData = await UserData.findOne({employeeId: req.user._id})
    if (!userData) return res.send("here is no user data")
    // Creating task
    const newTask = new Task({
        text: req.body.text
    })
    await newTask.save()
    // Assign task to his array of tasks
    userData.tasks.push(newTask)
    userData.save()
        .then(result => {
            res.send(result)
        })
})

router.post('/newRelationship', verifyToken, (req, res) => {
    const newUserData = new UserData({
        employerId: req.body.employerId,
        employeeId: req.user._id
    })
    newUserData.save()
        .then(result => {
            res.send(result)
        })
})

module.exports = router