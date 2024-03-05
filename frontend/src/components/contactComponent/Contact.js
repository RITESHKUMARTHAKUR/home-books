import React from "react";
import "./Contact.css";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaArrowRight,
  FaYoutube,
  FaAngleRight,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="contactFirst">
        <h4>Contact Us</h4>
      </div>
      <div className="contactSecond">
        <div className="contactLeft"></div>
        <div className="contactRight">
            <div className="inputGroup">
              <label htmlFor="">Name</label>
              <input type="text" name="" id="" />
            </div>
            <div className="inputGroup">
              <label htmlFor="">Email</label>
              <input type="text"  name="" id="" />
            </div>
            <div className="inputGroup">
              <label htmlFor="">Message</label>
              <textarea name="" id="" cols="30" rows="8"></textarea>
            </div>
            <button>  Submit <span><FaArrowRight /></span> </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
