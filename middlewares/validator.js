const Joi = require('joi');
const createError = require("../utils/createError");

const registerAuthen = Joi.object({


    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|`~]).{6,}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 !@#$%^&* and at least 6 characters"
        }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "string.empty": "Confirm password is required",
            "any.only": "Password does not match",
        })

})

const loginAuthen = Joi.object({


    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address"
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|`~]).{6,}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 !@#$%^&* and at least 6 characters"
        }),
})


const validateSchema = (schema) => (req, res, next) => {

    const { value, error } = schema.validate(req.body)

    if (error) {


        return createError(400, error.details[0].message)

    }

    req.input = value;
    next();
}


exports.registerAuthen = validateSchema(registerAuthen);
exports.loginAuthen = validateSchema(loginAuthen);