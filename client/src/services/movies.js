import axios from 'axios'
import authHeader from './auth-header'

class MoviesService {
  getMovies(sort = '') {
    return axios.get('/api/v1/movies', { headers: authHeader(), params: {sort: sort} })
  }

  getMoviesSubmittedBy(submitter, sort = '') {
    return axios.get(`/api/v1/movies/${submitter}`, { headers: authHeader(), params: {sort: sort} })
  }

  postMovie(title, description) {
    return axios.post('/api/v1/movies/new', {
      title: title,
      description: description
    }, { headers: authHeader() })
  }
}
export default new MoviesService()