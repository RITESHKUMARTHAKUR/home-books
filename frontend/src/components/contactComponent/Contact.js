import React, { useState } from "react";
import "./Contact.css";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaArrowRight,
  FaYoutube,
  FaAngleRight,
} from "react-icons/fa6";

const Contact = () => {
  const Navigate = useNavigate();
  const userMessageUrl = `${process.env.REACT_APP_API_BASE_URL}/userMessage`;


  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [userMessage,setUserMessage ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName !== '' && userEmail !== '' && userMessage !== '') {
      const userMessageDoc = await fetch(userMessageUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName,userEmail,userMessage})
      });
      if(userMessageDoc.status === 200){
        toast.success("Message Sent!");
        Navigate("/");
      }
      else {
        toast.error("Cannot Send Message!")
      }

    }
    else {
      toast.error("Please fill in all the fields!")
    }
    

  }

  return (
    <div className="contactContainer">
      <div className="contactFirst">
        <h4>Contact Us</h4>
      </div>
      <div className="contactSecond">
        <div className="contactLeft"></div>

        <form className="contactRight" action="#" onSubmit={handleSubmit} >
            <div className="inputGroup">
              <label htmlFor="">Name</label>
              <input style={{"fontFamily": "monospace"}} value={userName} onChange={(e) => setUserName(e.target.value) } type="text" name="" id="" placeholder="your name" />
            </div>
            <div className="inputGroup">
              <label htmlFor="">Email</label>
              <input onChange={(e) => setUserEmail(e.target.value) } type="text"  name="" id="" placeholder="email" />
            </div>
            <div className="inputGroup">
              <label htmlFor="">Message</label>
              <textarea onChange={(e) => setUserMessage(e.target.value) } name="" id="" cols="30" rows="8" placeholder="type your message here"></textarea>
            </div>
            <button >Submit <span><FaArrowRight /></span> </button>
        </form>
        
      </div>
    </div>
  );
};

export default Contact;
