const CustomError = require('./CustomError')

class UnknownError extends CustomError {
  constructor (reason) {
    super(500, 'Unknown error', reason)
  }
}

module.exports = {
  UnknownError
}
