import React, { useEffect, useState } from 'react';
import BookListCard from './BookListCard/BookListCard';
import "./BookList.css";


const BookList = () => {
  const bookListUrl = `${process.env.REACT_APP_API_BASE_URL}/getBookList`;
  const [bookListDoc,setBookListDoc] = useState([]);
    
  const fetchBookList = async () => {
    await fetch(bookListUrl,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })  
    .then(response => response.json()
        .then(bookLDoc => setBookListDoc(bookLDoc)) 
    );
  };

  useEffect(() =>{
    fetchBookList();
  },[]);

  return (
    <div className="booklist-component">
      {
        bookListDoc.map((bookL) => (
          <BookListCard 
            img={bookL.bookListUrl}
            name={bookL.userName}
            email={bookL.userEmail}
            number={bookL.userContact}
            address={bookL.userAddress}

           />
        ))
      }
    </div>
  )
}

export default BookList