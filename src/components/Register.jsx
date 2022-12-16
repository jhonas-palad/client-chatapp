import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8000/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            })
            console.log(await response.json());
            navigate('/login');
        }
        catch(err){
            if(err?.response.status === 401){
                setErrMsg(err.response.details);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <p>{errMsg}</p>
            <label>
                Name: 
                <input 
                    type="text" 
                    name="name"
                    onChange={(e)=> setName(e.target.value)} 
                    value={name}
                />
            </label>
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
                    name="password"
                    onChange={(e)=> setPassword(e.target.value)} 
                    value={password}
                />
            </label>
            <button>Login</button>
        </form>
    )
}

export default Register;