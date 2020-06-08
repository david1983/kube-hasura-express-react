import React, { useState } from "react";
import { Input, Button, Label } from "reactstrap"
import { useLocation, useHistory } from "react-router-dom"
import Api from "../services/api"

export const Signin = props => {
    console.log(props)
    const location = useLocation();
    const history = useHistory();
    console.log(location)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setErr] = useState("")

    return <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <h2>Signin</h2>
        {error == "" && <div style={{ width: "300px" }}>
            <Label>Email</Label>
            <Input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
            <Label>Password</Label>
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
            <hr />
            <Button color="primary" onClick={async () => {
                if (password != confirm) return alert("error")
                try {
                    Api.post('/signin', {
                        "email": username,
                        "pass": password
                    })
                    history.push("/login")
                } catch (e) {
                    setErr(e.message)
                }

            }}>Signin</Button>
        </div>}
        {error!="" && <div>{error}</div>}
    </div>
}