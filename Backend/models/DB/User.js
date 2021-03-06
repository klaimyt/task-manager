const mongoose = require('mongoose');
const ROLE = require('../Role')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: ROLE,
        default: ROLE.EMPLOYEE
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;