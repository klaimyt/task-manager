// Frameworks
const express = require('express')
// Permissions
const verifyToken = require('../permissions/verifyToken')
const { canViewPage, canPatchTask } = require('../permissions/authorization')
// Data model
const STATE = require('../models/State')
const ROLE = require('../models/Role')
const Relationship = require('../models/DB/Relationship')
const Task = require('../models/DB/Task')

const router = express.Router()

// Get all employee's tasks
router.get('/:userId', verifyToken, canViewPage, async (req, res) => {
    const relationships = await Relationship.find({employeeId: req.params.userId}).populate('tasks')
    const tasks = relationships.filter(relationship => relationship.tasks.length > 0)
    res.send(tasks)
})

// Get specific task
router.get('/:userId/:taskId', verifyToken, (req, res) => {
    Task.findById({_id: req.params.taskId}, (err, task) => {
        
        if (err) return res.status(404).send()
        res.status(200).json(task)
    })
})

// Create new task
router.post('/:userId', verifyToken, (req, res) => {
    // Validate state
    const newState = req.body.state
    if (!Object.values(STATE).includes(newState)) req.body.state = STATE.TODO
    // Validate text
    if (!req.body.text) return res.status(400).send()
    // Only employer can create new task
    if (req.user.role === ROLE.EMPLOYEE && req.user.role === ROLE.ADMIN) return res.status(403).send()
    // Query for Relationship
    Relationship.findOne({employeeId: req.params.userId, employerId: req.user._id}, (err, relationship) => {
        if (err) return res.status(404).send()
        if (!relationship) return res.status(404).send( )
        // Create new task
        const newTask = new Task({
            text: req.body.text,
            state: req.body.state
        })
        // Save new task
        newTask.save().then(() => {
            relationship.tasks.push(newTask)
            relationship.save().then().catch(err => res.status(500).json(err))
        })
        res.send()
    })
})

// Change task state
router.patch('/:userId/:taskId', verifyToken, canPatchTask, (req, res) => {
    // Validating state
    const newState = req.body.state
    if (!Object.values(STATE).includes(newState)) return res.status(400).json({error: "Invalid state"})
    if (newState === STATE.FINISHED && req.user.role === ROLE.EMPLOYEE) return res.status(405).json({ error: "Employee can't set finished status"})
    // Updating state
    Task.findByIdAndUpdate(req.params.taskId, { state: newState, updatedDate: Date.now() }, { useFindAndModify: false })
    .exec()
    .then(result => {
        res.status(200).send('Updated')
    })
    .catch(error => res.status(500).send(error))
})

module.exports = router