import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import setting from '../../../setting.json'
import Fetch from 'src/fetch'


const Login = () => {
  const [alert, setAlert] = useState({ title: '', status: false })

  const navigate = useNavigate();

  const LoginFunc = async (e) => {
    e.preventDefault()
    let body = {}
    for (let i in e.target.elements) {
      body[e.target.elements[i].name] = e.target.elements[i].value
    }
    let result = await axios.post(`${setting.IP}/user/login`, body)
      .catch((err) => {
        setAlert({
          title: err.response.data.msg,
          status: true
        })
      })


    if (!!result) {
      localStorage.setItem("img", result.data.image);
      localStorage.setItem("nick", result.data.nick);
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('type', result.data.type)
    }
    if (localStorage.type > 2) {
      navigate('/')
      document.location.reload()
    } else {
      setAlert({
        title: 'You are not admin',
        status: true
      })
    }



  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow  className="justify-content-center">
          <CCol  md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) =>
                    LoginFunc(e)
                  }>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" name='email' autoComplete="email" />

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
                <CAlert visible={alert.status} color="danger">{alert.title}</CAlert>
              </CCard>

              {/* <CCard className="text-white bg-primary p-4" >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
