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

const adoptValidationSchema = Joi.object({
      userId: Joi.number().integer().positive().required(),
      petId: Joi.number().integer().positive().required(),
      
      // Personal Information
      address: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      career: Joi.string().required(),
      workTime: Joi.string().required(),
      workPlace: Joi.string().required(),
      dayOff: Joi.string().required(),
      salary: Joi.number().integer().positive().required(),
      dateOfBirth: Joi.date().iso().required(),
      socialContact: Joi.string().allow(null),
    
      // Pet & Living Situation
      currentPetCount: Joi.number().integer().min(0).required(),
      currentPetDetails: Joi.string().required(),
      familyMemberCount: Joi.number().integer().positive().required(),
      familyAlwaysHome: Joi.boolean().required(),
      aloneHours: Joi.number().integer().min(0).allow(null),
    
      // Housing Information
      housingType: Joi.string().valid(
        'OWN_HOUSE',
        'RENTAL_HOUSE',
        'CONDO',
        'APARTMENT',
        'RENTAL_ROOM',
        'SINGLE_HOUSE'
      ).required(),
      hasGarden: Joi.boolean().required(),
      hasFence: Joi.boolean().required(),
      canWalkDog: Joi.boolean().required(),
    
      // Delivery Preference
      deliveryType: Joi.string().valid('REQUIRE_DELIVERY', 'PICK_UP').required(),
    
      // Optional fields
      notes: Joi.string().allow(null),

      files: Joi.string() 
    });

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
exports.adoptValidationSchema = validateSchema(adoptValidationSchema);