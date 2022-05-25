const moment = require('moment')
const cache = require('../datasource/cache.js')

const saveToken = async (token) => {
    await cache.set(token, 'exists', {ttl: moment.duration(1, 'days').asSeconds()})
}

const refreshToken = async (token) => {
    await saveToken(token)
}

const getToken = async (token) => {
    return await cache.get(token)
}

module.exports = {
    saveToken,
    refreshToken,
    getToken
}