const ROLE = require('../models/Role')
const UserData = require('../models/DB/UserData')

// It should be refactored
function canViewPage(req, res, next) {
    UserData.find({employeeId: req.params.userId}, (err, usersData) => {
        if (err) return res.status(500).send(err)
        if (!usersData.length) return res.status(404).send("User not found")
        for (const userData of usersData) {
            if (userData.employeeId === req.user._id ||
                userData.employerId === req.user._id ||
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
    UserData.findOne({employeeId: req.params.userId, tasks: req.params.taskId}, (err, result) => {
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