const Joi = require('joi')
const ROLE = require('../models/Role')

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
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
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    })
    return schema.validate(user)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation