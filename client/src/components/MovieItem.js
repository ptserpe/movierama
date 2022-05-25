import { React } from 'react'
import { Link } from "react-router-dom"
import './MovieItem.css'
import moment from 'moment'
import { useSelector, shallowEqual } from 'react-redux'
import { Rating } from './Rating'

export default function MovieListItem(props) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual)
    const username = useSelector((state) => state.auth.username, shallowEqual)

    return (
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
        </div>
    )
}