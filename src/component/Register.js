import React, {useRef,useState} from "react"
import {Form,Button,Card,Alert} from "react-bootstrap"
import {Link,useHistory} from "react-router-dom"
import {useAuth} from "../context/authcontext"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {register} = useAuth()
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const history = useHistory()

  async function handlesubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Confirm-Password is incorrect !!!")
    }

    try {
      setError("")
      setLoading(true)
      await register(emailRef.current.value, passwordRef.current.value)
      history.push("/login")
    } catch {
      setError("Failed to register !!!")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="./Login">Login</Link>
      </div>
    </>
  )
}
