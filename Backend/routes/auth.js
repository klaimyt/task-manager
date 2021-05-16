// Frameworks
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Permissions
const {loginValidation} = require('../permissions/validation')
// Data model
const User = require('../models/DB/User')

const router = express.Router()

router.post('/login', async (req, res) => {
    // Input validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    // Search user in DB
    const user = await User.findOne({username: req.body.username})
    if (!user) return res.status(400).json({ error: "Wrong username or password" })
    try {
        // Check for password
        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).json({ error: "Wrong username or password"})
        // JWT Token
        const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET)
        res.cookie('access_token', 'Bearer ' + token,  {httpOnly: true, sameSite: 'strict', expires: new Date(Date.now() + 24 * 3600000) })
        res.status(200).json({token: token})
    } catch (err) {
        res.status(500).json({error:err})
    }
})

module.exports = router