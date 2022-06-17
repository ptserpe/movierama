const jwt = require('jsonwebtoken')
const config = require('../../config')

const generateJWT = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    issuer: config.jwt.signer,
    algorithm: 'HS512'
  })
}

const verifyJWT = (token) => {
  return jwt.verify(token, config.jwt.secret, {
    issuer: config.jwt.signer,
    algorithms: ['HS512']
  })
}

module.exports = {
  generateJWT,
  verifyJWT
}
