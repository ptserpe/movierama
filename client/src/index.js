import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import store from './store.js'
import { Provider } from 'react-redux'
import Home from './routes/home'
import AuthModal from './routes/authModal'
import NewMovieModal from './routes/newMovieModal'

function App() {
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="auth/:action" element={<AuthModal />} />
          <Route path="movie/new" element={<NewMovieModal />} />
        </Route>
        <Route path="/:userfilter" element={<Home />} />
          <Route path="auth/:action" element={<AuthModal />} />
          <Route path="movie/new" element={<NewMovieModal />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route path="auth/:action" element={<AuthModal />} />
          <Route path="movie/new" element={<NewMovieModal />} />
        </Routes>
      )}
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
