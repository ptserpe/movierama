const db = require('../datasource/db.js')

const saveUser = async (username, password, role) => {
  const query = {
    text: 'insert into users(username, password, role) values ($1, $2, $3) returning id',
    values: [username, password, role]
  }
  return await db.execute(query, true)
}

const getUser = async (userID) => {
  const query = `select username from users where id = ${userID}`

  return await db.execute(query)
}

const isUserAdmin = async (userID) => {
  const query = `select (role) = 'admin' as is_admin from users where id = ${userID}`

  return await db.execute(query)
}

const getUserPasswordHashByUsername = async (username) => {
  const query = `select password, id, (role) = 'admin' as is_admin from users where username = '${username}'`

  return await db.execute(query)
}

module.exports = {
  saveUser,
  getUser,
  getUserPasswordHashByUsername,
  isUserAdmin
}
