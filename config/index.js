const { object } = require('joi')
const _ = require('lodash')

require('dotenv').config()

const Joi = require('joi').extend(joi => ({
  type: 'commaSeparated',
  base: joi.array(),
  coerce: (value) => ({ value: value.split(',') })
}))

const configSchema = Joi.object({
    port: Joi.string().required(),
    db: Joi.object({
        host: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        port: Joi.string().required(),
        database: Joi.string().required(),
        mock_data: Joi.boolean().required().default(false)
    }),
    redis: Joi.object({
        host: Joi.string().required(),
        port: Joi.string().required(),
        password: Joi.string().required(),
        database: Joi.string().required()
    }),
    jwt: Joi.object({
        secret: Joi.string().required(),
        signer: Joi.string().required()
    })
}).strict()

const config = {
    port: process.env.SERVER_PORT,
    db: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        mock_data: _.lowerCase(process.env.DB_MOCK_DATA) === 'true'
    },
    redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT,
        database: process.env.REDIS_DATABASE
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signer: process.env.JWT_SIGNER
    }
}

const { error } = configSchema.validate(config)
if (error) {
    throw Error(`configuration error: ${error.message}`)
}

module.exports = config