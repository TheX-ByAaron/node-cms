const Joi = require('joi');

const validateClient = (input)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        company_name: Joi.string().required(),
        position: Joi.string().required(),
        description: Joi.string().required(),
        client_wilaya: Joi.string().required(),
        client_picture_url: Joi.string().required()
    });

    return schema.validate(input);
}

module.exports.validateClient = validateClient;