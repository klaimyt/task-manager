const jwt = require('jsonwebtoken')

// Verify JWT token middleware
module.exports = function(req, res, next) {
    const accessToken = req.cookies.access_token
    if (!accessToken) return res.status(401).json({error: "You have no auth token"})
    const token = accessToken.split(' ')[1]
    if (!token) return res.status(401).json({error: "Invalid auth token"})

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(500).json({error: err})
    }
}