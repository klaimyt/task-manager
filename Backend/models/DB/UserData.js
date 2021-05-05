const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({
    employerId: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    }]
})

const UserData = mongoose.model('UserDataSchema', userDataSchema)

module.exports = UserData