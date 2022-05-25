import { useState, useEffect } from 'react'
import './Rating.css'
import RatingsService from '../services/ratings.js'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { logout } from '../features/auth/auth.js'

export function Rating(props) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual)
    const dispatch = useDispatch()
    const username = useSelector((state) => state.auth.username, shallowEqual)

    const [movie, setMovie] = useState({
        ...props.movie,
        likes: parseInt(props.movie.likes),
        hates: parseInt(props.movie.hates)
    })

    const likedEnabled = () => isLoggedIn && movie.submitter !== username && !(movie.rated && movie.liked)

    const hateEnabled = () => isLoggedIn && movie.submitter !== username && !(movie.rated && !movie.liked)

    useEffect(() => {
        setMovie({
            ...props.movie,
            likes: parseInt(props.movie.likes),
            hates: parseInt(props.movie.hates)
        })
    }, [props])

    return (
        <div className='ratingRow'>
            <div className='likeHateButtons'>
                {
                    likedEnabled() ?
                        <span className="ratingEnabled" onClick={async () => {
                            try {
                                await RatingsService.postNewRating(props.movie.id, true)
                                setMovie({
                                    ...movie,
                                    likes: movie.likes + 1,
                                    hates: (movie.rated) ? movie.hates - 1 : movie.hates,
                                    rated: true,
                                    liked: true
                                })
                            } catch (err) {
                                if (err.response.status === 401) {
                                    dispatch(logout())
                                }
                                alert(err.message)
                            }
                        }}>{movie.likes} likes</span>
                        :
                        <p>{movie.likes} likes</p>
                }
                {
                    hateEnabled() ?
                        <p className="ratingEnabled" onClick={async () => {
                            try {
                                await RatingsService.postNewRating(props.movie.id, false)
                                setMovie({
                                    ...movie,
                                    hates: movie.hates + 1,
                                    likes: (movie.rated) ? movie.likes - 1 : movie.likes,
                                    rated: true,
                                    liked: false
                                })
                            } catch (err) {
                                if (err.response.status === 401) {
                                    dispatch(logout())
                                }
                                alert(err.message)
                            }
                        }}>{movie.hates} hates</p>
                        :
                        <p>{movie.hates} hates</p>
                }
            </div>
            <div className='unlikeUnateButtons'>
                {
                    isLoggedIn && movie.rated && movie.liked &&
                    <span onClick={async () => {
                        try {
                            await RatingsService.removeRating(movie.id)
                            setMovie({
                                ...movie,
                                likes: (movie.liked) ? movie.likes - 1 : movie.likes,
                                hates: (!movie.liked) ? movie.hates - 1 : movie.hates,
                                rated: false,
                                liked: false
                            })
                        } catch (err) {
                            if (err.response.status === 401) {
                                dispatch(logout())
                            }
                            alert(err.message)
                        }
                    }}>You like this movie | <span className="ratingEnabled">Unlike</span></span>
                }
                {
                    isLoggedIn && movie.rated && !movie.liked &&
                    <span onClick={async () => {
                        try {
                            await RatingsService.removeRating(props.movie.id)
                            setMovie({
                                ...movie,
                                likes: (movie.liked) ? movie.likes - 1 : movie.likes,
                                hates: (!movie.liked) ? movie.hates - 1 : movie.hates,
                                rated: false,
                                liked: false
                            })
                        } catch (err) {
                            if (err.response.status === 401) {
                                dispatch(logout())
                            }
                            alert(err.message)
                        }
                    }}>You hate this movie | <span className="ratingEnabled">Unhate</span></span>
                }
            </div>
        </div>
    )
}