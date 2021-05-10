const Joi = require('joi')
const ROLE = require('../models/Role')

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        username: Joi.string()
            .min(5)
            .required(),
        password: Joi.string()
            .min(8)
            .required(),
        role: Joi.string()
            .valid(ROLE.ADMIN, ROLE.EMPLOYEE, ROLE.EMPLOYER)
            .required()
    })
    return schema.validate(user)
}

const loginValidation = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .required()
            .min(5),
        password: Joi.string()
            .min(8)
            .required()
    })
    return schema.validate(user)
}

const passwordValidation = password => {
    const schema = Joi.object({
        password: Joi.string()
            .min(8)
            .required()
    })
    return schema.validate(password)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.passwordValidation = passwordValidation