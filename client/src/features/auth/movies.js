import { createSlice } from '@reduxjs/toolkit'

const initialState = { refresh: true }

export const movieSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        refresh: (state) => {
            state.refresh = !state.refresh
        }
    },
})

export const { refresh } = movieSlice.actions


export default movieSlice.reducer