import React from 'react';
import "./OrderCard.css";

const OrderCard = (props) => {
  return (
    <div className="orderContainerBox">
        <p className='orderId'> Order: <span >{props.orderId}</span> </p>
        <div className="orderContainer">
            <div className="orderImgContainer"> <img src={props.orderImg} alt="" /></div>
            <div className="orderDetailsContainer">
                <div>
                    <p>{props.title}</p>
                    <p>{props.date}</p>
                    <p>Items: {props.items}</p>
                    <p>Total: &#8377; {props.pay}</p>
                </div>
                
                <button>Download Bill</button>
            </div>
        </div>
    </div>
  )
}

export default OrderCard