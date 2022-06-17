const express = require('express')
const logger = require('winston')

const ratingsDB = require('../repositories/ratings.js')
const validator = require('../common/middlewares/validator.js')
const auth = require('../common/middlewares/auth.js')

const router = express.Router()

router.use(auth())

router.post('/new', validator.insertRating(), async function (req, res, next) {
  if (!req.token) {
    res.status(401).end()
    return
  }

  const userID = req.token.userID
  const movieID = req.body.movie_id
  const liked = req.body.liked
  logger.log('info', 'Creating rating ..')

  try {
    await ratingsDB.saveRating(userID, movieID, liked)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

router.post('/remove', validator.removeRating(), async function (req, res, next) {
  if (!req.token) {
    res.status(401).end()
    return
  }

  const userID = req.token.userID
  const movieID = req.body.movie_id
  logger.log('info', 'Removing rating ..')

  try {
    await ratingsDB.deleteRating(userID, movieID)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
