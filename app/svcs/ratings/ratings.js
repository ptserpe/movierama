const _ = require('lodash')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const logger = require('winston')
const morgan = require('morgan')
const compression = require('compression')

const errors = require('../../common/middlewares/errors')

// Create express application server
const app = express()

// Http logging middleware
app.use(morgan(':method :url :status [:remote-addr] - :response-time ms', {
  stream: {
    write: (message) => logger.log('info', _.trim(message), message)
  }
}
))

// CORS middleware
app.use(cors())

// GZIP compression middleware
app.use(compression())

// JSON body parse middleware
app.use(express.json())

// FORM body parse middleware
app.use(express.urlencoded({ extended: false }))

// HTTP header protection in PRODUCTION mode
if (process.env.NODE_ENV !== 'development') {
  app.use(helmet({ contentSecurityPolicy: false }))
}

// Add API router
app.use('/api/v1/rating', require('../../routes/ratings.js'))

// Add error handling middleware last
app.use(errors())

module.exports = app
