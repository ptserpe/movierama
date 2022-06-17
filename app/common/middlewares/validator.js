const _ = require('lodash')
const logger = require('winston')

const Joi = require('joi').extend(joi => ({
  type: 'commaSeparated',
  base: joi.array(),
  coerce: (value) => ({ value: _.split(value, ',') })
}))

const OPTIONS = {
  errors: {
    wrap: {
      label: '\'\''
    }
  }
}

const registerSchema = Joi.object({
  username: Joi.string()
    .required(),
  password: Joi.string()
    .required()
}).strict()

const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
}).strict()

const newRatingSchema = Joi.object({
  movie_id: Joi.number().required(),
  liked: Joi.boolean().required()
}).strict()

const removeRatingSchema = Joi.object({
  movie_id: Joi.number().required()
}).strict()

const validateRequestBodyWithSchema = (schema) => validateRequestWithSchema(schema, 'body')

const validateRequestWithSchema = (schema, path) => async function (req, res, next) {
  try {
    await schema.validateAsync(_.get(req, path), OPTIONS)
    logger.log('debug', 'Input is valid!')
    next()
  } catch (err) {
    logger.log('debug', 'Input invalid: %s', err.message)
    next(err)
  }
}

const register = () => validateRequestBodyWithSchema(registerSchema)

const insertMovie = () => validateRequestBodyWithSchema(movieSchema)

const insertRating = () => validateRequestBodyWithSchema(newRatingSchema)

const removeRating = () => validateRequestBodyWithSchema(removeRatingSchema)

module.exports = {
  register,
  insertMovie,
  insertRating,
  removeRating
}
