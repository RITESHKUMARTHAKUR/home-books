import React from 'react';
import logo from "../../images/Logo.png";
import "./footer.css";
import {Link} from "react-router-dom"
import { FaFacebookF,FaInstagram,FaXTwitter,FaYoutube, FaAngleRight } from "react-icons/fa6";

const footer = () => {
  return (
    <div className='footerContainer'>
        <div className="innerFooterContainer">
            <div className="footerSectionFirst">
                <div className="firstSection">
                    <img src={logo} alt="_homeBooks_logo" />
                    <div className="footerLinks">
                        <a href=""><FaFacebookF /></a>
                        <a href="https://www.instagram.com/homebooks.in/"><FaInstagram /></a>
                        <a href=""><FaXTwitter /></a>
                        {/* <a href=""><FaYoutube /></a> */}
                    </div>
                </div>
            
            </div>
            
        <div className="footerSectionSecond">
            <h2 className='footerMargin'>About Us</h2>
            <div className="secondSectionLinks">
                <Link to="/cart"> <FaAngleRight /> Careers</Link>
                <Link to="/cart"> <FaAngleRight /> Our Stores</Link>
                <Link to="/cart"> <FaAngleRight /> Terms & Conditions</Link>
                <Link to="/cart"> <FaAngleRight /> Privacy and Policy </Link>
            </div>
        </div>
        <div className="footerSectionThird">
            <h2 className='footerMargin'>Customer Care</h2>
            <div className="thirdSectionLinks">
                <Link to="/cart"> <FaAngleRight /> Help Center</Link>
                <Link to="/cart"> <FaAngleRight /> How To Buy</Link>
                <Link to="/cart"> <FaAngleRight /> Track Your  Order </Link>
                <Link to="/cart"> <FaAngleRight /> Returns & Refunds</Link>
            </div>
        </div>
        <div className="footerSectionFourth">
            <h2 className='footerMargin'>Contact Us</h2>
            <div className="fourthSectionLinks">
                <div>Saraswati Nagar, Near Bhilai Institute of Technology Durg </div>
                <p><b>Email</b> : homebooks@gmail.com</p>
                <p> <b>Phone</b> : +91 74009 44407 </p>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default footer