const Task = require('../models/DB/Task')
const UserData = require('../models/DB/UserData')

async function deleteRelationship(id, res) {
    try{
        userData = await UserData.findById(id)
        console.log(userData)
        if (!userData) return res.status(404).send()
        deleteAllTasksInsideRelationship(userData, res)
        const result = userData.deleteOne()
        if (!result) return res.status(404).send()
    } catch (err) {
        return false
    }
}

async function deleteAllTasksInsideRelationship(relationship, res) {
    try {
        await Task.deleteMany({_id: {$in: relationship.tasks}})
    } catch (err) {
        res.status(500).send()
    }
}

module.exports = { deleteRelationship }