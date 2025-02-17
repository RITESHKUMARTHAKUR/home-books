import React from 'react';
import "./ProductCard2.css";
import { Link } from 'react-router-dom';
import { FaPlus ,FaPencil, FaTrash } from "react-icons/fa6";

const ProductCard2 = (props) => {

  const handleCart = () => {
    props.cartFun(props.cartId);
  }
  const handleEdit = () => {
    props.editFun(props.bookDoc);
  }
  const handleDelete = () => {
    props.deleteFun(props.bookDoc);
  }
  
  return (
    <div className='productCards'>
      <Link to={props.link} className='productCardLinks'>
        
        <div className="productCardFirsts">
            <img className='productCardFirstsImg' src={props.img} alt="_product_img" />
        </div>
        
        <div className="productCard-body">
          <p className="productCardSeconds">{props.name}</p>
        </div>
      </Link>
      <div className="productCardThirds">
        <p> <strike>&#8377;{props.price}</strike> <b>&#8377;{props.price - props.discount}</b>    </p>
        <span style={{"display":"flex", "gap":"0.5rem"}}>
          {
            !props.isProfile && props.deleteBtn ? 
            <button className='product-cartBtn' onClick={handleDelete} > <FaTrash/></button>
            : null
          }
          {
            !props.isProfile && props.editBtn ? 
            <button className='product-cartBtn' onClick={handleEdit} > <FaPencil/></button>
            : <button className='product-cartBtn' onClick={handleCart} > <FaPlus/></button>
          }
        </span>
      </div>
      <div className="productCardFourths">
          {/* <button className='cardWishlist'><FaRegHeart /></button> */}
          <p className='cardDiscounts'>{parseInt((props.discount/props.price)*100)}% off</p>
        </div>
    </div>
  )
}

export default ProductCard2