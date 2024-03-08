import React from 'react';
import "./schoolCard.css"
import {Link} from "react-router-dom";

const schoolCard = (props) => {
  return (
    <Link to={props.link} className="schoolCardContainer">
        <div><img src={props.img} alt="" /></div>
        <h3 className='schoolCardContainerTitle'>{props.title} School</h3>
        <p>{props.address}</p>
    </Link>
  )
}

export default schoolCard