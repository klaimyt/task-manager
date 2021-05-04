const Task = require('./Task')

const UserData = Object.freeze({
    employerId: String,
    employeeId: String, //Should it be string or mongoose.Schema.Types.ObjectId?
    tasks: [Task]
})

module.exports = UserData