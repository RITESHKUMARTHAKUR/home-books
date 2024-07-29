import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Menu, House, Package,ShoppingCart ,Headset,Search ,User,UserPlus,LogIn,Truck } from 'lucide-react';
import Logo from '../../images/Logo.png';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import {Link, useParams} from 'react-router-dom';
import { FaUser,FaBorderAll,FaAngleDown } from "react-icons/fa6";
import { IoBag,IoPersonCircle,IoSearchCircle } from "react-icons/io5";
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {
  const [showNav,setShowNav] = useState(false);
  const [searchInput,setSearchInput] = useState("");
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
            <div className={`hamburger`} onClick={toggleNav} >
                {/* <div className={"line line1 "}></div>
                <div className={"line line2 "}></div>
                <div className={"line line3 "}></div> */}
                <Menu size={40} />
            </div>
            <Link to="/" className="logo">
                <img src={Logo} alt="" />
            </Link>

            <div className='mob-searchContainer'>
                
                {
                    window.innerWidth < 993 ?
                        null
                    :
                    <div className="searchInput">
                        <Link to="/search" > 
                            <input type="text" placeholder='Search here...' />
                        </Link>
                    </div>
                }
                    
                

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
                    <div style={{"display": "flex", "alignItems": "center","gap":"14px"}} >
                        {
                            window.innerWidth < 992 && <Link to="/cart" className='usericons nav-flex'><LuShoppingCart /></Link>
                        }
                    
                    <Link to="/profile" className='usericons nav-flex'><IoPersonCircle /></Link>
                    { window.innerWidth < 992 ? null : <p>{currentUser.name}</p>}
                    {/* <button onClick={logout} >Logout</button> */}
                    </div>
                ): (
                    <div className="regBtn">
                        {/* <Link to="/login" > Login </Link> */}
                        <Link to="/signup"> Sign up </Link>
                    </div>
                )
            }
            </div>
           
            

           

        </div>
        <span className={`sidenav-overlay ${showNav ? 'showNavMenu' : 'hideNavMenu'}`} onClick={toggleNav} ></span>
        <div className={`navSection2 ${showNav ? 'showNavMenu' : 'hideNavMenu'}`}>
            {/* <div className="categoriesButton">
                <button> <FaBorderAll /> Categories <FaAngleDown /> </button>
            </div> */}
            <div className="pageLinks">
                {/* {window.innerWidth < 993 ?   <Link to="/search" onClick={toggleNav} >
                    <div className="mobileNavSearch">
                       <Search/> <input type="text" /> 
                    </div>
                </Link> : 
                    null
                } */}
                {
                    window.innerWidth < 992 ? 
                    currentUser !== null ? (
                        <Link to="/profile" onClick={toggleNav}>
                            {/* <CircleUser size="28" /> */}
                            <svg fill="#551A8B" width="30px" height="30px" viewBox="0 0 512.00 512.00" xmlns="http://www.w3.org/2000/svg" stroke="#551A8B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></g></svg>
                            <p className='nav-usericons'>{currentUser.name}</p>
                        </Link>
                        
                        ): (
                            <Link to="/signup" onClick={toggleNav}> <UserPlus/> Sign up </Link>
                      )
                    : null
                }
                <hr className='sidenav-hr' />
                <Link to="/" onClick={toggleNav} >
                   <House  className='sidenav-icons' size="20" /> Home
                </Link>
                {currentUser !== null ?
                    <hr className='sidenav-hr' />
                : null }
                
                {currentUser !== null ? 
                    <>
                        <Link to="/orders" onClick={toggleNav} >
                         <Package className='sidenav-icons' size="20" />  Orders
                        </Link>
                        <Link to="/cart" onClick={toggleNav} >
                         <ShoppingCart className='sidenav-icons' size="20" />  Cart
                        </Link>
                        {
                            window.innerWidth < 992 && 
                            <Link to="/profile" onClick={toggleNav} >
                            <User className='sidenav-icons' size="20" /> Profile
                           </Link>
                        }
                        
                    </>
                    
                : null }
                
                {currentUser !== null ? currentUser.accType === 1 || currentUser.accType === 2 ?
                    <> 
                        <hr className='sidenav-hr' />
                        <Link to="/delivery" onClick={toggleNav} >
                            <Truck className='sidenav-icons' size="20" /> Delivery
                        </Link>
                    </>        
                : null : null }
                <hr className='sidenav-hr' />
                <Link to="/contact-us" onClick={toggleNav} >
                   <Headset className='sidenav-icons' size="20" /> Contact
                </Link>
                
                { window.innerWidth < 992? 
                    <>
                    {currentUser === null ?  <> 
                        <hr className='sidenav-hr' />
                        <Link to="/login" onClick={toggleNav} >
                         <LogIn className='sidenav-icons' size="20"/> Login
                        </Link>
                        {
                            currentUser === null ? null : 
                            <Link to="/signup" onClick={toggleNav} >
                                Signup
                            </Link> 
                            
                        }
                        
                        </>
                     : null }
                    </>
                    : null
                }
                
                
            </div>
        </div>
        <div className="navSection3">

            <div className="mobile-search">
                <input 
                    type="text" 
                    className='mobile-search-input' 
                    value={searchInput}
                    placeholder='search your books/school' 
                    onChange={(e)=> setSearchInput(e.target.value) }
                />
                {/* <IoSearchCircle /> */}
                <Link className='mobile-search-icon' to={`/search/${searchInput}`} >
                    <Search 
                        className='sidenav-icons ' 
                        size="20" 
                    />
                </Link>
                
            </div>
            <button className='upload-booklist'>
                Upload Booklist
            </button>
            {/* <Link to={"/search"} className='nav-searchBtn'>
                
                Search Books<Search className='sidenav-icons' size="20" />
    
            </Link> */}
            
        </div>
        
    </div>
  )
}

export default Navbar