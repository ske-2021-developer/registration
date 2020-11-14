import React, {useRef,useState} from "react"
import {Form,Button,Card,Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useAuth} from "../context/authcontext"

export default function Forgotpassword() {
  const emailRef = useRef()
  const {resetpassword} = useAuth()
  const [error,setError] = useState("")
  const [message,setMessage] = useState("")
  const [loading,setLoading] = useState(false)

  async function handlesubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await resetpassword(emailRef.current.value)
      setMessage("Check your Email !!!")
    } catch {
      setError("Wrong Password !!!")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error&&<Alert variant="danger">{error}</Alert>}
          {message&&<Alert variant="success">{message}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="./login">Login ?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="./Profile">Register</Link>
      </div>
    </>
  )
}
