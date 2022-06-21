const express = require('express')
const logger = require('winston')

const moviesDB = require('../repositories/movies.js')
const userDB = require('../repositories/users.js')
const validator = require('../common/middlewares/validator.js')
const admin = require('../common/middlewares/admin.js')
const auth = require('../common/middlewares/auth.js')

const router = express.Router()

router.use(auth())

router.get('/', async function (req, res, next) {
  logger.log('debug', 'Getting movies...')

  try {
    const sort = req.query.sort
    const movies = (req.token) ? await moviesDB.getAllMovies(req.token.userID, sort) : await moviesDB.getAllMovies(null, sort)

    res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
})

router.get('/:submitter/', async function (req, res, next) {
  logger.log('debug', 'Getting movies...')

  try {
    const submitter = req.params.submitter
    const sort = req.query.sort
    const movies = (req.token) ? await moviesDB.getMoviesSubmittedBy(submitter, req.token.userID, sort) : await moviesDB.getMoviesSubmittedBy(submitter, null, sort)

    res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', admin.requireAdmin(), async function (req, res, next) {
  const movieID = req.params.id

  logger.log('info', `Deleting movie ${movieID} ..`)

  try {
    await moviesDB.deleteMovie(movieID)
  } catch (err) {
    next(err)
  }

  res.status(200).end()
})

router.post('/new', validator.insertMovie(), async function (req, res, next) {
  if (!req.token) {
    res.status(401).end()
    return
  }

  const userID = req.token.userID
  const title = req.body.title
  const description = req.body.description
  logger.log('info', 'Creating movie ..')

  try {
    const submitter = await userDB.getUser(userID)
    if (!submitter) {
      res.status(404).end()
    }
    await moviesDB.saveMovie(userID, title, description, submitter[0].username)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
