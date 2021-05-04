const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/DB/User')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

router.post('/signup', async (req, res) => {
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
            password: hash
        })
        newUser.save()
            .then(result => {
                const token = jwt.sign({_id: result.id}, process.env.JWT_SECRET)
                res.header('auth-token', token).status(201).send("Done")
            })
            .catch(error => res.status(500).json({error: error}))
    })
})

router.post('/signin', async (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({ error: "Wrong email or password" })
    try {
        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).json({ error: "Wrong email or password"})
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET)
        res.send(token)
    } catch (err) {
        res.status(500).json({error:err})
    }
})

module.exports = router