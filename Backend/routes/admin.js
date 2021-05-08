const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/DB/User')
const { registerValidation, passwordValidation } = require('../premissions/validation')
const { isAdmin } = require('../premissions/authorization')
const ROLE = require('../models/Role')
const verifyToken = require('../premissions/verifyToken')
const UserData = require('../models/DB/UserData')


const router = express.Router()

router.get('/', verifyToken, isAdmin, async (req, res) => {
    const query = await User.find({}).select('-password -__v')
    res.status(200).json(query)
})

router.post('/createUser', verifyToken, isAdmin, async (req, res) => {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})
    // If email exists
    if (await User.findOne({email: req.body.email})) return res.status(400).json({error: "Email already exsists"})

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({error: err})

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
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

router.post('/createRelationship', verifyToken, isAdmin, async (req, res) => {
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

module.exports = router