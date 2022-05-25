const db = require('../datasource/db.js')


const saveUser = async (username, password) => {
    const query = {
        text: 'insert into users(username, password) values ($1, $2) returning id',
        values: [username, password]
    }
    return await db.execute(query, true)
}

const getUser = async (userID) => {
    const query = `select username from users where id = ${userID}`
    
    return await db.execute(query)
}

const getUserPasswordHashByUsername = async (username) => {
    const query = `select password, id from users where username = '${username}'`
    
    return await db.execute(query)
}

module.exports = {
    saveUser,
    getUser,
    getUserPasswordHashByUsername
}