import React from 'react';
import "./OrderCard.css";
import {Link} from 'react-router-dom'

const OrderCard = (props) => {
  const orderStatus = props.orderStatus;


  const getOrderStatus = () => {
    const orderCodes = ["Pending","Processing","Delivered"];
    return orderCodes[orderStatus-1];
  }

  const getOrderStatusColor = () => {
    switch (orderStatus) {
      case 1:
          return "gray"; // Set color for pending status
      case 2:
          return "orange"; // Set color for processing status
      case 3:
          return "green"; // Set color for delivered status
      default:
          return "black"; // Set default color
    }
  }
  // const handleDownload = () => {
  //   props.pdfDownload();
  // }
 
  return (
    <Link to={props.link} className="orderContainerBox">
        <div className='orderContainerBoxHeader'>
          <p className='orderId'> Order: #<span >{props.orderId}</span> </p>
          <p>Status: <span style={{"color": `${getOrderStatusColor()}`,"fontWeight": "bold"}}  >{getOrderStatus()}</span> </p>
        </div>
        <div className="orderContainer">
            <div className="orderImgContainer"> 
              <img src={props.orderImg} alt="" />
            </div>
            <div className="orderDetailsContainer">
                <div>
                    <p>{props.title}</p>
                    <p>{props.phno} &#x2022; {props.email} </p>
                    {/* <p>{props.addr}</p> */}
                    <p>{props.date}</p>
                    <p>Items: {props.items}</p>
                    <p>Total: &#8377; {props.pay}</p>
                </div>
                
                {/* <button onClick={() => handleDownload() }>Download Bill</button> */}
            </div>
        </div>
    </Link>
  )
}

export default OrderCard