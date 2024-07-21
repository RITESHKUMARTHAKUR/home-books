import React, { useEffect, useState } from 'react';
import {useAuth} from "../../../contexts/AuthContext";
import OrderCard from '../../ordersComponent/OrderCard/OrderCard';
import { Link } from 'react-router-dom';


const OrdersDelivery = () => {
  const {currentUser} = useAuth();
  const [orderDoc,setOrderDoc] = useState([]);
  const getOrdersUrl = `${process.env.REACT_APP_API_BASE_URL}/getAllOrders`;
  const [firstProduct,setFirstProduct] = useState([]);

  const getOrderId = (orderId) => {
    return orderId.slice(-8);
  };

  const getDate = (orderDate) => {
    const date = new Date(orderDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear().toString(); // Get last two digits of the year

    // Concatenate day, month, and year to form ddmmyy format
    const formattedDate = day + " " + months[month-1] + " " + year;
    return(formattedDate);
  
  };

  const getAllOrders = async () => {
    await fetch(getOrdersUrl,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        response.json().then(responseDoc => {
          setOrderDoc(responseDoc);

            if(responseDoc.length>0) {
              responseDoc.map(orderData => {
                  const {orderProducts} = orderData ;
                  // setFirstProduct(...firstProduct,orderProducts[0]);
                  if (orderProducts.length > 0) {
                    setFirstProduct(prevProducts => [...prevProducts, orderProducts[0]]);
                  }
              });
            }
        })
    });
  };

  useEffect(() => {
    getAllOrders();
  },[]);

  return (
    <div className='ordersDelivery'>
      { currentUser.accType === 1 || currentUser.accType === 2 ?  orderDoc.length > 0  ? orderDoc.map((orders,index) => (
          <OrderCard 
          orderImg={firstProduct[index].bookImg} 
          link={`/order/${orders._id}`} 
          orderId={getOrderId(orders._id)} 
          date={getDate(orders.createdAt)} 
          addr={orders.userAddress}
          title={
            currentUser.accType === 1 || currentUser.accType === 2 ? orders.userName : firstProduct[index].title 
          } 
          phno={
            currentUser.accType === 1 || currentUser.accType === 2 && orders.userContact 
          }
          email={
            currentUser.accType === 1 || currentUser.accType === 2 && orders.userEmail 
          }
          pay={orders.orderTotal} 
          orderStatus={orders.orderStatus} 
          items={orders.itemsCount} />
        )) :
        <p>No Orders Here</p> : 
        <div className='notPermission'>
          <center>
              <h2>You Don't have Admin Permissions</h2>
          </center>
          <center>
              <Link to="/" className='backHome'>Back to Home</Link>
          </center>
        </div>
      }
    </div>
  )
}

export default OrdersDelivery