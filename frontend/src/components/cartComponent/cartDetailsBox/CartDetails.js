import React from 'react';
import "./CartDetails.css"
import { ImCross } from "react-icons/im";
import { FaPlus,FaMinus } from "react-icons/fa6";

const OrdersDetails = (props) => {
    const handleIncrease = () => {
        props.increaseFun(props.pID);
    }
    const handleDecrease = () => {
        props.decreaseFun(props.pID);
    }
    const handleRemoveFunction = () => {
        props.removeFun(props.pID);
    }

  return (
    <div className='cartDetailsBox'>
        <div className='bookImg'>
            <img src={props.img} alt="book_img" />
        </div>
        <div className="bookCartDetails">
            <div className="bookCartPrimary">
                <p>{props.title}</p>
                <button onClick={handleRemoveFunction}  className=""> <ImCross/> </button>
            </div>
            <div className="bookCartSecondary">
                <div className="bookCartPrice">
                    <p><span style={{textDecoration:"line-through",color:"gray"}}>&#8377;{props.price}</span> &#8377;{props.price-props.discount}*{props.quantity}  &nbsp; &nbsp;</p>
                    <p>  &#8377;{(props.price-props.discount)*props.quantity}</p>
                </div>
                <div className="bookCartIncrease">
                    <button onClick={handleIncrease} className="bookCartIncrease-btn"> <FaPlus/> </button>
                    <button onClick={handleDecrease} className="bookCartIncrease-btn"> <FaMinus/> </button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default OrdersDetails