import React from 'react';
import './UploadBook.css';
import {useAuth} from "../../contexts/AuthContext";

const UploadBook = () => {
  const {currentUser} = useAuth();

  return (
    <div className='uploadBookListComponent'>
      <center> <h2>Upload Book List</h2> </center>
      <form action="#" className='uploadBookFormContainer' >
        <div className="uploadBookForm">
          <div className="uploadBookListGroup">
            <label htmlFor="">Name</label>
            <input className='uploadBooksInput' value={currentUser.name} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Email</label>
            <input className='uploadBooksInput' value={currentUser.email} type="text" />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Contact</label>
            <input className='uploadBooksInput' value={currentUser.contact} type="text" />
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