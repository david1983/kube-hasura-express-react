import React, {useState} from "react";
import {Input, Button, Label} from "reactstrap"
import Api from "../services/api"

export const Login = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setErr] = useState("")

    return <div style={{alignItems: "center", display: "flex", flexDirection: "column"}}>
    <h2>Login</h2>
    <div style={{width: "300px"}}>
        <Label>Email</Label>
        <Input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/><br/>
        <Label>Password</Label>
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        <hr/>
        <Button color="primary" onClick={async () => {
            try{
                const {data} = await Api.post("/login", {
                    email: username,
                    pass: password
                })
                console.log(data)
            }catch(e){
                alert(e.message)
            }
            
        }}>Login</Button>
    </div>
</div>
} 