import React, { useEffect, useState } from 'react';
import "./Cart.css";
import {toast} from 'react-toastify'
import {useAuth} from '../../contexts/AuthContext';
import CartDetails from './cartDetailsBox/CartDetails';
import PhysBook from "../../images/phys_book.jpg"

const Cart = () => {
  const {currentUser} = useAuth();
  const [cartDoc,setCartDoc] = useState([]);
  const [cartTotal,setCartTotal] = useState(0);

  const getCartUrl = `${process.env.REACT_APP_API_BASE_URL}/getCart/${currentUser.email}`;
  
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
          })
        }else{
          toast.error("No Products Found")
        }

      });
  };

  const getTotal = () => {
    const cartTotal = cartDoc.reduce((accumulator,currentValue) => 
       accumulator+ (currentValue.productDetails.price - currentValue.productDetails.discount), 0
    );

    if(Number.isInteger(cartTotal)){
      return cartTotal+".00";
    }else {
      return cartTotal;
    }
  }
  



  useEffect(() => {
    fetchCart();
  },[])

  return (
    <div className='cartsContainer'>
      {cartDoc.length>0 ? 
        <>
          <div className="cartDetailsContainer">
            {cartDoc.map(cartProd => (
              <CartDetails  
                title={cartProd.productDetails.title} 
                price={cartProd.productDetails.price-cartProd.productDetails.discount} 
                quantity={cartProd.productQuantity} 
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
                  <div className='totalAmount'>&#8377;{getTotal()}</div>
                </div>
            </div>
            <div className="payButtonsContainer">
              <button>Buy Now</button>
              <button>Pay UPI</button>
            </div>
          </div>
        </> : 

        <p>No Data Found</p>
      }
      
    </div>
  )
}

export default Cart