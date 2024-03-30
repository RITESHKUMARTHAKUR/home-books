import React, { useEffect, useState } from 'react';
import "./Product.css";
import {useParams} from 'react-router-dom';
import BookImg from "../../images/phys_book.jpg"
import { toast } from 'react-toastify';

const Product = () => {
  const {id} = useParams();
  const singleBookUrl = `${process.env.REACT_APP_API_BASE_URL}/getSingleBook/${id}`;
  const [bookDoc,setBookDoc] = useState({});

  const fetchBook =  async () => {
    await fetch(singleBookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
        if(response.status === 200 ){
          response.json().then(bookData => {
            setBookDoc(bookData);
          });
        }else{
          toast.error("Book Not Found!")
        }
          
    })
  }
  useEffect(() => {
    fetchBook();
  },[])

  return (
    <div className="productContainer">
      <div className="productContainerFirst">
        <div className="productImg">
          <img src={bookDoc.bookImg} alt="_book_img" />
        </div>
        <div className="productDesc">
          <h3>{bookDoc.title}</h3>
          <p>By <b>{bookDoc.author}</b> </p>
          <div className="productDescContainer">
            <span>
              <p>Edition</p>
              <p>{bookDoc.edition}</p>
            </span>
            <span>
              <p>Publication Date</p>
              <p>{bookDoc.pubDate}</p>
            </span>
            <span>
              <p>Language</p>
              <p>{bookDoc.language}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="productContainerSecond">
          <div className="productBio">
            {bookDoc.bookDesc}
          </div>
          <div className="productButtons">
            <button>Add to Cart</button>
            <button>Buy Now</button>
          </div>
      </div>  
    </div>
  )
}

export default Product