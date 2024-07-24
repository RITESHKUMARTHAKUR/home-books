import React from 'react'
import "./PromotionCard.css";

const PromotionCard = (props) => {
  return (
    <div className='promotionCard'>
        <div className="promotionImgDiv">
            <img className='promotionImg' src={props.img} alt="" />
        </div>
        {
          props.status?
          <span className='promotionActive' >Active</span>
          : 
          <span className='promotionInactive' >Inactive</span>
        }
        <h3 className='promotionTitle'>{props.title}</h3>
        <p className='promotionDesc'>{props.desc}</p>
        <div className='promotionButtonDiv'>
          <button className='promotionDelete'onClick={() => props.deleteBtn(props.promotionId)}>
            Delete
          </button>
          <button className='promotionEdit' onClick={() => props.editBtn(props.promotionId)} >
            Edit
          </button>
        </div>
    </div>
  )
}

export default PromotionCard