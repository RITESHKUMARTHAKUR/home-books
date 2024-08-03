import React, { useEffect, useState } from 'react'
import ProductCard2 from '../homeComponent/productCard2/ProductCard2';
import "./Stationary.css";
import { BookHeart } from 'lucide-react';
import BookImg from "../../images/phys_book.jpg";
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
const Stationary = () => {
    const {currentUser} = useAuth();
    const stationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/getStationary`;
    const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;

    const [stationary,setStationary] = useState([]);
    
    const fetchStationary = async () => {
        await fetch(stationaryUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.ok){
                const data = response.json();
                data.then(response => {
                    setStationary(response);
                })
            }else {
                toast.error("Failed to fetch!");
            }
        })
    };

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

    const handleAddToCart = async (productId) => {
        const bookId = productId;
        if(currentUser){
          const bookIndex = stationary.findIndex( obj => obj._id === bookId );
          const bookDetails = stationary[bookIndex];
        
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

    useEffect(()=> {
        fetchStationary();
        window.scrollTo(0, 0);
    },[]);
  return (
    <div className='stationaryComponent'>
        <div className="stationaryTitle">
            <BookHeart strokeWidth={3} />
            Get Your Stationeries here 
        </div>
        <div className="stationaryProductDiv">
            {
                stationary ?
                    stationary.length>0? 
                        stationary.map(statData => (
                                <ProductCard2
                                    link={`/product/${statData._id}`}
                                    off={25}
                                    name={getTitle(statData.title)}
                                    price={statData.price}
                                    discount={statData.discount}
                                    cartFun={handleAddToCart}
                                    cartId={statData._id}
                                    img={getImage(statData.bookImg)}
                                />
                        ))
                    :
                    <p>No Stationaries here.</p>
                : 
                <p>Loading...</p> 
            }
        </div>
    </div>
  )
}

export default Stationary