import React,{useState} from "react"
import {Button,Card,Alert} from "react-bootstrap"
import {useAuth} from "../context/authcontext"
import {useHistory} from "react-router-dom"

export default function Profile() {

    const [error,setError] = useState("") 
    const {currentUser,logout} = useAuth()
    const history = useHistory()
    
    async function handlelogout() {
        setError(" ")
        try {
            await logout()
            history.push("/login")
        }catch {
            setError("Failed to logout.")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error&&<Alert variant="danger">{error}</Alert>}
                    <h4>Welcome Back </h4>{currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handlelogout}>Logout</Button>
            </div>
        </>
    )
}
