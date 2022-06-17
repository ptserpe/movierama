const db = require('../datasource/db.js')

async function saveRating (userID, movieID, liked) {
  const query = {
    text: 'insert into ratings (user_id, movie_id, liked) values ($1, $2, $3) ON CONFLICT (user_id, movie_id) do update set liked = $3',
    values: [userID, movieID, liked]
  }

  return await db.execute(query, true)
}

async function deleteRating (userID, movieID) {
  const query = {
    text: 'delete from ratings where user_id = $1 and movie_id = $2',
    values: [userID, movieID]
  }

  return await db.execute(query, true)
}

module.exports = {
  saveRating,
  deleteRating
}
