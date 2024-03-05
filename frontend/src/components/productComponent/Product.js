import React from 'react';
import "./Product.css";
import BookImg from "../../images/phys_book.jpg"

const Product = () => {
  return (
    <div className="productContainer">
      <div className="productContainerFirst">
        <div className="productImg">
          <img src={BookImg} alt="_book_img" />
        </div>
        <div className="productDesc">
          <h3>Simplified Physics</h3>
          <p>By <b>S.L Arora</b> </p>
          <div className="productDescContainer">
            <span>
              <p>Edition</p>
              <p>2nd</p>
            </span>
            <span>
              <p>Publication Date</p>
              <p>1 January 2020</p>
            </span>
            <span>
              <p>Language</p>
              <p>English</p>
            </span>
          </div>
        </div>
      </div>

      <div className="productContainerSecond">
          <div className="productBio">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Rem id exercitationem maxime numquam pariatur quisquam s
            ed veniam magni ducimus debitis!
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