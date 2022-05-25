const { v4: uuid } = require('uuid')

class CustomError extends Error {
  constructor (status, message, reason) {
    super(message)
    this.id = uuid()
    this.name = this.constructor.name
    this.code = this.name.replace('Error', '')
    this.status = status
    this.message = message
    this.reason = reason
    this.isCustomError = true
  }
}

module.exports = CustomError
