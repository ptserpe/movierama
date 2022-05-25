import React, { useEffect, useState } from 'react'
import MovieListItem from './MovieItem'
import { Link, useLocation } from "react-router-dom"
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import MoviesService from '../services/movies.js'
import { logout } from '../features/auth/auth.js'

import './MovieList.css'

export function MovieList(props) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual)

    const refresh = useSelector((state) => state.movie.refresh)
    const dispatch = useDispatch()

    const [movies, setMovies] = useState([])
    const [sortyBy, setSortBy] = useState('')

    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data")
            try {
                const response = (!props.userfilter) ?
                    await MoviesService.getMovies(sortyBy)
                    :
                    await MoviesService.getMoviesSubmittedBy(props.userfilter, sortyBy)
                setMovies(response.data)
            } catch (err) {
                if (err.response.status === 401) {
                    dispatch(logout())
                }
                alert(err.message)
            }
        }

        fetchData()
    }, [isLoggedIn, sortyBy, refresh, props, dispatch])

    return (
        <div className='movieList'>
            <div className='movieActions'>
                {isLoggedIn && !props.userfilter &&
                    <div className='addMovie'>
                        <Link to='movie/new' state={{ background: location }}>
                            <button>New Movie</button>
                        </Link>
                    </div>
                }
                <div className='sortControls'>
                    <div>
                        <button aria-label='Unsorted' onClick={() => setSortBy('')}>Unsorted</button>
                    </div>
                    <div>
                        <button aria-label='SortByLikes' onClick={() => setSortBy('likes')}>SortByLikes</button>
                    </div>
                    <div>
                        <button aria-label='SortByHates' onClick={() => setSortBy('hates')}>SortByHates</button>
                    </div>
                    <div>
                        <button aria-label='SortByCreatedTime' onClick={() => setSortBy('created')}>SortByCreatedTime</button>
                    </div>
                </div>
            </div>
            {props.userfilter ?
                movies.map(movie =>
                    <MovieListItem key={movie.id} movie={movie} userfilter={props.userfilter} />
                )
                :
                movies.map(movie =>
                    <MovieListItem key={movie.id} movie={movie} />
                )
            }

        </div>
    )
}