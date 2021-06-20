const ROLE = require('../models/Role')
const Relationship = require('../models/DB/Relationship')

// Check if user has access to view Relationship.
function canViewPage(req, res, next) {
    Relationship.find({employeeId: req.params.userId}, (err, relationship) => {
        if (err) return res.status(500).send(err)
        if (!relationship.length) return res.status(404).send("Relationship not found")
        for (const Relationship of relationship) {
            if (Relationship.employeeId === req.user._id ||
                Relationship.employerId === req.user._id ||
                req.user.role === ROLE.ADMIN) {
                    next()
                    return
            } 
        }
        return res.status(403).send("Access denied")
    })
}

function isAdmin(req, res, next) {
    if (req.user.role !== ROLE.ADMIN) return res.status(403).json({ error: "You have no access" })
    next()
}

function canPatchTask(req, res, next) {
    Relationship.findOne({employeeId: req.params.userId, tasks: req.params.taskId}, (err, result) => {
        if (err || !result) return res.status(400).send()
        if (req.user._id === result.employeeId ||
            req.user._id === result.employerId ||
            req.user.role === ROLE.ADMIN) {
                next()
            } else {
                res.status(403).json({error: "Access denied"})
            }
    })
}

function canAccessEmployerData(req, res, next) {
    if (req.user.role === ROLE.ADMIN || req.user._id === req.params.employerId) {
      next()
    } else {
      res.status(403).json({ error: "Access denied." })
    }
}

module.exports = { canViewPage, isAdmin, canPatchTask, canAccessEmployerData }