const mangoose = require('mongoose')
const STATE = require('../State')

const TaskSchema = new mangoose.Schema({
    text: {
        type: String,
        required: true
    },
    state: {
        type: STATE,
        default: STATE.TODO,
        required: true
    },
    creatingDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
})


const Task = mongoose.model('Task', TaskSchema)
module.exports = Task