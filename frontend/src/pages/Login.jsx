import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name, value);
        const copyloginInfo = {...loginInfo}
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }

    console.log('login info ->', loginInfo);

    const handleLogin = async (e) =>{
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password) {
            return handleError('All filed are is require')
        }

        try {
            const url = "https://login-registration-mern-api.vercel.app/auth/login";
            const response = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })

            const result =await response.json();
            const {success, message,jwtToken, name, error} = result;
            if(success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInuser', name)
                setTimeout(()=> {
                    navigate("/home")
                }, 1000)
            } else if(error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if(!success) {
                handleError(message)
            }
            console.log(result);
        } catch (err) {
            handleError(err)
        }
    }

  return (
    <div className='container'>
        <h1>Login</h1>
        <form action="" onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                onChange={handleChange} 
                type="email" 
                name='email' 
                placeholder='Enter your email..'
                value={loginInfo.email}/>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input 
                onChange={handleChange} 
                type="password" 
                name='password' 
                placeholder='Enter your password..'
                value={loginInfo.password}/>
            </div>

            <button>Login</button>
            <span>Does' t have an account ?
                <Link to='/signup'>Signup</Link>
            </span>
        </form>

        <ToastContainer></ToastContainer>
    </div>
  )
}

export default Login