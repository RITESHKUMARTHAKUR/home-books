import React, { useEffect, useState } from "react";
import "./Profile.css";
import {toast} from 'react-toastify';
import ProfileImg from "../../images/Profile.jpg";
import { FaPhone } from "react-icons/fa6";
import ProductImg from "../../images/phys_book.jpg";
import ProductBox from "../homeComponent/productCard2/ProductCard2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const Profile = () => {
  const {setCurrentUser,currentUser} = useAuth();

  const Navigate = useNavigate();

  const getCartUrl = `${process.env.REACT_APP_API_BASE_URL}/getCart/${currentUser.email}`;
  const logOutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;
  const [cartDoc,setCartDoc] = useState([]);

  const logout = () => {
    fetch(logOutUrl, {
        method: 'POST',
        credentials: 'include'
    }).then(() => {
      setCurrentUser(null);
      Navigate("/");
    })
  }

  const fetchCart = async () => {

    await fetch(getCartUrl,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {

        if(response.status === 200 ){
          response.json().then(cartData => {
            setCartDoc(cartData);
          });

        }else{
          toast.error("No Products Found")
        }

      });
  };
  
  useEffect(() => {
    fetchCart();
  },[]);



  return (
    <div className="profileContainer">
      <div className="profileContainerFirst">
        <img className="profileImg" src={ProfileImg} alt="" />
        <div className="profileContent">
          <h3>{currentUser.name}</h3>
          <p>{currentUser.address}</p>
          <p>
            {" "}
            <FaPhone /> &nbsp; {currentUser.contact}{" "}
          </p>
          <div className="profileBtnDiv">
            <button  className="profileBtns" >Edit Profile</button>
            <button  className="profileBtns" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
     <div className="profileContainerSecond">
      <div className="containerSecondHeading"> Your Cart Items </div>
      <hr />
      <div className="favoutatesContainer">
        {cartDoc.length>0 ? 
          <>
            {cartDoc.map(cartData => (
              <ProductBox  
                link={'/cart'}
                off={"25"} 
                img={cartData.productDetails.bookImg} 
                name={cartData.productDetails.title} 
                price={cartData.productDetails.price} 
                discount={cartData.productDetails.discount}
                isProfile={true}
              />
            ))}
          </>
        : 
          <p>No items in your cart.</p>
        }
        
       
      </div>
     </div>
    </div>
  );
};

export default Profile;
