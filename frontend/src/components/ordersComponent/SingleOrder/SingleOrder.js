import React, { useEffect, useState } from 'react';
import "./SingleOrder.css";
import { FaCircle } from "react-icons/fa6";
import {useAuth} from '../../../contexts/AuthContext';
import bookImg from "../../../images/phys_book.jpg";
import {toast} from 'react-toastify';
import SingleOrderCard from './SingleOrderProductCard/SingleOrderCard';
import { useParams } from 'react-router-dom';

const SingleOrder = () => {
  const { orderId } = useParams();
  const {currentUser} = useAuth();

  const getSingleOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/getOrder/${orderId}`;
  const updateOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/updateOrder/${orderId}`;


  const [showState,setShowState] = useState(false);
  const [orderData,setOrderData] = useState({});
  const [orderStatusValue,setOrderStatusValue] = useState("Pending");
  const [orderStatusColorValue,setOrderStatusColorValue] = useState("statusPending");
  const [newStatus,setNewStatus] = useState(1);
  const [orderProducts,setOrderProducts] = useState([]);

  const getDeliveryColor = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        setOrderStatusColorValue("statusPending");
        break;
      case 2:
        setOrderStatusColorValue("statusProcessing");
        break;
      case 3:
        setOrderStatusColorValue("statusDelivered");
        break;
    
      default:
        break;
    }
  }

  const getDeliveryStatus = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        setOrderStatusValue("Pending");
        break;
      case 2:
        setOrderStatusValue("Processing");
        break;
      case 3:
        setOrderStatusValue("Delivered");
        break;
    
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
          getDeliveryStatus(orderDoc.orderStatus);
          getDeliveryColor(orderDoc.orderStatus);

          const {orderProducts} = orderDoc ;
          setOrderProducts(orderProducts);

        })
    });
  };
  const handleStatusChange = (e) => {
    setNewStatus(Number(e.target.value));
  }
  const handleStatusSave = async () => {
    try {
      const response = await fetch(updateOrderUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateFieldValue: newStatus }),
      });

      if(response.status === 200 ){
        getDeliveryStatus(newStatus);  
        getDeliveryColor(newStatus);
        toast.success("Order Updated!")
      }
      else {
        toast.error("Cannot update order!");
      }
    


    } catch (error) {
      toast.error("Cannot update order!");
      console.error(error);
    }

   
  }

  // console.log(orderStatusValue);
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
                  <div className={`showDelivery ${orderStatusColorValue}`}>
                    Order Status: {orderStatusValue}  <span className="deliveryCircle"> <FaCircle /></span>
                  </div>
                  { currentUser.accType === 1 ?
                  <div className='orderStatusContainer'>
                    <p className='orderStatusHeader'> <b> Change Order Status: </b> </p>
                    
                    <div className='orderStatusChangeContainer'>
                      <select className="orderStatusChange" onChange={handleStatusChange} name="" id="">
                        <option className='orderStatusChangeValue' value="">---------- Change Status ----------</option>
                        <option className='orderStatusChangeValue' value="1">Pending</option>
                        <option className='orderStatusChangeValue' value="2">Processing</option>
                        <option className='orderStatusChangeValue' value="3">Delivered</option>
                      </select>
                      <button onClick={handleStatusSave} className='orderStatusSaveBtn'>Save</button>
                    </div>
                  
                  </div> : null  }

                  <div className='deliveryContainer'>
                    <table className='deliveryContainerTable'>
                      <thead>
                        <tr>
                          <td> 
                            <p className='deliveryTableHeader'><b>Deliver to:</b> </p>
                          </td>
                        </tr>
                      </thead>
                      <tbody className='deliveryTableBody'>
                          <tr>
                            <td>Name</td>
                            <td>: {orderData.userName}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>: {orderData.userEmail}</td>
                          </tr>
                          <tr>
                            <td>Contact</td>
                            <td>: {orderData.userContact}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>: {orderData.userAddress}</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div> :
                <div className='showSectionSummary'> 
                  {
                    orderProducts && orderProducts.map(orderProduct => (
                      <SingleOrderCard 
                      productTitle={orderProduct.title} 
                      productType={orderProduct.elementType} 
                      productPrice={orderProduct.price-orderProduct.discount} 
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