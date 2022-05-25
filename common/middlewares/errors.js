const logger = require('winston')
const errors = require('../models/errors')


function sendError (req, res, err) {
  const { status, code, message, id, reason } = err
  const response = {
    code,
    message,
    id,
    path: req.originalUrl
  }
  logger.log('warning', `${reason}\nResponse sent: ${status} - ${JSON.stringify(response, null, '  ')}`)
  res.status(status).json(response)
}

// Global error handler middleware
function handleErrors (err, req, res, next) {

  // something ecxeptional occured
  sendError(req, res, errors.UnknownError(err.message))
}

module.exports = () => [
  handleErrors
]
