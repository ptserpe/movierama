const CacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis-store')
const config = require('../config')

const moment = require('moment')

// Create cache instance
const cache = CacheManager.caching({
  store: redisStore,
  host: config.redis.host,
  port: config.redis.port,
  auth_pass: config.redis.password,
  db: config.redis.database,
  ttl: moment.duration(10, 'minutes').asSeconds()
})

module.exports = cache
