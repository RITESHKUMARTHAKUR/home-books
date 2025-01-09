import React, { useEffect, useState } from 'react';
import OrderBox from "../helpers/orderConfirmation/OrderConfirm";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';



const StationeryPage = () => {
    const {id} = useParams();
    const {currentUser} = useAuth();
    const Navigate = useNavigate();

    const singleStationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/getSingleStationeries/${id}`;
    const addToCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;
    const createOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/createOrder`;

    const [boxVisible,setBoxVisible] = useState(false);
    const [stationeryDoc,setStationeryDoc] = useState({});
    const [userDoc,setUserDoc] =  useState({
        address: "",
        contact: "",
        email:"",
        name:""
    });

    const fetchStationery =  async () => {
        await fetch(singleStationaryUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200 ){
                response.json().then(bookData => {
                    setStationeryDoc(bookData);
                });
            }else{
                toast.error("Book Not Found!")
            }
          
        });
        window.scrollTo(0, 0);
    }

    const handleUserAddressChange = (addValue) => {
        const updatedUserDetails = {...userDoc, address: addValue };
        setUserDoc(updatedUserDetails);
    };

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

    const handleAddToCart = async () => {
        if(currentUser) {
          const cartDoc = await fetch(addToCartUrl,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({bookDetails: stationeryDoc, currentUser})
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

    useEffect(() => {
        fetchStationery();
      },[])
    

    return (
        <div className="productContainer">
            <OrderBox 
            boxVisible={boxVisible}
            userName={userDoc.name} 
            userEmail={userDoc.email} 
            userContact={userDoc.contact}
            userAddress={userDoc.address}  
            userBooks={[stationeryDoc]}
            onUserAddressChange={handleUserAddressChange} 
            cancelBtn={handleCancel} 
            confirmBtn={handleConfirm} 
        
            />
            <div className="productContainerFirst">
                <div className="productImg">
                    <img src={stationeryDoc.stationaryUrl} alt="_book_img" />
                </div>
                <div className="productDesc">
                    <h3>{stationeryDoc.title}</h3>
                    <p>By <b>{stationeryDoc.author}</b> </p>
                    <div className="productDescContainer">
                        <span>
                            <p>Edition</p>
                            <p>{stationeryDoc.edition}</p>
                        </span>
                        <span>
                            <p>Publication Date</p>
                            <p>{stationeryDoc.pubDate}</p>
                        </span>
                        <span>
                            <p>Language</p>
                            <p>{stationeryDoc.language}</p>
                        </span>
                        <span>
                            <p> <b>Price</b></p>
                            <p> &#8377;{stationeryDoc.price - stationeryDoc.discount}</p>
                        </span>
                    </div>
                </div>
            </div>
        
            <div className="productContainerSecond">
                <div className="productBio">
                    {stationeryDoc.bookDesc}
                </div>
                <div className="productButtons">
                    <button onClick={handleAddToCart} >Add to Cart</button>
                    <button onClick={handleBuyNow} >Buy Now</button>
                </div>
            </div>  
        </div>
  )
}

export default StationeryPage