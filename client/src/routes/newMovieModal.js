import './modal.css'

import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import MoviesService from '../services/movies.js'
import { useDispatch } from 'react-redux'
import { refresh } from '../features/auth/movies.js'
import { logout } from '../features/auth/auth.js'
import _ from 'lodash'


export default function NewMovieModal() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const titleHandleChange = (e) => {
    setTitle(e.target.value)
    setErrorMsg(' ')
  }

  const [description, setDescription] = useState('')
  const descriptionHandleChange = (e) => {
    setDescription(e.target.value)
    setErrorMsg(' ')
  }

  const [errorMsg, setErrorMsg] = useState('')
  return (
    <div className="modalDiv">
      <div className="modalMovie">
        <h3>New Movie</h3>

        <input type="text" className='modalInput' placeholder="Enter Title" value={title} onChange={titleHandleChange} required></input>

        <textarea type="text" className='modalTexArea' placeholder="Enter Description" value={description} onChange={descriptionHandleChange} required></textarea>
        <div className='errorMsg'><p>{errorMsg ? errorMsg : ' '}</p></div>

        <div className='modalButtonsDiv'>
          <button aria-label='Post'
            onClick={async () => {
              try {
                if (_.isEmpty(title) || _.isEmpty(description)) {
                  setErrorMsg('Please fill both title and description')
                  return
                }
                await MoviesService.postMovie(title, description)
                dispatch(refresh())
              } catch (err) {
                if (err.response.status === 401) {
                  dispatch(logout())
                }
                alert(err.message)
              }
              navigate(-1)
            }}>Post</button>


          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </div>
    </div>
  )
}
