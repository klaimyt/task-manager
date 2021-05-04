const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    //TODO Validation
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if (user) return res.status(409).json({message: "Email exists"})

        if (req.body.password.length < 8) return res.status(411).json({message: "Password lenght must be at least 8 characters long."})

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                newUser
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
    })
})

router.post('/signin', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    try {
        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(401)
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET)
        res.send(token)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router