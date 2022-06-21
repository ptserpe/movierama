const _ = require('lodash')
const logger = require('winston')

const usersDB = require('../../repositories/users.js')

async function requireAdmin (req, res, next) {
  if (!req.token) {
    res.status(401).end()
    logger.info('no token found')
    return
  }

  const userID = req.token.userID

  const userAdmin = await usersDB.isUserAdmin(userID)

  if (_.isEmpty(userAdmin)) {
    logger.info(`empty response ${userAdmin} ${userID}`)
    res.status(401).end()
    return
  }

  if (!userAdmin[0].is_admin) {
    res.status(401).end()
    return
  }

  next(null)
}

module.exports = {
  requireAdmin: () => requireAdmin
}
