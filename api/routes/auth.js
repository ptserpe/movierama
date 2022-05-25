const express = require('express')
const logger = require('winston')
const bcrypt = require('bcrypt')
const _ = require('lodash')


const mask = require('../../common/utils/mask')
const usersDB = require('../../repositories/users.js')
const validator = require('../../common/middlewares/validator.js')
const jwtUtils = require('../../common/utils/jwt.js')
const jwtRedis = require('../../repositories/jwt.js')


const router = express.Router()

/**
 * Register endpoint.
 */
router.post('/register', validator.register(), async function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  logger.log('info', `Register as [user=${username}, pass=${mask.password(password)}]`)
  
  try {
    const passwordHash = await bcrypt.hash(password, 5)
    const userDB = await usersDB.saveUser(username, passwordHash)

    const token = jwtUtils.generateJWT({userID: userDB[0].id})

    await jwtRedis.saveToken(token)

    res.status(200).json({
      jwt: token
    })
  } catch (err) {
    next(err)
  }
})

/**
 * Login user endpoint.
 */
router.post('/login', validator.register(), async function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  logger.log('info', `Logging in as [user=${username}, pass=${mask.password(password)}]`)
  
  try {
    const hashedPassword = await usersDB.getUserPasswordHashByUsername(username)

    if(_.isEmpty(hashedPassword)) {
      res.status(404).end()
      return
    }
    
    if(! await bcrypt.compare(password, hashedPassword[0].password)) {
      res.status(400).end()
      return
    }

    const token = jwtUtils.generateJWT({userID: hashedPassword[0].id})

    await jwtRedis.saveToken(token)

    res.status(200).json({
      jwt: token
    })
  } catch (err) {
    next(err)
  }
})

/**
 * Logout endpoint. Invalidates current token.
 */
router.post('/logout', function (req, res, next) {
  const accessToken = req.body.accessToken
  logger.log('info', `Logging out [token=${mask.token(accessToken)}]`)
  usecase.logout(accessToken)
    .then(() => {
      res.status(200).end()
    })
    .catch(err => next(err))
})

module.exports = router
