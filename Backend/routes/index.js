const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('use api/auth/singup')
    // res.redirect('/api/auth/signup')
})

module.exports = router