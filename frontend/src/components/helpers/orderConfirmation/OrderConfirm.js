import React from 'react';
import "./OrderConfirm.css";

const OrderConfirm = (props) => {
  return (<>
    {props.boxVisible && <div className="orderConfirmOverlay"></div> }
    <div className={`${props.boxVisible ? "displayOrderBox" : "hideOrderBox"} orderConfirmContainer`}>
        <div className="orderFieldBox">
            <div className="orderBoxHeading">   
                <h2 className='orderBoxTitle'>Confirm Order Details</h2>
                <img src="" alt="" />
            </div>
            <div className="orderInputBox">
                <label htmlFor="userName">Name</label>
                <input className='orderInput' value={props.userName} disabled name='userName' type="text" />
            </div>
            <div className="orderInputBox">
                <label htmlFor="userEmail">Email</label>
                <input className='orderInput' value={props.userEmail} disabled name='userEmail' type="text" />
            </div>
            <div className="orderInputBox">
                <label htmlFor="userContact">Contact</label>
                <input className='orderInput' value={props.userContact}  disabled name='userContact' type="number" />
            </div>
            <div className="orderInputBox">
                <label htmlFor="userAddress">Shipping Address</label>
                <textarea value={props.userAddress} name='userAddress' rows={5} type="text" />
            </div>
            <div className="orderButtonBox">
                <button className='cancelOrderButton' onClick={props.cancelBtn} >
                    Cancel
                </button>
                <button className='confirmOrderButton' onClick={props.confirmBtn} >
                    Confirm
                </button>
            </div>

           
        </div>
    </div>
    </>
  )
}

export default OrderConfirm