import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8000/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            console.log(await response.json());
            navigate('/chat');
        }
        catch(err){
            console.log(err);
            if(err?.response.status === 401){
                setErrMsg(err.response.details);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p>{errMsg}</p>
            <label>
                Username: 
                <input 
                    type="text" 
                    name="username"
                    onChange={(e)=> setUsername(e.target.value)} 
                    value={username}
                />
            </label>
            <label>
                Password: 
                <input 
                    type="password" 
                    name="username"
                    onChange={(e)=> setPassword(e.target.value)} 
                    value={password}
                />
            </label>
            <button>Login</button>
        </form>
    )
}

export default Login;