const Joi = require('joi')

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
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