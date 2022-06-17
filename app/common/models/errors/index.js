const types = require('./types.js')

module.exports = {
  UnknownError: (...args) => new types.UnknownError(...args)
}
