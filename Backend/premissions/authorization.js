const ROLE = require('../models/Role')
const UserData = require('../models/DB/UserData')

async function canViewPage(req, res, next) {
    res.locals.userData = await UserData.findOne({employeeId: req.params.userId})

    if (!res.locals.userData) return res.status(404).send("User not found")

    if (res.locals.userData.employeeId === req.params.userId ||
        res.locals.userData.employerId === req.params.userId ||
        req.user.role === ROLE.ADMIN) {
            next()
    } else {
        return res.status(401).send("Access denied")
    }
}

module.exports = canViewPage