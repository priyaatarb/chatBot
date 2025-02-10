const joi = require('joi');
const dotenv = require('dotenv').config({
    path: `./environments/.env.${process.env.NODE_ENV ?? 'dev'}`
});

/**
 * Schema for environment variables
 */
const envSchema = joi.object({
    NODE_ENV     : joi.string().valid('dev', 'prod', 'qa', 'uat').default('dev'),
    PORT         : joi.number().default(3000),
    HOST         : joi.string().default('0.0.0.0'),
    CLUSTERIZE   : joi.boolean().truthy('Y').falsy('N').default('N')
}).unknown();
 
const { error, value: envVars } = envSchema.validate(process.env,{ 
        abortEarly: true,
});

/**
* If there is any variable missing
* throw error
*/
if (error) {
    error.details.forEach(detail => {
        console.error(`- ${detail.message}`);
    });
    throw new Error('Environment variables validation failed.');
}

module.exports = process.env;