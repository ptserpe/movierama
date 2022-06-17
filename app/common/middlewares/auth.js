const _ = require('lodash')
const logger = require('winston')

const mask = require('../utils/mask')
const jwtUtils = require('../utils/jwt.js')
const jwtRedis = require('../../repositories/jwt.js')

const AUTH_HEADER = 'Authorization'
const AUTH_SCHEMA = 'Bearer '

async function getToken (req, res, next) {
  // Get authorization header
  const header = req.header(AUTH_HEADER)

  // Extract token from authorization header
  if (_.startsWith(header, AUTH_SCHEMA)) {
    const encodedToken = header.substring(_.size(AUTH_SCHEMA))
    logger.log('debug', `Found token in header [token=${mask.token(encodedToken)}]`)

    try {
      const decodedToken = jwtUtils.verifyJWT(encodedToken)

      const cachedToken = await jwtRedis.getToken(encodedToken)
      if (cachedToken) {
        jwtRedis.refreshToken(encodedToken)
        req.token = decodedToken
      }
    } catch (err) {
      logger.log('debug', err.message)
    }
  }

  next(null)
}

module.exports = () => [
  getToken
]
