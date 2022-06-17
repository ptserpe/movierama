const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool({
  host: config.db.host,
  user: config.db.username,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
})

const execute = async (query, transaction = false) => {
  const client = await pool.connect()

  try {
    if (transaction) {
      await client.query('BEGIN')
    }

    const res = await client.query(query)

    if (transaction) {
      await client.query('COMMIT')
    }

    return res.rows
  } catch (error) {
    if (transaction) {
      await client.query('ROLLBACK')
    }

    throw error
  } finally {
    client.release()
  }
}

module.exports = {
  execute
}
