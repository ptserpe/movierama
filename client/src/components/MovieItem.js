import { React, useState } from 'react'
import { Link } from "react-router-dom"
import './MovieItem.css'
import moment from 'moment'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Rating } from './Rating'
import MoviesService from '../services/movies'
import { logout } from '../features/auth/auth.js'

export default function MovieListItem(props) {

    const dispatch = useDispatch()
    const [visible, setVisible] = useState(true);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual)
    const isAdmin = useSelector((state) => state.auth.is_admin, shallowEqual)
    const username = useSelector((state) => state.auth.username, shallowEqual)

    return ( visible?
        <div className='movieItem'>
            <div className='movieTitle'>
                {props.movie.title}
            </div>
            <div className='movieSubmitter'>
                <span>Posted by </span>
                {
                    isLoggedIn && props.movie.submitter === username ?
                        props.userfilter ?
                            <span>You</span>
                            :
                            <span><Link to={props.movie.submitter}>You</Link></span>
                        :
                        props.userfilter ?
                            <span>{props.movie.submitter}</span>
                            :
                            <span><Link to={props.movie.submitter}>{props.movie.submitter}</Link> </span>

                }
                <span> ({moment(props.movie.created_at).utc().fromNow()})</span>
            </div>
            <div>
                {props.movie.description}
            </div>
            <Rating movie={props.movie} isLoggedIn={isLoggedIn} username={username} />
            {
                isAdmin &&
                <span className='ratingEnabled' onClick={async () => {
                    try {
                        await MoviesService.deleteMovie(props.movie.id)
                        setVisible(false)
                    } catch (err) {
                        if (err.response.status === 401) {
                            dispatch(logout())
                        }
                        alert(err.message)
                    }
                }}>Delete this movie</span>
            }
        </div>
        : ''
    )
}