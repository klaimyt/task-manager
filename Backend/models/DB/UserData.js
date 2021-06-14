const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({
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

const UserData = mongoose.model('UserData', userDataSchema)

module.exports = UserData