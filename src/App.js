import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import axios from 'axios'
import setting from './setting.json'

import Cookie from 'universal-cookie'
const cookie=new Cookie()

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Registry = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const Auth = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login" element={<Login />} />
          <Route exact path="/register" name="Register" element={<Registry />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

const NoAuth = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Login" element={<Login />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}


class App extends Component {
  render() {
    if (!cookie.get('token') && !cookie.get('type')) {
      return NoAuth()
    } else {

      if (parseInt(cookie.get('type')) > 2) {

        return Auth()
      } else {

        cookie.clear()
        return NoAuth()
      }

    }

  }
}

export default App
