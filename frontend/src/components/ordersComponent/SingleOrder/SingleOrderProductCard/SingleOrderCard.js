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
          {props.discountPrice ?
            <h4 className='singleOrderH'>
              <span style={{textDecoration:"line-through",color:"gray"}}>
                &#8377; {props.originalPrice}
              </span>
              &nbsp; &#8377; {props.originalPrice - props.discountPrice}
            </h4>
          :
            <h4 className='singleOrderH'>&#8377; {props.originalPrice}</h4>
          }
            <p className='singleOrderP'>Qty: {props.productCount}</p>
        </div>
    </div>
  )
}

export default SingleOrderCard