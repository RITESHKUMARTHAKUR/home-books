import React, { useEffect, useState } from 'react';
import './CartConfirm.css'

const CartConfirm = (props) => {
    const [userAdd,setUserAdd] = useState(null);
    const [selectedBooks,setSelectedBooks] = useState([]);

    const handleValueChange = (addValue) => {
        props.onUserAddressChange(addValue);
        setUserAdd(addValue);
    }

    useEffect(() => {   
        setUserAdd(props.userAddress);
    },[props.userAddress]);

    useEffect(() => { 
        setSelectedBooks(props.userBooks);
    },[props.userBooks])

  return (<>
    {props.boxVisible && <div className="orderConfirmOverlay"></div> }
    <div className={`${props.boxVisible ? "displayOrderBox" : "hideOrderBox"} cartConfirmContainer`}>
        <div className="orderFieldBox">
            <div className="orderBoxHeading">   
                <h2 className='orderBoxTitle'>Confirm Order Details</h2>
                <img src="" alt="" />
            </div>
            <div className="cartInputBox">
                <label htmlFor="userName">Name</label>
                <input className='cartInput' value={props.userName} disabled name='userName' type="text" />
            </div>
            <div className="cartInputBox">
                <label htmlFor="userEmail">Email</label>
                <input className='cartInput' value={props.userEmail} disabled name='userEmail' type="text" />
            </div>
            <div className="cartInputBox">
                <label htmlFor="userContact">Contact</label>
                <input className='cartInput' value={props.userContact}  disabled name='userContact' type="number" />
            </div>
            <div className="cartInputBox">
                <label htmlFor="userAddress">Shipping Address</label>
                <textarea value={userAdd} onChange={(e) => handleValueChange(e.target.value) }  name='userAddress' rows={4} type="text" />
            </div>

            <div className='selectedBooksTableContainer'>
                {selectedBooks.length > 0 ? (
                    <table cellPadding={10} className='selectedBooksTable'>
                        <thead className='selectedBooksTableHead'>
                            <tr className='selectedBooksTableHeadTr'>
                                <th className="borderLeft" scope="col">S.No.</th>
                                <th style={{"width": '50%'}} scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th className='borderRight' scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='selectedBooksTableBody'>
                            {selectedBooks.map((bookList,index) => (
                                <tr className='selectedBooksTableBodyTr'>
                                    <td className='cartConfirmTd' style={{"textAlign": "center"}} ><b>{index+1}</b></td>
                                    <td className='cartConfirmTd' >{bookList.productDetails.title}</td>
                                    <td className='cartConfirmTd' > &#8377; {bookList.productDetails.price}</td>
                                    <td className='cartConfirmTd' >{bookList.productQuantity}</td>

                                    {/* <td> <button className='booksAddBtn' onClick={() => handleQuantityAdd(bookList._id)}> <FaCirclePlus/> </button> &nbsp;  {bookList.bookQuantity<10 ?0: "" }{bookList.bookQuantity}&nbsp; <button className='booksSubBtn' onClick={() => handleQuantitySub(bookList._id)}> <FaCircleMinus /> </button></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) 
                : 
                 <b>No books selected</b>
                }
            </div>
            
            


            <div className="cartButtonBox">
                
                <p className='cartTotal'>Total : &#8377;{props.orderTotal}</p>
            
                <div style={{"display": "flex", "gap" : "10px"}}>
                <button className='cancelCartButton' onClick={props.cancelBtn} >
                    Cancel
                </button>
                <button className='confirmCartButton' onClick={props.confirmBtn} >
                    Confirm
                </button>
                </div>
            </div>

        </div>
    </div>
  </>
  )
}

export default CartConfirm