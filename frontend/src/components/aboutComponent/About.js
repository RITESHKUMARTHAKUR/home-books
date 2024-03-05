import React from 'react';
import Logo from "../../images/Logo.png";
import { FaFacebookF,FaInstagram,FaXTwitter,FaYoutube, FaAngleRight } from "react-icons/fa6";

const About = () => {
  return (
    <div>
      <div className="">
        <div className="">
          <img src={Logo} alt="_brand_logo" />
        </div>
        <div className="">
          <p>Tagline Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="footerLinks">
                    <a href=""><FaFacebookF /></a>
                    <a href=""><FaInstagram /></a>
                    <a href=""><FaXTwitter /></a>
                    <a href=""><FaYoutube /></a>
                </div>
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  )
}

export default About