import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductCard2 from '../homeComponent/productCard2/ProductCard2';
import BookImg from "../../images/phys_book.jpg";
import { useAuth } from '../../contexts/AuthContext';
import "./ViewAll.css";

const ViewAll = () => {
  const {currentUser} = useAuth();
  const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getBooks`;
  const[classBooks,setClassBooks] = useState([]);

  const fetchBooks = async () => {
    await fetch(getSchoolBooksUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status !== 200) {
          toast("No school found!");
      }else {
          response.json().then(booksInfo => {
            // setBooksDoc(booksInfo);
            setClassBooks(booksInfo);
          })
      }
    })
  };
  const handleAddToCart = async (productId) => {
    const bookId = productId;
    if(currentUser){
      const bookIndex = classBooks.findIndex( obj => obj._id === bookId );
      const bookDetails = classBooks[bookIndex];
      const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;

      const cartDoc = await fetch(addCartUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookDetails,currentUser})
      });
      if(cartDoc.status === 200 ){
        toast.success("Added to Cart!");
        
      }else {
        toast.error("Failed to add!");
      }

    }else{
      toast.error("Login First!")
    }
  
  }

  const getTitle = (titleString) => {
    if(titleString.length > 16){
      // return titleString
      return titleString.slice(0,25)+ "...";
    }else{
      return titleString
    }
  } 

  const getImage = (productImage) => {
    if(productImage.slice(0,1) === "u") {
      return BookImg;
    }
    else {
      return productImage;
    }
  }

  useEffect(() => {
    fetchBooks();
  },[]);

  return (
    <div className='viewAllComponent'>
      <div className="productDiv">
          {classBooks && classBooks.map(booksDoc => (
            <ProductCard2 
            link={`/product/${booksDoc._id}`}
            name={getTitle(booksDoc.title)}
            price={booksDoc.price}
            discount={booksDoc.discount}
            cartFun={handleAddToCart}
            cartId={booksDoc._id}
            img={getImage(booksDoc.bookImg)}
            />
          ))}
        </div>
    </div>
  )
}

export default ViewAll