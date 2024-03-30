import React from 'react';
import "./CartDetails.css"
import { ImCross } from "react-icons/im";
import { FaPlus,FaMinus } from "react-icons/fa6";

const OrdersDetails = (props) => {
  return (
    <div className='cartDetailsBox'>
        <div className='bookImg'>
            <img src={props.img} alt="book_img" />
        </div>
        <div className="bookCartDetails">
            <div className="bookCartPrimary">
                <p>{props.title}</p>
                <button className=""> <ImCross/> </button>
            </div>
            <div className="bookCartSecondary">
                <div className="bookCartPrice">
                    <p>&#8377;{props.price}*{props.quantity}  &nbsp; &nbsp;</p>
                    <p>&#8377;{props.quantity *  props.price}</p>
                </div>
                <div className="bookCartIncrease">
                    <button className=""> <FaPlus/> </button>
                    <button className=""> <FaMinus/> </button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default OrdersDetails