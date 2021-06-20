const Task = require('../models/DB/Task')
const Relationship = require('../models/DB/Relationship')

async function deleteRelationship(id, res) {
    try{
        relationship = await Relationship.findById(id)
        if (!relationship) return res.status(404).send()
        // Deleting all tasks inside relationship (They lose memory pointer, if won't be deleted)
        deleteAllTasksInsideRelationship(relationship, res)
        const result = relationship.deleteOne()
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