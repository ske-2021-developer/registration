import React from 'react'
import Register from './Register'
import Profile from './Profile'
import Login from './Login'
import Private from './Private'
import Forgotpassword from './Forgotpassword.js'
import {Container} from 'react-bootstrap';
import {AuthProvider} from '../context/authcontext'
import {BrowserRouter,Switch,Route}from "react-router-dom"

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center"
        style = {{minHeight:"100vh"}}   
      >
          <div className="w-100" style={{maxWidth:"450px"}}>
            <BrowserRouter>
              <AuthProvider>
                <Switch>
                  <Private path="/Profile" component={Profile}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/forgot-password" component={Forgotpassword}/>
                </Switch>
              </AuthProvider>
            </BrowserRouter>
           </div>
      </Container>
  )
}

export default App
