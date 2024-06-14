import React from 'react';
import "./Benefit.css"

const Benefit = (props) => {
  return (
    <div className="benefitConatiner">
        <span className="benefitIcon">{props.icon}</span>
        <h4>{props.title}</h4>
        <p className='benefitDesc'>{props.desc}</p>
    </div>
  )
}

export default Benefit