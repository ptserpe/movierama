import { createSlice } from '@reduxjs/toolkit'


const token = localStorage.getItem("token")
const username = localStorage.getItem("username")
const is_admin = localStorage.getItem("is_admin")

const initialState = (token && username && is_admin !== null)
    ? { isLoggedIn: true, token, username: username, is_admin: is_admin === 'true' }
    : { isLoggedIn: false, token: null, username: null, is_admin: null }

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, data) => {
            state.isLoggedIn = true
            state.token = data.payload.token
            state.username = data.payload.username
            state.is_admin = data.payload.is_admin
        },
        logout: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('is_admin')
            state.isLoggedIn = false
            state.username = null
            state.token = null
            state.is_admin = null
        }
    },
})

export const { logout, loggedIn } = authSlice.actions


export default authSlice.reducer