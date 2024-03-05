import React from 'react';
import "./Cart.css";
import CartDetails from './cartDetailsBox/CartDetails';
import PhysBook from "../../images/phys_book.jpg"

const Cart = () => {
  return (
    <div className='cartsContainer'>
        <div className="cartDetailsContainer">
          <CartDetails  title={"NCRT"} price={100} quantity={2} img={PhysBook}/>
          <CartDetails  title={"NCRT"} price={100} quantity={2} img={PhysBook}/>
          <CartDetails  title={"NCRT"} price={100} quantity={2} img={PhysBook}/>
          <CartDetails  title={"NCRT"} price={100} quantity={2} img={PhysBook}/>
          <CartDetails  title={"NCRT"} price={100} quantity={2} img={PhysBook}/>
      </div>
      <div className="cartSummary">
        <div className="cartsTotalContainer">
            <div className="cartName">
              Cart Summary
            </div>
            <hr />
            <div className="cartTotal">
              <div>Total Price :</div>
              <div className='totalAmount'>&#8377;450.00</div>
            </div>
        </div>
        <div className="payButtonsContainer">
          <button>Buy Now</button>
          <button>Pay UPI</button>
        </div>
      </div>
    </div>
  )
}

export default Cart