const mask = require('maskdata')

function token (token) {
  return mask.maskPassword(token, {
    maxMaskedCharacters: 24,
    unmaskedStartCharacters: 5,
    unmaskedEndCharacters: 5
  })
}

function password (password) {
  return mask.maskPassword(password, {
    unmaskedStartCharacters: 1,
    unmaskedEndCharacters: 0
  })
}

module.exports = { password, token }
