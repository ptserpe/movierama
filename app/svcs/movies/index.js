// const config = require('./config')
const logger = require('../../common/utils/logger')
const config = require('../../config')

// Create application server
const app = require('./movies.js')

// Start server
const host = '0.0.0.0'
const port = config.port

app.listen(port, host, function () {
  logger.log('info', `Listening on http://${host}:${port}`)
})
