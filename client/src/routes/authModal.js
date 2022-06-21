import './modal.css'

import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loggedIn } from '../features/auth/auth.js'
import AuthService from '../services/auth.js'
import _ from 'lodash'


export default function AuthModal() {

  const params = useParams()
  const isLogin = params.action === 'login'

  const navigate = useNavigate()
  const dispath = useDispatch()

  const [password, setPassword] = useState('')
  const passwordHandleChange = (e) => {
    setPassword(e.target.value)
    setErrorMsg(' ')
  }

  const [username, setUsername] = useState('')
  const usernameHandleChange = (e) => { 
    setUsername(e.target.value)
    setErrorMsg(' ')
  }

  const [errorMsg, setErrorMsg] = useState('')

  return (
    <div className="modalDiv">
      <div className="modal">
        {isLogin ?
          <h3>Login</h3>
          :
          <h3>Sign-up</h3>
        }

        <input type="text" className='modalInput' placeholder="Enter Username" value={username} onChange={usernameHandleChange} name="uname" required></input>

        <input type="password" className='modalInput' placeholder="Enter Password" value={password} onChange={passwordHandleChange} name="psw" required></input>
        <div className='errorMsg'><p>{errorMsg ? errorMsg : ' '}</p></div>
        <div className='modalButtonsDiv'>
          {isLogin ?
            <button aria-label='Login' 
            onClick={async () => {
              try {
                if (_.isEmpty(username) || _.isEmpty(password)) {
                  setErrorMsg('Please fill your credentials')
                  return
                }
                const data = await AuthService.login(username, password)
                dispath(loggedIn({ token: data.jwt, username: username, is_admin: data.is_admin }))
                navigate(-1)
              } catch (err) {
                setPassword('')
                setUsername('')
                if (err.response.status === 404) {
                  setErrorMsg("Invalid credentials")
                } else {
                  alert(err.message)
                }
              }
            }}
            >Login</button>
            :
            <button aria-label='Sign-up' 
            onClick={async () => {
              try {
                if (_.isEmpty(username) || _.isEmpty(password)) {
                  setErrorMsg('Please fill your credentials')
                  return
                }
                const data = await AuthService.register(username, password)  
                dispath(loggedIn({ token: data.jwt, username: username, is_admin: data.is_admin }))
                navigate(-1)
              } catch (err) {
                setErrorMsg(err.message)
                setPassword('')
                setUsername('')
                console.log(err)
              }
            }}
            >Sign-up</button>
          }

          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </div>
    </div>
  )
}
