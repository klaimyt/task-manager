const mongoose = require('mongoose')

const RelationshipSchema = mongoose.Schema({
    employerId: {
        type: String,
        ref: 'User'
    },
    employeeId: {
        type: String,
        ref: 'User'
    },
    tasks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    }],
    creatingDate: {
        type: Date,
        default: Date.now
    }
})

const Relationship = mongoose.model('Relationship', RelationshipSchema)

module.exports = Relationship