import React from 'react';
import './SingleOrderCard.css';

const SingleOrderCard = (props) => {
  return (
    <div className='singleOrderProductContainer'>
        <div className='singleOrderImg'>
            <img className='productImg' src={props.productImg} alt="" />
        </div>
        <div className="singleOrderDetails">
            <h4 className='singleOrderH'>{props.productTitle}</h4>
            <p className='singleOrderP'>{props.productType}</p>
        </div>
        <div className="productPriceDiv">
            <h4 className='singleOrderH'>&#8377; {props.productPrice}</h4>
            <p className='singleOrderP'>Qty: {props.productCount}</p>
        </div>
    </div>
  )
}

export default SingleOrderCard