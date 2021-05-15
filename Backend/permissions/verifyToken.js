const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    var token
    try {
        token = req.headers.authorization.split(' ')[1]
    } catch (err) {
        res.status(401).json({error: "You have no auth token"})
    }
    
    if (!token) return res.status(401).json({error: "Access denied"})

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(500).json({error: err})
    }
}