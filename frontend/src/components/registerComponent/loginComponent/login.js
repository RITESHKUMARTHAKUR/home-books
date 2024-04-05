import React, { useState } from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom"
import "./login.css";
import { useAuth } from '../../../contexts/AuthContext';

const Login = () => {
    const {setCurrentUser} = useAuth();
    const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/login`;
    const [email,setEmail] = useState("");
    const Navigate = useNavigate();
    const [password,setPassword] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const loginData = {email,password} ;
      const loginDoc = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {"Content-Type" : "application/json"},
        credentials: 'include'
      })

      if(loginDoc.status === 200){
        toast.success("Login Successful!", {
          autoClose: 2000
        });

        loginDoc.json().then((userInfo) => {
          setCurrentUser(userInfo)
        })
        Navigate("/");
      }else {
        const msg = await loginDoc.json()
        toast.error(msg);
      }
    }
  return (
    <div className='loginContainer'>
        <h2>Login</h2>
        <form action="#" className='loginForm' onSubmit={handleSubmit} >
            <input className='loginInp' type="text" onChange={ (e)=> setEmail(e.target.value) } placeholder='email'/>
            <input className='loginInp' type="password" onChange={ (e)=> setPassword(e.target.value) } placeholder='password'/>
            <button className='loginBtn'>Login</button>
        </form>
    </div>
  )
}

export default Login