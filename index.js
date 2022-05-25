// const config = require('./config')
const logger = require('./common/utils/logger.js')
const db = require('./repositories/init_db.js')
const config = require('./config')

// Create application server
const app = require('./app')

// Start server
const host = '0.0.0.0'
const port = config.port

logger.log('info', '[Database] initializing schemas')
db.init().then( () => {
  logger.log('info', '[Database] schemas initialized')

  app.listen(port, host, function () {
    logger.log('info', `[Server] Listening on http://${host}:${port}`)
  })
}).catch((err) => {
  logger.log('error', err.message)
  process.exit(1);
})
