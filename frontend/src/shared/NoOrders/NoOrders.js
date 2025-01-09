import React from 'react';
import "./NoOrders.css"

const NoOrders = (props) => {
  return (
    <div className='no-ordersDiv'>
        <p className='no-ordersP'> {props.icon} Sorry no {props.name} here.</p>
    </div>
  )
}

export default NoOrders