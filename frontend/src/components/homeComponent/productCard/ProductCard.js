import React from 'react';
import "./ProductCard.css"
import { FaPlus,FaRegHeart,FaHeart  } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const productCard = (props) => {
  const handleCart = () => {
    props.cartFun(props.cartId);
  }


  return (
    <div className='productCard'>

      <Link to={props.link} className='productCardLink' >
        <div className="productCardFirst">
            <div className='cardDiscount'>{props.off}% off</div>
            {/* <button>  <FaRegHeart/> </button> */}
        </div>
        <div className="productCardSecond">
            <img src={props.img} alt="_product_img" />
        </div>
        <div className="productCardThird">{props.name}</div>
      </Link>

      <div className="productCardFourth">
        <div> <strike>&#8377;{props.price}</strike> <b>&#8377; {props.price - props.discount}</b>    </div>
        <button  onClick={handleCart} > <FaPlus/></button>
      </div>

    </div >
  )
}

export default productCard