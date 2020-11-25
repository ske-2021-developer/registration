import React, {useRef,useState} from "react"
import {Form,Button,Card,Alert} from "react-bootstrap"
import {Link,useHistory} from "react-router-dom"
import {useAuth} from "../context/authcontext"
import GoogleButton from 'react-google-button'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login,logingoogle} = useAuth()
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const history = useHistory()

  async function handlesubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/Profile")
    } catch {
      setError("Wrong Password !!!")
    }
    setLoading(false)
  }

  async function handlesubmitgoogle(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await logingoogle()
      history.push("/Profile")
    } catch {
      setError("Wrong Password !!!")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body className="bg-light">
          <h2 className="text-center mb-4">Login</h2>
          {error&&<Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
             OR
          </div>
          <GoogleButton className="w-100 mt-3"
              onClick={handlesubmitgoogle}      
          />
          <div className="w-100 text-center mt-3" type="dark">
            <Link to="./forgot-password">Forget Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="./Register">Register</Link>
      </div>
    </>
  )
}
