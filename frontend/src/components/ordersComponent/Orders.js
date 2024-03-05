import React, { useEffect } from 'react';
import "./Orders.css";
import OrderImg from "../../images/phys_book.jpg";
import OrderCard from "./OrderCard/OrderCard";
import {useAuth} from "../../contexts/AuthContext";

const Orders = () => {
 const {currentUser} = useAuth();
 
  return (
    <div className='ordersContainer'>
      <OrderCard orderImg={OrderImg} orderId={"#1547B43"} date={"5 February 2024"} title={"N.C.R.T Books"} pay={"1200"} items={"4"} />
      <OrderCard orderImg={OrderImg} orderId={"#1547B43"} date={"5 February 2024"} title={"Simplified Physics"} pay={"1200"} items={"4"} />
      <OrderCard orderImg={OrderImg} orderId={"#1547B43"} date={"5 February 2024"} title={"R.D Sharma"} pay={"1200"} items={"4"} />
      <OrderCard orderImg={OrderImg} orderId={"#1547B43"} date={"5 February 2024"} title={"N.C.R.T Books"} pay={"1200"} items={"4"} />
    </div>
  )
}

export default Orders