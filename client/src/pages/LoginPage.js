import { useState } from "react"
import {Navigate} from "react-router-dom"

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [redirect, setRedirect] = useState(false);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', // to let browser remember login cookies, need to bypass cors()
                                    // cors() -> index.js updated
        });

        if (response.ok){
            setRedirect(true);
        } else {
            alert ('wrong creds');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                    placeholder="username" 
                    value={username} 
                    onChange={ev => {setUsername(ev.target.value)}}/>
            <input type="text" 
                    placeholder="password"
                    value={password}
                    onChange={ev => {setPassword(ev.target.value)}}/>
            <button>Login</button>
        </form>
    )
}