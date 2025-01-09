import React from 'react';
import "./BookListCard.css";
import { MdDelete } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

const BookListCard = (props) => {

  return (
    <div className='booklist-cardcomponent'>
        <img className='booklist-cardimg' src={props.img} alt="" />
        <div className='booklist-cardcontent'>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.number}</p>
            <p>{props.address}</p>
            <div class="booklist-cardbuttons">
                <button class="booklist-deletebtn"> <MdDelete /> Delete</button>
                <button class="booklist-createorder-btn"> <HiPlus />  Create Order</button>
            </div>
        </div>
    </div>
  )
}

export default BookListCard