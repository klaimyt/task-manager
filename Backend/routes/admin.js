// Frameworks
const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
//Premissions
const verifyToken = require('../permissions/verifyToken')
const { registerValidation, passwordValidation } = require('../permissions/validation')
const { isAdmin } = require('../permissions/authorization')
// Data model
const ROLE = require('../models/Role')
const UserData = require('../models/DB/UserData')
const User = require('../models/DB/User')


const router = express.Router()

//Get all users
router.get('/', verifyToken, isAdmin, async (req, res) => {
    const query = await User.find({}).select('-password -__v')
    res.status(200).json(query)
})

// Create new user
router.post('/createUser', verifyToken, isAdmin, async (req, res) => {
    const {error} = registerValidation(req.body)
    if (!Object.values(ROLE).includes(req.body.role)) return res.status(400).json({error: "Bad Role"})
    if (error) return res.status(400).json({error: error.details[0].message})
    // If username exists
    if (await User.findOne({username: req.body.username})) return res.status(400).json({error: "Username already exsists"})

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({error: err})

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            username: req.body.username,
            password: hash,
            role: req.body.role
        })

        newUser.save()
            .then(result => {
                res.status(201).send("User created")
            })
            .catch(error => res.status(500).json({error: error}))
    })
})

// Change user password
router.patch('/:userId/changePassword', verifyToken, isAdmin, (req, res) => {
    //Validate password
    const {error} = passwordValidation(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})
    // Finding user
    User.findOne({_id: req.params.userId}).exec()
    .then(user => {
        //creating password hash
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({error: err})

            user.password = hash
            // Saving new password
            user.save().then(res.status(200).send()).catch(error => res.status(500).json(error))
        })
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

// Delete user
router.delete('/:userId', verifyToken, isAdmin, (req, res) => {
    User.findByIdAndDelete(req.params.userId, (err, result) => {
        if (err) return res.status(404).json(err)
        res.json(result)
    })
})

// Get all relationships
router.get('/relationship', verifyToken, isAdmin, (req, res) => {
    UserData.find((err, relationships) => {
        if (err) return res.status(500).json(err)
        res.json(relationships)
    }).select('-__v')
})

// Create new relationship
router.post('/relationship', verifyToken, isAdmin, async (req, res) => {
    // Check if exsists
    var userData
    try {
        userData = await UserData.findOne({employeeId: req.body.employeeId, employerId: req.body.employerId})
        if (userData) return res.status(409).send()
    } catch (err) {
        res.status(500).send()
    }
    const newRelationship = new UserData({
        employeeId: req.body.employeeId,
        employerId: req.body.employerId
    })

    newRelationship.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// Delete relationship
router.delete('/relationship/:id', (req, res) => {
    UserData.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) return res.status(404).json(err)
        res.send()
    })
})

module.exports = router