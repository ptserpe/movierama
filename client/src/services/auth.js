import axios from "axios"

class AuthService {
    login(username, password) {
        return axios.post('/api/v1/auth/login', {
            username: username,
            password: password
        }).then( response => {
            const jwt = response.data.jwt
            if (!jwt) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                throw Error('Invalid response - no jwt token')
            }
            localStorage.setItem('token', jwt)
            localStorage.setItem('username', username)

            return jwt
        }).catch(err => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            throw err
        })
    }

    register(username, password) {
        return axios.post('/api/v1/auth/register', {
            username: username,
            password: password
        }).then( response => {
            const jwt = response.data.jwt
            if (!jwt) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                throw Error('Invalid response - no jwt token')
            }
            localStorage.setItem('token', jwt)
            localStorage.setItem('username', username)

            return jwt
        }).catch(err => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            throw err
        })
    }
}

export default new AuthService()