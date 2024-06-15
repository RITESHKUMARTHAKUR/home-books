import React, { useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [password,setPassword] = useState("");
  const [address,setAddress] = useState("");

  const signupUrl = `${process.env.REACT_APP_API_BASE_URL}/signup`;

  const handleSubmit = async (event) => {
    let acctype = 3;
    event.preventDefault();

    if(name !== '',email !== '',contact !== '',password !== '', address !== ''){
      const userData = {name,email,contact,password, acctype, address};
      const response = await fetch( signupUrl , {
        method: 'POST',
        body : JSON.stringify(userData),
        headers : {'Content-Type': 'application/json'}
      });
      if(response.status  === 200) {
        toast.success("Signup Successful",{
          autoClose: 2000
        });
      }else {
        toast.error("Signup Unsuccessful",{
          autoClose: 2000
        });
      }
    }else {
        toast.error("Please fill all the details!")
    }
    


  }
  return (
    <div className='signupContainer'>
      <h2>Sign Up</h2>
      <form action="#" className='signUpForm' onSubmit={handleSubmit} >
        <input    className='signupInp' type="text"   onChange={(e) => setName (e.target.value)} placeholder='name'/>
        <input    className='signupInp' type="email"  onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
        <input    className='signupInp' type="number" onChange={(e) => setContact(e.target.value)} placeholder='phone no.'/>
        <input    className='signupInp' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
        <textarea className='signupArea'  type="text"   onChange={(e) => setAddress(e.target.value)} placeholder='address' rows={4}/>
        <p className='login-text'>Already have an account ? <b><Link to={"/login"}>Login</Link></b> </p>
        <button className='signUpsubmitBtn' >Submit</button>
      </form>
    </div>
  )
}

export default Signup