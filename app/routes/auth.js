const express = require('express')
const logger = require('winston')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const mask = require('../common/utils/mask')
const usersDB = require('../repositories/users.js')
const validator = require('../common/middlewares/validator.js')
const admin = require('../common/middlewares/admin.js')
const auth = require('../common/middlewares/auth.js')
const jwtUtils = require('../common/utils/jwt.js')
const jwtRedis = require('../repositories/jwt.js')

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
    const userDB = await usersDB.saveUser(username, passwordHash, 'normal')

    const token = jwtUtils.generateJWT({ userID: userDB[0].id })

    await jwtRedis.saveToken(token)

    res.status(200).json({
      jwt: token,
      is_admin: false
    })
  } catch (err) {
    next(err)
  }
})

router.post('/register/admin', validator.register(), admin.requireAdmin(), async function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  logger.log('info', `Register as [user=${username}, pass=${mask.password(password)}]`)

  try {
    const passwordHash = await bcrypt.hash(password, 5)
    const userDB = await usersDB.saveUser(username, passwordHash, 'admin')

    const token = jwtUtils.generateJWT({ userID: userDB[0].id })

    await jwtRedis.saveToken(token)

    res.status(200).json({
      jwt: token,
      is_admin: true
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

    if (_.isEmpty(hashedPassword)) {
      res.status(404).end()
      return
    }

    if (!await bcrypt.compare(password, hashedPassword[0].password)) {
      res.status(400).end()
      return
    }

    const token = jwtUtils.generateJWT({ userID: hashedPassword[0].id })

    await jwtRedis.saveToken(token)

    res.status(200).json({
      jwt: token,
      is_admin: hashedPassword[0].is_admin
    })
  } catch (err) {
    next(err)
  }
})

/**
 * Logout endpoint. Invalidates current token.
 */
router.post('/logout', auth(), async function (req, res, next) {

  const token = req.token.encoded

  if (!token) {
    res.status(401).end()
    return
  }

  try {
    await jwtRedis.removeToken(token)
    res.status(200).end()
  } catch (err) {
    next(err)
  }

})

module.exports = router
