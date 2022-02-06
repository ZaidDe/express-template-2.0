const Joi = require('joi');
const { indexService } = require('../services')


const testGetHandler = async () => {

    //perform validation
    const { check, data } = await indexService.get()
    if (check) return data
    else return {
        success: false,
        message: `failure`
    }
}

const testPostHandler = async (payload) => {

    //perform input validation

    const schema = Joi.object().keys({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['bkk', 'ag']
            }
        }).required().messages({
            "string.email": "Invalid email",
        }),
        password: Joi.string().min(8).required().messages({
            "string.min": "Password have at least 8 characters",
        }),
        name: Joi.string().min(3).required().messages({
            "string.min": "Name have at least 3 characters",
        }),
        roleId: Joi.array().items(Joi.number().integer()).required(),
        msisdn: Joi.string().required(),
        extension: Joi.number().integer().optional(),
        profileImageUrl: Joi.string().optional()
    })

    const isNotValid = schema.validate(payload).error
    if (isNotValid) {
        return {
            success: false,
            message: isNotValid.message
        }
    }

    //call serviice 

    const { check, data } = await indexService.post()
    if (check) return data
    else return {
        success: false,
        message: `failure`
    }
}

module.exports = {
    testGetHandler,
    testPostHandler
}