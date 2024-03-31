import React, { useEffect, useState } from 'react';
import "./Product.css";
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import OrderBox from '../helpers/orderConfirmation/OrderConfirm';

const Product = () => {
  const {id} = useParams();
  const {currentUser} = useAuth();
  const Navigate = useNavigate();

  const singleBookUrl = `${process.env.REACT_APP_API_BASE_URL}/getSingleBook/${id}`;
  const addToCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;
  const createOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/createOrder`;

  const [boxVisible,setBoxVisible] = useState(false);
  const [bookDoc,setBookDoc] = useState({});
  const [userDoc,setUserDoc] =  useState({
    address: "",
    contact: "",
    email:"",
    name:""
  });

  const fetchBook =  async () => {
    await fetch(singleBookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
        if(response.status === 200 ){
          response.json().then(bookData => {
            setBookDoc(bookData);
          });
        }else{
          toast.error("Book Not Found!")
        }
          
    })
  }

  const handleAddToCart = async () => {
    if(currentUser) {
      const cartDoc = await fetch(addToCartUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookDetails: bookDoc, currentUser})
      });
      if(cartDoc.status === 200 ){
        toast.success("Added to Cart!");
      }else {
        toast.error("Failed to add!");
      }


    }else {
        Navigate('/login');
    }
    
  } 
  const handleBuyNow = () => {
    if(currentUser) {
      setUserDoc(currentUser);
      setBoxVisible(!boxVisible);
    }else {
      Navigate("/login")
    }
  }

  const handleCancel = () => {
    setBoxVisible(!boxVisible)
  }

  const handleConfirm = async (selectedArray,orderTotal) => {
    const orderResponse = await fetch(createOrderUrl, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userDoc,selectedArray,orderTotal}) 
    });

    if(orderResponse.status === 200 ){
      toast.success("Order Created!");
      Navigate("/orders");
      
    }else {
      toast.error("Failed to Create Order!");
    }
  
  }




  const handleUserAddressChange = (addValue) => {
    const updatedUserDetails = {...userDoc, address: addValue };
    setUserDoc(updatedUserDetails);
  };

  useEffect(() => {
    fetchBook();
  },[])

  return (
    <div className="productContainer">
      <OrderBox 
        boxVisible={boxVisible}
        userName={userDoc.name} 
        userEmail={userDoc.email} 
        userContact={userDoc.contact}
        userAddress={userDoc.address}  
        userBooks={[bookDoc]}
        onUserAddressChange={handleUserAddressChange} 
        cancelBtn={handleCancel} 
        confirmBtn={handleConfirm} 

      />
      <div className="productContainerFirst">
        <div className="productImg">
          <img src={bookDoc.bookImg} alt="_book_img" />
        </div>
        <div className="productDesc">
          <h3>{bookDoc.title}</h3>
          <p>By <b>{bookDoc.author}</b> </p>
          <div className="productDescContainer">
            <span>
              <p>Edition</p>
              <p>{bookDoc.edition}</p>
            </span>
            <span>
              <p>Publication Date</p>
              <p>{bookDoc.pubDate}</p>
            </span>
            <span>
              <p>Language</p>
              <p>{bookDoc.language}</p>
            </span>
            <span>
              <p> <b>Price</b></p>
              <p> &#8377;{bookDoc.price - bookDoc.discount}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="productContainerSecond">
          <div className="productBio">
            {bookDoc.bookDesc}
          </div>
          <div className="productButtons">
            <button onClick={handleAddToCart} >Add to Cart</button>
            <button onClick={handleBuyNow} >Buy Now</button>
          </div>
      </div>  
    </div>
  )
}

export default Product