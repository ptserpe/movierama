// const config = require('./config')
const logger = require('../../common/utils/logger')
const config = require('../../config')

// Create application server
const db = require('../../repositories/init_db.js')

// Start server
const host = '0.0.0.0'
const port = config.port

logger.log('info', '[Database] initializing schemas')
db.init().then( () => {
  logger.log('info', '[Database] schemas initialized')
  process.exit(0);
}).catch((err) => {
  logger.log('error', err.message)
  process.exit(1);
})
