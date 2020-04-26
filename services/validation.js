const Joi = require('@hapi/joi');



const validateUser = (data)=>{
    const Schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email : Joi.string().min(5).max(255).required().email(),
        active: Joi.boolean(),
        activeToken: Joi.string(),
        activeExpires: Joi.date()

    });

   return Schema.validate(data);
}

const validateLoggedInUser = (data)=>{
    const LoggedInSchema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().required()
    });

   return LoggedInSchema.validate(data);
}

module.exports = {
    validateUser : validateUser,
    validateLoggedInUser : validateLoggedInUser
}