import React from 'react';
import "./ProductCard2.css";
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";

const ProductCard2 = (props) => {
  return (
    <div className='productCards'>
      <Link to={props.link} className='productCardLinks'>
        
        <div className="productCardFirsts">
            <img className='productCardFirstsImg' src={props.img} alt="_product_img" />
        </div>
        
        <div className="productCard-body">
          <p className="productCardSeconds">{props.name}</p>
          <div className="productCardThirds">
            <p> <strike>&#8377;{props.price}</strike> <b>&#8377;{props.price - props.discount}</b>    </p>
          </div>
        </div>
        
      </Link>

      <div className="productCardFourths">
          {/* <button className='cardWishlist'><FaRegHeart /></button> */}
          <p className='cardDiscounts'>{props.off}% off</p>
        </div>
    </div>
  )
}

export default ProductCard2