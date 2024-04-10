import React, { useState } from 'react';
import './UploadBook.css';
import {useAuth} from "../../contexts/AuthContext";

const UploadBook = () => {
  const {currentUser} = useAuth();
  const [files,setFiles] = useState(null);

  return (
    <div className='uploadBookListComponent'>
      <div className="uploadBooksHeader">
          Upload Book List
      </div>
      <form action="#" className='uploadBookFormContainer' >
        <div className="uploadBookForm">
          <div className="uploadBookListGroup">
            <label htmlFor="">Name</label>
            <input disabled className='uploadBooksInput' value={currentUser.name} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Email</label>
            <input disabled className='uploadBooksInput' value={currentUser.email} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Contact</label>
            <input disabled className='uploadBooksInput' value={currentUser.contact} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Shipping Address</label>
            <textarea value={currentUser.address} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Upload Books List</label>
            <input  className='uploadBookInputImg  uploadBooksInput' type="file" />
          </div>
        </div>
        
        <button className='uploadBookBtn'>Submit</button>
      </form>
        
    </div>
  )
}

export default UploadBook