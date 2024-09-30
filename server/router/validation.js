const Joi = require('@hapi/joi');

// Define the validation schema
const schema = Joi.object({
    username: Joi.string()
        .pattern(/^[A-Za-z0-9_]+$/) // Only allows alphanumeric characters and underscores
        .min(5)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email()
        .pattern(/^[a-z0-9._%+\-]+@gmail\.com$/i) // Custom regex for Gmail addresses
        .required(),

    password: Joi.string()
        .min(5)
        .required(),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password')) // Ensures password and confirmPassword are identical
        .required()
        .messages({ 'any.only': 'Passwords do not match!' }) // Custom error message for password mismatch
});

// Export the schema
module.exports = schema;
