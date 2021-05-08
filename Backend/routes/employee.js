const express = require('express')
const Task = require('../models/DB/Task')
const verifyToken = require('../premissions/verifyToken')
const { canViewPage } = require('../premissions/authorization')
const STATE = require('../models/State')
const ROLE = require('../models/Role')

const router = express.Router()

// Get all employee's tasks
router.get('/:userId', verifyToken, canViewPage, async (req, res) => {
    const userData = res.locals.userData
    try {
        const tasks = await Task.find({'_id': { $in: userData.tasks }})
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).send()
    }
})

router.patch('/:userId/:taskId', verifyToken, canViewPage, async (req, res) => {
    const newState = req.body.state
    if (!Object.values(STATE).includes(newState)) return res.status(400).json({error: "Invalid state"})
    if (newState === STATE.FINISHED && req.user.role === ROLE.EMPLOYEE) return res.status(405).json({ error: "Employee can't set finished status"})
    await Task.findByIdAndUpdate(req.params.taskId, { state: newState }, { useFindAndModify: false })
    .exec()
    .then(result => {
        res.status(200).send('Updated')
    })
    .catch(error => res.status(500).send(error))
})

module.exports = router