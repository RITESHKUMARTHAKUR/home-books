import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileImg from "../../images/Profile.jpg";
import { FaPhone } from "react-icons/fa6";
import ProductImg from "../../images/phys_book.jpg";
import ProductBox from "../homeComponent/productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const {setCurrentUser,currentUser} = useAuth();

  const Navigate = useNavigate();

  const logOutUrl = `${process.env.REACT_APP_API_BASE_URL}/logout`;

  const logout = () => {
    fetch(logOutUrl, {
        method: 'POST',
        credentials: 'include'
    }).then(() => {
      setCurrentUser(null);
      Navigate("/");
    })

  }
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
      <div className="containerSecondHeading"> Your favourites </div>
      <hr />
      <div className="favoutatesContainer">
        <ProductBox  off={"40"} img={ProductImg} name={"Simplified Physics"} price={"400"} />
        <ProductBox  off={"40"} img={ProductImg} name={"Simplified Physics"} price={"400"} />
        <ProductBox  off={"40"} img={ProductImg} name={"Simplified Physics"} price={"400"} />
        <ProductBox  off={"40"} img={ProductImg} name={"Simplified Physics"} price={"400"} />
        <ProductBox  off={"40"} img={ProductImg} name={"Simplified Physics"} price={"400"} />
      </div>
     </div>
    </div>
  );
};

export default Profile;
