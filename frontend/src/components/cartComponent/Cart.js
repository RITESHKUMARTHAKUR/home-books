import React, { useEffect, useState } from 'react';
import "./Cart.css";
import {toast} from 'react-toastify'
import {useAuth} from '../../contexts/AuthContext';
import CartConfirmBox from '../helpers/cartConfirmation/CartConfirm';
import CartDetails from './cartDetailsBox/CartDetails';
import PhysBook from "../../images/phys_book.jpg"
import { BiSolidHandLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {currentUser} = useAuth();
  const Navigate = useNavigate();

  const [cartDoc,setCartDoc] = useState([]);
  const [cartTotalNum,setCartTotal] = useState(0);
  const [boxVisible,setBoxVisible] = useState(false);
  

  const getCartUrl = `${process.env.REACT_APP_API_BASE_URL}/getCart/${currentUser.email}`;
  const createCartOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/createCartOrder`;
  const deleteItemUrl = `${process.env.REACT_APP_API_BASE_URL}/removeCart`;


  const[userDoc,setUserDoc] = useState({
    address: "",
    contact: "",
    email:"",
    name:""
  });

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
          }).then(() => {
            getTotal();
          })
        }else{
          toast.error("No Products Found")
        }

      });
  };

  const getTotal = () => {
    const cartTotal = cartDoc.reduce((accumulator,currentValue) => 
       accumulator+((currentValue.productDetails.price - currentValue.productDetails.discount)*currentValue.productQuantity), 0
    );

    if(Number.isInteger(cartTotal)){
      // return cartTotal+".00";
      setCartTotal(cartTotal);
    }else {
      setCartTotal(cartTotal);
    }
  }
  const handladd = (productID) => {
    const prodIndex = cartDoc.findIndex(obj => obj._id === productID );
    if(prodIndex !== -1 ){
      const updatedArray = [...cartDoc];
      updatedArray[prodIndex].productQuantity += 1;
      setCartDoc(updatedArray);
  
    }
    
  
  }
  const handlSub = (productID) => {
    const prodIndex = cartDoc.findIndex(obj => obj._id === productID );
    if(prodIndex !== -1 ){

      const updatedArray = [...cartDoc];
      if(updatedArray[prodIndex].productQuantity > 0 ){
        updatedArray[prodIndex].productQuantity -= 1;
        setCartDoc(updatedArray);
      }

    }
    else{
      setCartDoc(cartDoc);
    }
  
  }
  const handleRemove = async (productID) => {
    try {
      const deleteReq =  await fetch(deleteItemUrl,{
        method: "DELETE",
        headers : {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({productID,currentUser})
      });
     
      if(deleteReq.status === 200 ){
        toast.success("Product Removed", {
          autoClose: 2000
        });
        fetchCart();
      }
      // setValues(values.filter((todo) => todo._id !== id));
    } catch (error) {
      alert(error);
    }
  }

  const handleUserAddressChange = (addValue) => {
    const updatedUserDetails = {...userDoc, address: addValue };
    setUserDoc(updatedUserDetails);
  };
  const handleCancel = () => {
    setBoxVisible(!boxVisible)
  }
  const handleConfirm = async () => {
    const selectedProducts = cartDoc.map( obj => obj.productDetails );
    const cartOrderResponse = await fetch(createCartOrderUrl,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userDoc,selectedProducts,cartTotalNum})
    });

    if(cartOrderResponse.status === 200 ){
      toast.success("Order Created!");
      Navigate("/orders");
      
    }else {
      toast.error("Failed to Create Order!")
    }
    
  }

  const handleBuyNow = () => { 
    if(currentUser){
      setUserDoc(currentUser);
      setBoxVisible(!boxVisible);
    }else{
      Navigate("/login");
    }
  }

  useEffect(() => {
    getTotal();
  },[cartDoc])

  useEffect(() => {
    fetchCart();
  },[])

  return (
    <div className='cartsContainer'>
      <CartConfirmBox
        boxVisible={boxVisible}
        userName={currentUser.name}
        userEmail={currentUser.email}
        userContact={currentUser.contact}
        userAddress={currentUser.address}
        onUserAddressChange={handleUserAddressChange}
        userBooks={cartDoc}
        orderTotal={cartTotalNum}
        cancelBtn={handleCancel} 
        confirmBtn={handleConfirm} 
      />

      {cartDoc.length>0 ? 
        <>
          <div className="cartDetailsContainer">
            {cartDoc.map(cartProd => (
              <CartDetails  
                title={cartProd.productDetails.title} 
                price={cartProd.productDetails.price-cartProd.productDetails.discount} 
                quantity={cartProd.productQuantity}
                pID={cartProd._id}
                increaseFun={handladd}
                decreaseFun={handlSub}
                removeFun={handleRemove}
                img={cartProd.productDetails.bookImg}
              />
            ))}
            
          </div>
          <div className="cartSummary">
            <div className="cartsTotalContainer">
                <div className="cartName">
                  Cart Summary
                </div>
                <hr />
                <div className="cartTotal">
                  <div>Total Price :</div>
                  <div className='totalAmount'>&#8377;{cartTotalNum}</div>
                </div>
            </div>
            <div className="payButtonsContainer">
              <button onClick={handleBuyNow} >Buy Now</button>
              {/* <button >Pay UPI</button> */}
            </div>
          </div>
        </> : 

        <p>No Data Found</p>
      }
      
    </div>
  )
}

export default Cart