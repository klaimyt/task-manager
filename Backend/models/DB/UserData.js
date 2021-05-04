const mongoose = require('mongoose')
const Task = require('./Task')

const userDataSchema = mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    employerId: {
        type: String,
        required: true
    },
    tasks: [{type: mongoose.Schema.ObjectId, ref: 'Task'}] // Is it ok?
})

const UserData = mongoose.model('UserData', userDataSchema)

module.exports = UserData