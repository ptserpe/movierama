import axios from 'axios'
import authHeader from './auth-header'

class RatingsService {
  postNewRating(movieID, liked) {
    return axios.post('/api/v1/rating/new',{ movie_id: movieID, liked: liked }, { headers: authHeader() })
  }

  removeRating(movieID) {
    return axios.post('/api/v1/rating/remove',{ movie_id: movieID }, { headers: authHeader() })
  }
}
export default new RatingsService()