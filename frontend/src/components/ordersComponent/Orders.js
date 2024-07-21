import React, { useEffect, useState } from 'react';
import "./Orders.css";
import OrderImg from "../../images/phys_book.jpg";
import OrderCard from "./OrderCard/OrderCard";
import {useAuth} from "../../contexts/AuthContext";

const Orders = () => {
 const {currentUser} = useAuth();

 const userOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/getOrders/${currentUser.email}`;
 const [orderDoc,setOrderDoc] = useState([]);
 const [firstProduct,setFirstProduct] = useState([]);

  const fetchUserOrders = async () => {
    await fetch(userOrderUrl,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    })
    .then(response => {
      response.json().then(responseDoc => {
        setOrderDoc(responseDoc);
        

        responseDoc.map(orderData => {
          const {orderProducts} = orderData ;
          // setFirstProduct(...firstProduct,orderProducts[0]);
          if (orderProducts.length > 0) {
            setFirstProduct(prevProducts => [...prevProducts, orderProducts[0]]);
        }
        })

      })
    });
    
  }

  useEffect(() => {
    fetchUserOrders();
  },[]);

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
  
  }
  const getOrderId = (orderId) => {
    return orderId.slice(-8)
  }
  // const getOrderStatus = (orderStatus) => {
  //   const orderCodes = ["Pending","Processing","Delivered"]
  //   return orderCodes[orderStatus-1]
  // }
 
  return (
    <div className='ordersContainer'>
      {orderDoc.length > 0 ? orderDoc.map((orders,index) => (
        <OrderCard 
        orderImg={firstProduct[index].bookImg} 
        link={`/order/${orders._id}`} 
        orderId={getOrderId(orders._id)} 
        date={getDate(orders.createdAt)} 
        title={
          currentUser.accType === 1 ? orders.userName : firstProduct[index].title 
        } 
        phno={
          orders.userContact 
        }
        email={currentUser.accType === 1 && orders.userEmail}
        pay={orders.orderTotal} 
        orderStatus={orders.orderStatus} 
        items={orders.itemsCount} />
      )) :
       <p>No Orders Here</p>
    }
      
    </div>
  )
}

export default Orders