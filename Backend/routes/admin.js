const express = require('express')
const User = require('../models/DB/User')

const router = express.Router()

router.post('/createUser', async (req, res) => {
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
                res.status(201).send("User created")
            })
            .catch(error => res.status(500).json({error: error}))
    })
})

module.exports = router