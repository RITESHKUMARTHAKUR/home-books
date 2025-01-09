import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "./Stationary.css";
import ProductCard2 from '../../homeComponent/productCard2/ProductCard2';
import BookImg from "../../../images/phys_book.jpg";
import { ImCross } from 'react-icons/im';
import { storage } from '../../../firebase';
import { Frown } from 'lucide-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import NoOrders from "../../../shared/NoOrders/NoOrders";


const Stationary = () => {
    const stationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/getStationary`;
    const addStationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/addStationary`;

    const [stationary,setStationary] = useState([]);
    const[updateDoc,setupdateDoc] = useState({});
    const [addFormShow,setAddFormShow] = useState(false);


    const [files,setFiles] = useState(null);

    const fileTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];

    console.log(updateDoc);
    console.log(files);

    const fetchStationary = async () => {
            await fetch(stationaryUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(response.ok){
                    const data = response.json();
                    data.then(response => {
                        setStationary(response);
                    })
                }else {
                    toast.error("Failed to fetch!");
                }
            })
    };


    const getImage = (productImage) => {
        if(productImage.slice(0,1) === "u") {
            return BookImg;
        }
        else {
            return productImage;
        }
    }

    const getTitle = (titleString) => {
        if(titleString.length > 16){
          // return titleString
          return titleString.slice(0,25)+ "...";
        }else{
          return titleString
        }
    } 

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

    const handleUpdate = (e) => {
       const {name,value} = e.target;
       setupdateDoc({...updateDoc,[name]: value});
    }


    const toggleForm = () => {
      setAddFormShow(!addFormShow);
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

    const handleSubmit = async (event) => {
      event.preventDefault();
      if( updateDoc.title && updateDoc.price   && updateDoc.author  && updateDoc.bookPublication  && updateDoc.pubDate  && updateDoc.edition  && updateDoc.language  && updateDoc.discount  && updateDoc.elementType  && updateDoc.bookDesc && files !== null ) {
        
        const promise = new Promise(async (resolve, reject) => {
          const storageRef = ref(storage, 'stationeries/' + getFileName());
          const fileUpload = await uploadBytesResumable(storageRef, files);

          if(fileUpload.state === "success"){
            await getDownloadURL(storageRef).then(async (downloadUrl) => {
                
              const stationaryDoc = await fetch(addStationaryUrl, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({...updateDoc, stationaryUrl: downloadUrl })
              });
              if(stationaryDoc.ok){
                resolve("Book added!");
              } else {
                reject("Failed to add Book!");
              }

            });
          }else{
            toast.error("error in uploading image!");
          }
        });
        toast.promise(promise, {
          pending: "Saving data...",
          success: "Stationary added successfully",
          error: "Failed to add stationary!",
        });
      }
      else {
        toast.error("Missing Some Data", {
          autoClose: 2000
        });
      }
        
    }

    const elementData = ["stationery","notebook"];

    useEffect(() => {
        fetchStationary();
        window.scrollTo(0, 0);
    },[]);

  return (
    <div className='stationary-admin'>
        <div className={`addStationaryDiv ${addFormShow ? '': "display-none"} `}>
            <div className="addStationary-heading">
                <h2 className='addStationaryHeading'>Add Stationaries</h2>
                <button className='addStationaryClose' onClick={toggleForm}>
                    <ImCross/>
                </button>
            </div>
            <form action="" className='addStationaryForm'>
                <div className="inp-group">
                  <input className='editBooksInp' name='title'  required="required" value={updateDoc.title} onChange={(e) => handleUpdate(e)  } type="text" placeholder='title'/>
                  <label className='editBooksTitle' htmlFor="title">Title</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp addBooksFile' onChange={handleChange} placeholder='no image' name='bookImg'  type="file" />
                  <label className='editBooksTitle' htmlFor="title">Stationary Img</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp' name='author' value={updateDoc.author} onChange={(e) => handleUpdate(e) } type="text" placeholder='author'/>
                  <label className='editBooksTitle' htmlFor="title">Author</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp' name='bookPublication' value={updateDoc.bookPublication} onChange={(e) => handleUpdate(e) } type="text" placeholder='publication'/>
                  <label className='editBooksTitle' htmlFor="title">Publication</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp' name='pubDate' value={updateDoc.pubDate} onChange={(e) => handleUpdate(e) } type="text" placeholder='publication date'/>
                  <label className='editBooksTitle' htmlFor="title">Publication Date</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp' name='edition' value={updateDoc.edition} onChange={(e) => handleUpdate(e) } type="text" placeholder='edition'/>
                  <label className='editBooksTitle' htmlFor="title">Edition</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp' name='language' value={updateDoc.language} onChange={(e) => handleUpdate(e) } type="text" placeholder='language'/>
                  <label className='editBooksTitle' htmlFor="title">Language</label>
                </div>
                {/* <div className="inp-group">
                  <input className='editBooksInp' name='subject' value={updateDoc.subject} onChange={(e) => handleUpdate(e) } type="text" placeholder='subject'/>
                  <label className='editBooksTitle' htmlFor="title">Subject</label>
                </div> */}
                {/* <div className="inp-group">
                  <select className='editBooksInp' value={updateDoc.schoolName}  onChange={(e) => handleUpdate(e) }  name="schoolName" id="">
                    <option value="">select school</option>
                    {schoolDoc.map((school) => (
                      <option key={school.schoolName} value={school._id} >{school.schoolName}</option>
                    ))}
                  </select>
                  <label className='editBooksTitle' htmlFor="title">School Name</label>
                </div> */}
                <div className="inp-group">
                  <input className='editBooksInp'  value={updateDoc.price} onChange={(e) => handleUpdate(e) } name='price' type="number" placeholder='price'/>
                  <label className='editBooksTitle' htmlFor="title">Price</label>
                </div>
                {/* <div className="inp-group">
                  <select className='editBooksInp' value={updateDoc.bookClass} onChange={(e) => handleUpdate(e) } name="bookClass" id="">
                    <option  value="">select class</option>
                    {booksClass.map((bookClass) => (
                      <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                  </select>
                  <label className='editBooksTitle' htmlFor="title">Book Class</label>
                </div> */}
                <div className="inp-group">
                  <input className='editBooksInp' value={updateDoc.discount} onChange={(e) => handleUpdate(e) } name='discount' type="number"  placeholder='discount'/>
                  <label className='editBooksTitle' htmlFor="title">Discount</label>
                </div>
                <div className="inp-group">
                  <select className='editBooksInp' value={updateDoc.elementType}  onChange={(e) => handleUpdate(e) } name="elementType" id="">
                    <option  value="">select type</option>
                    {elementData.map((bookClass) => (
                      <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                  </select>
                  <label className='editBooksTitle' htmlFor="title">Element Type</label>
                </div>
                <div className="inp-group">
                  <textarea className='editBooksInp addBookDesc' value={updateDoc.bookDesc} onChange={(e) => handleUpdate(e) } name="bookDesc" id="" rows="4" placeholder='book description'></textarea>
                  <label className='editBooksTitle' htmlFor="title">Stationary Description</label>
                </div>
                <button onClick={handleSubmit} className='addBookBtn' >Submit</button>
            </form>
        </div>

        <div className="addEdit-stationaryDiv">
            <button className="addStationary-button" onClick={toggleForm}>
                Add Stationary +
            </button>
        </div>

        <div className="admin-stationaryItems-div">
        {
                stationary ?
                    stationary.length>0? 
                        stationary.map(statData => (
                                <ProductCard2
                                    link={`/product/${statData._id}`}
                                    off={25}
                                    name={getTitle(statData.title)}
                                    price={statData.price}
                                    discount={statData.discount}
                                    // cartFun={handleAddToCart}
                                    // editFun={}
                                    deleteBtn={"show"}
                                    editBtn={"show"}
                                    cartId={statData._id}
                                    img={getImage(statData.stationaryUrl)}
                                />
                        ))
                    :
                    <NoOrders icon={<Frown />} name={"stationeries"} />
                : 
                <p>Loading...</p> 
            }
        </div>
    </div>
  )
}

export default Stationary