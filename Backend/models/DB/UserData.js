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
    }]
})

const UserData = mongoose.model('UserData', userDataSchema)

module.exports = UserData