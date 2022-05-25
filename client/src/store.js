import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth.js'
import movieReducer from './features/auth/movies.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer
  }
})