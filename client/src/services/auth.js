import axios from "axios"
import authHeader from './auth-header'

class AuthService {
    login(username, password) {
        return axios.post('/api/v1/auth/login', {
            username: username,
            password: password
        }).then( response => {
            const jwt = response.data.jwt
            const is_admin = response.data.is_admin
            if (!jwt) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('is_admin')
                throw Error('Invalid response - no jwt token')
            }
            localStorage.setItem('token', jwt)
            localStorage.setItem('username', username)
            localStorage.setItem('is_admin', is_admin.toString())

            return {jwt: jwt, is_admin: is_admin}
        }).catch(err => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('is_admin')
            throw err
        })
    }

    logout() {
        return axios.post('/api/v1/auth/logout', {}, { headers: authHeader() })
    }

    register(username, password) {
        return axios.post('/api/v1/auth/register', {
            username: username,
            password: password
        }).then( response => {
            const jwt = response.data.jwt
            const is_admin = response.data.is_admin
            if (!jwt) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('is_admin')
                throw Error('Invalid response - no jwt token')
            }
            localStorage.setItem('token', jwt)
            localStorage.setItem('username', username)
            localStorage.setItem('is_admin', is_admin.toString())

            return {jwt: jwt, is_admin: is_admin}
        }).catch(err => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('is_admin')
            throw err
        })
    }
}

export default new AuthService()