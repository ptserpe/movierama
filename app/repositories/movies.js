const db = require('../datasource/db.js')

async function getAllMovies (userID = null, sort = '') {
  switch (sort) {
    case 'likes':
      sort = 'order by likes desc'
      break
    case 'hates':
      sort = 'order by hates desc'
      break
    case 'created':
      sort = 'order by m.created_at desc'
      break
  }

  const userIDQueryPart = (userID == null) ? 'NULL as liked, NULL as rated' : `(count(*) filter(where r.user_id = ${userID})) > 0 as rated, (count(*) filter(where r.user_id = ${userID} and r.liked)) > 0 as liked`

  const query = `select m.id, m.title, m.description, m.submitter, m.created_at, count(case when r.liked then 1 end) as likes, count(case when not r.liked then 1 end) as hates, ${userIDQueryPart} from movies m left join ratings r on m.id = r.movie_id group by m.id ${sort}`

  return await db.execute(query)
}

async function getMoviesSubmittedBy (submitter, userID = null, sort = '') {
  switch (sort) {
    case 'likes':
      sort = 'order by likes desc'
      break
    case 'hates':
      sort = 'order by hates desc'
      break
    case 'created':
      sort = 'order by m.created_at desc'
      break
  }

  const userIDQueryPart = (userID == null) ? 'NULL as liked, NULL as rated' : `(count(*) filter(where r.user_id = ${userID}) > 0 ) as rated, (count(*) filter(where r.user_id = ${userID} and r.liked) > 0 ) as liked`

  const query = `select m.id, m.title, m.description, m.submitter, m.created_at, count(case when r.liked then 1 end) as likes, count(case when not r.liked then 1 end) as hates, ${userIDQueryPart} from movies m left join ratings r on m.id = r.movie_id where m.submitter = '${submitter}' group by m.id ${sort}`

  return await db.execute(query)
}

async function saveMovie (userID, title, description, submitter) {
  const now = new Date()

  const query = {
    text: 'insert into movies (user_id, title, description, submitter, created_at) values ($1, $2, $3, $4, $5)',
    values: [userID, title, description, submitter, now]
  }

  return await db.execute(query, true)
}

module.exports = {
  getAllMovies,
  getMoviesSubmittedBy,
  saveMovie
}
