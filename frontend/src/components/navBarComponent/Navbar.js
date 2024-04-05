import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../../images/Logo.png';
import { FaMagnifyingGlass } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { FaUser,FaBorderAll,FaAngleDown } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {
  const [showNav,setShowNav] = useState(false);
  const [hamburgerIndex,setHamburgerIndex] = useState(false);
  const {setCurrentUser,currentUser} = useAuth();
  const logOutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;
  const revoleUrl = `${process.env.REACT_APP_API_BASE_URL}/`;

  useEffect(() => {
    fetch(revoleUrl, {
        credentials: 'include'
    });
  }, []);

  const toggleNav = () => {
    // const navStatus = !showNav;
    // if(navStatus) {

    // }
    setHamburgerIndex(!hamburgerIndex);
    setShowNav(!showNav);
  }



  const logout = () => {
    fetch(logOutUrl, {
        method: 'POST',
        credentials: 'include'
    });
    setCurrentUser(null)
  };
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
  
  return (
    <div className='navBarContainer'>
        <div className="navSection1">
            <div className={`hamburger ${hamburgerIndex ? 'hamburgerZindex' : ''}`} onClick={toggleNav} >
                <div className={"line line1 "}></div>
                <div className={"line line2 "}></div>
                <div className={"line line3 "}></div>
            </div>
            <Link to="/" className="logo">
                <img src={Logo} alt="" />
            </Link>

            <div className='searchContainer'>
                <div className="searchInput">
                    {
                        window.innerWidth < 993 ?
                            null
                        :
                        <input type="text" placeholder='Search and hit enter...' />
                    }
                    
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
                { window.innerWidth < 992 ? null : <p>{currentUser.name}</p>}
                </div>
            ): (
                <div className="regBtn">
                    <Link to="/login" > Login </Link>
                    <Link to="/signup"> Sign up </Link>
               </div>
            )
            }
            </div>
           
            

           

        </div>
        <div className={`navSection2 ${showNav ? 'showNavMenu' : 'hideNavMenu'}`}>
            {/* <div className="categoriesButton">
                <button> <FaBorderAll /> Categories <FaAngleDown /> </button>
            </div> */}
            <div className="pageLinks">
                <Link to="/" onClick={toggleNav} >
                    Home
                </Link>
                {currentUser !== null ? 
                    <>
                        <Link to="/orders" onClick={toggleNav} >
                            Orders
                        </Link>
                        <Link to="/cart" onClick={toggleNav} >
                            Cart
                        </Link>
                    </>
                    
                : null }
                
                <Link to="/contact-us" onClick={toggleNav} >
                    Contact
                </Link>
                { window.innerWidth < 992? 
                    <>
                    {currentUser === null ?  <> 
                    <Link to="/login" onClick={toggleNav} >
                    Login
                </Link>
                <Link to="/signup" onClick={toggleNav} >
                    Signup
                </Link> </>
                     : null }
                    </>
                    : null
                }
                
                
            </div>
        </div>
        
    </div>
  )
}

export default Navbar