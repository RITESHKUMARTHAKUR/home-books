import React, { useEffect, useState } from 'react';
import "./OrderConfirm.css";
import { FaCirclePlus,FaCircleMinus } from "react-icons/fa6";

const OrderConfirm = (props) => {
    const [userAdd,setUserAdd] = useState(null);
    const [selectedBooks,setSelectedBooks] = useState([]);
    const [orderTotal,setOrderTotal] = useState(0);

    const calculateOrderTotal = (bookArray) => {
        let booksTotal = bookArray.reduce((accumulator,currentValue) => accumulator+ ( (currentValue.price - currentValue.discount)*currentValue.bookQuantity) , 0 );  
        setOrderTotal(booksTotal);
    }

    useEffect(() => {   
        setUserAdd(props.userAddress);
    },[props.userAddress]);

    useEffect(() => { 
        let selectedBooksDoc = props.userBooks;

        let mappedBooks = selectedBooksDoc.map(bookData => ({...bookData, bookQuantity: 1}))
        setSelectedBooks(mappedBooks);  
        calculateOrderTotal(mappedBooks);

    },[props.userBooks]);

    const handleQuantityAdd = (id) =>  {
        let bookIndex = selectedBooks.findIndex(obj => obj._id === id );

        let bookQuan = selectedBooks[bookIndex].bookQuantity;
        let bookDoc = selectedBooks[bookIndex];
        let updatedQuantity = bookQuan+1;
        let updatedBookDoc = {...bookDoc, bookQuantity : updatedQuantity};
        const updatedBookArray = [...selectedBooks];
        updatedBookArray[bookIndex] = updatedBookDoc;

        setSelectedBooks(updatedBookArray);
        calculateOrderTotal(updatedBookArray);
    }

    const handleQuantitySub = (id) =>  {
        let bookIndex = selectedBooks.findIndex(obj => obj._id === id );

        let bookQuan = selectedBooks[bookIndex].bookQuantity;
        let bookDoc = selectedBooks[bookIndex];
        let updatedQuantity = bookQuan-1;
        let updatedBookDoc = {...bookDoc, bookQuantity : updatedQuantity};
        const updatedBookArray = [...selectedBooks];
        updatedBookArray[bookIndex] = updatedBookDoc;

        setSelectedBooks(updatedBookArray);
        calculateOrderTotal(updatedBookArray);
    }



    const handleValueChange = (addValue) => {
        props.onUserAddressChange(addValue);
        setUserAdd(addValue);
    }


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
                <textarea value={userAdd} onChange={(e) => handleValueChange(e.target.value) }  name='userAddress' rows={5} type="text" />
            </div>

            <div className='selectedBooksTableContainer'>
                {selectedBooks.length > 0 ? (
                    <table className='selectedBooksTable'>
                        <thead className='selectedBooksTableHead'>
                            <tr className='selectedBooksTableHeadTr'>
                                <th className="borderLeft" scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='selectedBooksTableBody'>
                            {selectedBooks.map((bookList,index) => (
                                <tr className='selectedBooksTableBodyTr'>
                                    <th>{index+1}</th>
                                    <td className='orderConfirmBookTitle' >{bookList.title}</td>
                                    {bookList.discount? 
                                        <td><span style={{textDecoration: "line-through", color:"gray"}}>&#8377;{bookList.price}</span>&nbsp;&#8377;{bookList.price - bookList.discount} </td>
                                    : 
                                        <td> &#8377; {bookList.price} </td>
                                    }
                                    <td> <button className='booksAddBtn' onClick={() => handleQuantityAdd(bookList._id)}> <FaCirclePlus/> </button> &nbsp;  {bookList.bookQuantity<10 ?0: "" }{bookList.bookQuantity}&nbsp; <button className='booksSubBtn' onClick={() => handleQuantitySub(bookList._id)}> <FaCircleMinus /> </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) 
                : 
                 <b>No books selected</b>
                }
            </div>
            
            


            <div className="orderButtonBox">
                <p> <b>Order Total: &#8377;{orderTotal}</b> </p>
                <button className='cancelOrderButton' onClick={props.cancelBtn} >
                    Cancel
                </button>
                <button className='confirmOrderButton' onClick={() => props.confirmBtn(selectedBooks,orderTotal)} >
                    Confirm
                </button>
            </div>

        </div>
    </div>
    </>
  )
}

export default OrderConfirm