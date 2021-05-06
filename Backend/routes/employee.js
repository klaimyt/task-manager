const express = require('express')
const Task = require('../models/DB/Task')
const verifyToken = require('../premissions/verifyToken')
const canViewPage = require('../premissions/authorization')

const router = express.Router()

router.get('/:userId', verifyToken, canViewPage, async (req,res) => {
    const userData = res.locals.userData
    try {
        const tasks = await Task.find({'_id': { $in: userData.tasks }})
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).send()
    }
})



router.patch('/:userId/:taskId', (req, res) => {

})

module.exports = router