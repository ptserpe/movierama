const usersDB = require('../../repositories/users.js')

async function requireAdmin (req, res, next) {
  if (!req.token) {
    res.status(401).end()
    return
  }

  const userID = req.token.userID
  if (!usersDB.isUserAdmin(userID)[0]) {
    res.status(401).end()
    return
  }

  next(null)
}

module.exports = {
  requireAdmin
}
