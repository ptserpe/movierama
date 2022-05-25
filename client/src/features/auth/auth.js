import { createSlice } from '@reduxjs/toolkit'


const token = localStorage.getItem("token")
const username = localStorage.getItem("username")

const initialState = (token && username)
    ? { isLoggedIn: true, token, username: username }
    : { isLoggedIn: false, token: null, username: null }

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, data) => {
            state.isLoggedIn = true
            state.token = data.payload.token
            state.username = data.payload.username
        },
        logout: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            state.isLoggedIn = false
            state.username = null
            state.token = null
        }
    },
})

export const { logout, loggedIn } = authSlice.actions


export default authSlice.reducer