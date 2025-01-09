import React, { useState } from 'react';
import './UploadBook.css';
import {getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage'
import {useAuth} from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import { storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const UploadBook = () => {
  const Navigate = useNavigate();
  const {currentUser} = useAuth();
  const uploadBooksList = `${process.env.REACT_APP_API_BASE_URL}/uploadBookList`;
  const [shippingAddress,setShippingAddress] = useState(currentUser.address);
  
  const [files,setFiles] = useState(null);

  const getFileName = () => {
    let splitName = files.name.split('.');
    let fileName = splitName[0].replace(/\s/g, '').toLowerCase();

    let dateTime = new Date();

    let time = dateTime.toLocaleTimeString().split(" ");
    let formattedTime = time[0].split(":").join("");

    let currDate = dateTime.toLocaleDateString().split(" ");
    let formattedDate = currDate[0].split("/").join("");

    let newName = fileName +"_"+formattedDate +"_" + formattedTime + time[1][0].toLowerCase() + "."+ splitName[1];

    return newName;
  }

  const handleChange = (e) => {
    const fileUpload = e.target.files[0];
    if (fileUpload && fileTypes.includes(fileUpload.type) ){
      setFiles(e.target.files[0]);
    }else {
      setFiles(null);
      toast.error('use only specified file type!');
    }
  }

  const fileTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];
  const handleListSubmit = (e) => {
    e.preventDefault();
    if(files !== null){
      const promise = new Promise(async (resolve,reject) => {
        const storageRef = ref(storage, 'bookList/' + getFileName());
        const fileUpload = await uploadBytesResumable(storageRef, files);
        
        if(fileUpload.state === "success") {
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            const bookListDoc = await fetch(uploadBooksList, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userName: currentUser.name,
                userEmail: currentUser.email,
                userContact: currentUser.contact,
                userAddress: shippingAddress,
                bookListUrl: downloadURL,
              })
            });
            if (bookListDoc.ok) {
              resolve("Book added!");
            } else {
              reject("Failed to add book!")
            }

          });

        }else {
          toast.error("error in uploading image!");
        }
      });
      toast.promise(promise, {
        pending: "Saving data...",
        success: "Booklist sent successfully",
        error: "Failed to add book!",
      });


    }else {
      toast.error("Please fill all the details!",{
        autoClose: 2000
      })
    }
    
  }

  return (
    <div className='uploadBookListComponent'>
      <div className="uploadBooksHeader">
          Upload Book List
      </div>
      <form action="#" className='uploadBookFormContainer' onSubmit={handleListSubmit} >
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
            <textarea 
              value={shippingAddress} 
              type="text" 
              onChange={(e) => setShippingAddress(e.target.value) }  
            />
          </div>
          <div className="uploadBookListGroup">
            <label htmlFor="">Upload Books List</label>
            <input 
              className='uploadBookInputImg  uploadBooksInput' 
              type="file" 
              onChange={handleChange}
            />
          </div>
        </div>
        
        <button className='uploadBookBtn'>Submit</button>
      </form>
        
    </div>
  )
}

export default UploadBook