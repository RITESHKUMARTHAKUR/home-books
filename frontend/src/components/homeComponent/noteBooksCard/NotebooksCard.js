import React from 'react'
import "./NotebooksCard.css";
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom'

const NotebooksCard = ({noteBookimg,title,link}) => {
  return (
    <Link to={`${link}`} className='noteBooksCard'>
            <img 
                className='noteBooksImgDiv' 
                src={noteBookimg} 
                alt="" 
            />
            <div className="noteBooksTitleDiv">
                    {title}
                    <MoveRight 
                      strokeWidth={2}
                      size={
                        window.innerWidth<992? 30: 40
                      }
                    />
            </div>
    </Link>
  )
}

export default NotebooksCard