const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/DB/User')
const jwt = require('jsonwebtoken')
const {loginValidation} = require('../premissions/validation')

router.post('/login', async (req, res) => {
    // Input validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    // Search user in DB
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({ error: "Wrong email or password" })
    try {
        // Check for password
        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).json({ error: "Wrong email or password"})
        // JWT Token
        const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET)
        res.status(200).send(token)
    } catch (err) {
        res.status(500).json({error:err})
    }
})

module.exports = router