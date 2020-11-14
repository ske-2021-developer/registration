import React from "react"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function Home() {
    return(
        <>
            <Link to="./Login">
                <Button className="w-100 mt-3">Login</Button>
            </Link>
            <div></div>
            <Link to="./Register">
                <Button className="w-100 mt-3">Register</Button>
            </Link>
        </>
    )
}