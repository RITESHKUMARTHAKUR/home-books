import React, { useState } from 'react';
import './Promotion.css';
import {toast} from 'react-toastify';
import {getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage';
import { storage } from '../../../firebase';
import { useNavigate } from 'react-router-dom';


const Promotion = () => {
  const Navigate = useNavigate();
  const [promotionTitle,setPromotionTitle] = useState('');  
  const [files,setFiles] = useState(null);
  const [promotionDesc,setPromotionDesc] = useState(''); 
  const [promotionRedirect,setPromotionRedirect] = useState(''); 

  const addPromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/addPromotion`;
  const fileTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  const handleChange = (e) => {
    const fileUpload = e.target.files[0];
    if (fileUpload && fileTypes.includes(fileUpload.type) ){
      setFiles(e.target.files[0]);
    }else {
      setFiles(null);
      toast.error('use only specified file type!');
    }
  };

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


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if( promotionTitle !== '' && promotionDesc !== '' && files !== null ){

      const promise = new Promise( async (resolve,reject) => {
        const storageRef = ref(storage, 'promotions/' + getFileName());
        const fileUpload = await uploadBytesResumable(storageRef, files);
        
        if(fileUpload.state === "success"){
          await getDownloadURL(storageRef).then(async (downloadURL) => { 
            const promotionsDoc = await fetch(addPromotionUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                promotionTitle,
                promotionImg: downloadURL,
                promotionDesc,
                promotionRedirect
              })
            });
            if(promotionsDoc.ok) {
                // toast.success("Promotion added!");
              resolve("Promotion added!");
              Navigate('/admin'); 
            }
            else{
                reject("Failed to add Promotion!");
                // toast.error("Failed to add Promotion!")
            }
          })
        }
      });
      toast.promise(promise, {
        pending: 'Saving data...',
        success: 'Data saved successfully',
        error: 'Error saving data',
      });

        
    }
    else { 
        toast.error("Please fill all the Details!")
    }
  }
  
  return (
    <div className='promotionContainer'>
        <div className="promotionHeader">
            <center><h2 className='promotionHeaderTitle'>Add or Update Promotions</h2></center>
        </div>

        <div className="promotionCreate">
            <div className="promotionCreateHeading">
               <h4 className='promotionInputTitle'>Add Promotion</h4>
            </div>

            <form action="" className='promotionForm' onSubmit={handleSubmit} >
                <div className="promotionInputGroup">
                    <label htmlFor="title">
                        <h4 className='promotionInputTitle'>Title</h4>
                    </label>
                    <input className='promotionInputBorder' onChange={(e) => setPromotionTitle(e.target.value) } type="text" name='title' placeholder='title'/>    
                </div>
                <div className="promotionInputGroup">
                    <label htmlFor="redirect">
                        <h4 className='promotionInputTitle'>Redirect Link</h4>
                    </label>
                    <input className='promotionInputBorder' onChange={(e) => setPromotionRedirect(e.target.value) } type="text" name='title' placeholder='redirect link'/>    
                </div>
                <div className="promotionInputGroup promotionImageContainer">
                    <label htmlFor="promotionImage">
                        <h4 className='promotionInputTitle'>Promotion Image</h4>
                    </label>
                    <input type="file" onChange={handleChange} className='promotionInputBorder promotionInputImage' placeholder='promotionImage'/>
                </div>
                <div className="promotionInputGroup promotionDesc">
                    <label htmlFor="promotionDescription">
                        <h4 className='promotionInputTitle'>Promotion Description</h4>
                    </label>
                    <textarea className='promotionInputDescription' onChange={(e) => setPromotionDesc(e.target.value) } type="text" name='promotionDescription' placeholder='description'/>
                </div>
                
                <button className='promotionSubmitBtn'>Submit Promotion</button>
            </form>
        </div>
    </div>
  )
}

export default Promotion