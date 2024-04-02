import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import "./ViewMessages.css";


const ViewMessages = () => {
    const getAllMessages = `${process.env.REACT_APP_API_BASE_URL}/getAllMessage`;
    const [messages,setMessages] = useState([]);

    const fetchAllMessages = async () => {
        const messagesDoc = await fetch(getAllMessages,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if(messagesDoc.status === 200) {
            messagesDoc.json().then(responseDoc => {
                setMessages(responseDoc);
            })
        }else {
            toast.error("Error in loading messages!");
        }
    }

    const getDate = (orderDate) => {
        const date = new Date(orderDate);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        // Get day, month, and year from the date object
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        const year = date.getFullYear().toString(); // Get last two digits of the year
    
        // Concatenate day, month, and year to form ddmmyy format
        const formattedDate = day + " " + months[month-1] + " " + year;
        return(formattedDate);
    }

    useEffect(() => {
        fetchAllMessages();
    },[])


  return (
    <div className='userMessageContainer'>
        {messages.length>0?
            <>
                {messages.map(userMessage => (
                    <div className='viewMessageContainer'>
                        <div className="viewMessageHeader">
                            <h5>{userMessage.userEmail}</h5>
                            <h5>{getDate(userMessage.createdAt)}</h5>
                        </div>
                        <div className="viewMessageBody">
                            <h5>{userMessage.userName}</h5>
                            <h5>{userMessage.userMessage}</h5>
                        </div>
                    </div>
                ))}
            </>
            

         : "No Message here!" }
    </div>
  )
}

export default ViewMessages