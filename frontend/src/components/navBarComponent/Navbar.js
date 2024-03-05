import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../../images/Logo.png'
import {Link} from 'react-router-dom'
import { FaUser,FaBorderAll,FaAngleDown } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {
  const {setCurrentUser,currentUser} = useAuth();
  const logOutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;
//   useEffect(() => {
//     fetch(profileUrl, {
//         credentials: 'include'
//     }).then(response => {
//         if (response.status === 500 );
//         else {
//             response.json().then((userInfo)=> {
//                 setCurrentUser(userInfo);
//             });
//         }
        
            
//     });
//   }, []);

  const logout = () => {
    fetch(logOutUrl, {
        method: 'POST',
        credentials: 'include'
    });
    setCurrentUser(null)
  }
  
  return (
    <div className='navBarContainer'>
        <div className="navSection1">

            <Link to="/" className="logo">
                <img src={Logo} alt="" />
            </Link>

            <div className="searchInput">
                <input type="text" placeholder='Search and hit enter...' />
            </div>

            {/* {currentUser && (
                <div style={{"display": "flex"}} >
                    <Link to="/profile" className='usericons'><FaUser /></Link>
                    <button onClick={logout} >Logout</button>
                </div>)}
            {!currentUser && (
                <div className="regBtn">
                    <Link to="/login" > Login </Link>
                    <Link to="/signup"> Sign up </Link>
               </div>
            )} */}


            {currentUser !== null ? (
                <div style={{"display": "flex", "alignItems": "center", "gap": "0.5em"}} >
                <Link to="/profile" className='usericons'><FaUser /></Link>
                {/* <button onClick={logout} >Logout</button> */}
                <p>{currentUser.name}</p>
            </div>
            ): (
                <div className="regBtn">
                    <Link to="/login" > Login </Link>
                    <Link to="/signup"> Sign up </Link>
               </div>
            )
            }
           
            

           

        </div>
        <div className="navSection2">
            <div className="categoriesButton">
                <button> <FaBorderAll /> Categories <FaAngleDown /> </button>
            </div>
            <div className="pageLinks">
                <Link to="/" >
                    Home
                </Link>
                <Link to="/orders" >
                    Orders
                </Link>
                <Link to="/cart" >
                    Cart
                </Link>
                <Link to="/contact-us" >
                    Contact
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar