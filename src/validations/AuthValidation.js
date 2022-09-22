const Joi = require('joi');

const validateAuth = (input)=>{

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(input);
}

module.exports.validateAuth = validateAuth;