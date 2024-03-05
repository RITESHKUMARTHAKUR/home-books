import React from 'react';
import "./ProductCard.css"
import { FaPlus,FaRegHeart,FaHeart  } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const productCard = (props) => {
  return (
    <Link to={props.link} className='productCard'>
        <div className="productCardFirst">
            <div className='cardDiscount'>{props.off}% off</div>
            <button>  <FaRegHeart/> </button>
        </div>
        <div className="productCardSecond">
            <img src={props.img} alt="_product_img" />
        </div>
        <div className="productCardThird">{props.name}</div>
        <div className="productCardFourth">
            <div> &#8377;{props.price}</div>
            <button> <FaPlus/></button>
        </div>
    </Link >
  )
}

export default productCard