import React, { useEffect, useState } from 'react';
import "./SingleOrder.css";
import { FaCircle } from "react-icons/fa6";
import bookImg from "../../../images/phys_book.jpg";
import SingleOrderCard from './SingleOrderProductCard/SingleOrderCard';
import { useParams } from 'react-router-dom';

const SingleOrder = () => {
  const { orderId } = useParams();
  const getSingleOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/getOrder/${orderId}`;
  const [showState,setShowState] = useState(false);
  const [orderData,setOrderData] = useState({});
  const [orderProducts,setOrderProducts] = useState([]);

  const getDeliveryColor = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "statusPending";
      case 2:
        return "statusProcessing";
      case 3:
        return "statusDelivered";
    
      default:
        break;
    }
  }
  const getDeliveryStatus = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "Pending";
      case 2:
        return "Processing";
      case 3:
        return "Delivered";
    
      default:
        break;
    }
  }

  const getSingleOrder = async () => {
    await fetch(getSingleOrderUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        response.json().then(orderDoc => {
          setOrderData(orderDoc);

          const {orderProducts} = orderDoc ;
          setOrderProducts(orderProducts);
        })
    });
  };

  useEffect(() => {
    getSingleOrder();
  },[]);

  return (
    <div className='singleOrderContainer' >
      <div className='singleOrderDivHeader'>
        <div>
          Order: {orderData._id}
        </div>
        <div>
          <button className='singleOrderInvoice'  >Invoice</button>
          <button className='singleOrderDownload' >Download</button>
        </div>
      </div>
      <div className="singleOrderDivBody">
        <div className='singleOrderDivBodyContainer' >
          <div className="singleOrderNav">
            <div className="singleNavBtn">
              <button className={`singleOrderSummaryBtn ${showState ? 'singleOrderBorderNone' : 'singleOrderBorderBottom'} `} onClick={() => setShowState(!showState) } >Summary</button>
              <button className={`singleOrderDeliveryBtn ${showState ? 'singleOrderBorderBottom' : 'singleOrderBorderNone'}`} onClick={() => setShowState(!showState) } >Delivery</button>
            </div>
            <hr />
            <div className='showSection'>
              { showState ? 
                <div className='showSectionDelivery'>
                  <div className={`showDelivery ${getDeliveryColor(orderData.orderStatus)}`}>
                    Order Status: {getDeliveryStatus(orderData.orderStatus)}  <span className="deliveryCircle"> <FaCircle /></span>
                  </div>
                </div> :
                <div> 
                  {
                    orderProducts && orderProducts.map(orderProduct => (
                      <SingleOrderCard 
                      productTitle={orderProduct.title} 
                      productType={orderProduct.elementType} 
                      productPrice={orderProduct.price} 
                      productImg={orderProduct.bookImg}
                      productCount={orderProduct.bookQuantity} 
                      />
                    ))
                  }
                  
                  
                 
                </div>
              }
            </div>
            <div className="singleOrderTotalContainer">
              <div className="singleOrderTotalDiv">
                <div className="singleOrderTotal">
                  <h5>SubTotal</h5>
                  <h5>&#8377; {Number.isInteger(orderData.orderTotal) ?  orderData.orderTotal + ".00" : orderData.orderTotal }</h5>
                </div>
                <hr />
                <div className="singleOrderTotal">
                  <h5>Shipping</h5>
                  <h5>&#8377;0.00</h5>
                </div>
               
              </div>
              
              <div className="singleOrderTotal singleOrderSum">
                <h5>Total</h5>
                <h5>&#8377; {Number.isInteger(orderData.orderTotal) ?  orderData.orderTotal + ".00" : orderData.orderTotal } </h5>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrder