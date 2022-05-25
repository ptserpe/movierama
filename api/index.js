const express = require('express')
const router = express.Router()

// Movies route
router.use('/movies', require('./routes/movies.js'))
router.use('/auth', require('./routes/auth.js'))
router.use('/rating', require('./routes/ratings.js'))

module.exports = router
