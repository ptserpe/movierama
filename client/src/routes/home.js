import './home.css'
import { MovieList } from "../components/MovieList"
import { logout } from '../features/auth/auth.js'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    let params = useParams()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual)
    const username = useSelector((state) => state.auth.username, shallowEqual)
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <div className="homePage">
            <div className='PageHeader'>
                <h1>MovieRama
                    {params.userfilter &&
                        <span> - Movies submitted by {
                            params.userfilter === username ?
                                'You'
                                :
                                params.userfilter
                        }
                        </span>
                    }
                </h1>
                {
                    params.userfilter ?
                        <div className='userButtons'>
                            <button aria-label='All Movies' onClick={() => navigate(-1)}>All Movies</button>
                        </div>
                        :
                        isLoggedIn && username ?
                            <div className='userButtons'>
                                <div>
                                    <span>Welcome back </span>
                                    <Link to={username}>{username}</Link>
                                    <span> </span>
                                </div>
                                <button aria-label='Login' onClick={() => dispatch(logout())}>Logout</button>
                            </div>
                            :
                            <div className='userButtons'>
                                <Link to="auth/login" state={{ background: location }}>
                                    <button aria-label='Login'>Login</button>
                                </Link>

                                <span> or </span>
                                <Link to="auth/register" state={{ background: location }}>
                                    <button aria-label='Sign-up'>Sign-up</button>
                                </Link>
                            </div>
                }
            </div>
            {params.userfilter ?
                <MovieList userfilter={params.userfilter} />
                :
                <MovieList />
            }

        </div>
    )
}