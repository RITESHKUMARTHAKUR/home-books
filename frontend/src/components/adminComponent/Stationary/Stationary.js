import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "./Stationary.css";
import ProductCard2 from '../../homeComponent/productCard2/ProductCard2';
import BookImg from "../../../images/phys_book.jpg";
import { ImCross } from 'react-icons/im';
import { storage } from '../../../firebase';
import { Frown } from 'lucide-react';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import NoOrders from "../../../shared/NoOrders/NoOrders";


const Stationary = () => {
    const [stationary,setStationary] = useState([]);
    const[updateDoc,setupdateDoc] = useState({});
    const[deleteDoc,setDeleteDoc] = useState({});
    const[formStatus,setFormStatus] = useState(true);

    const stationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/getStationary`;
    const addStationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/addStationary`;
    const deleteStationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/deleteStationary/${deleteDoc._id}`;
    const editStationaryUrl = `${process.env.REACT_APP_API_BASE_URL}/updateStationary`;

     
    const [addFormShow,setAddFormShow] = useState(false);
    const [deleteShow,setdeleteShow] = useState(false);


    const [files,setFiles] = useState(null);

    const fileTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];

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
      setupdateDoc({});
      setAddFormShow(!addFormShow);
    }

    const closeEditForm = () => {
      setFormStatus(true);
      setAddFormShow(!addFormShow);
      setupdateDoc({
        title: "",
        price: 0,
        author: "",
        bookPublication: "",
        pubDate: "",
        edition: "",
        language: "",
        discount: 0,
        elementType: "",
        bookDesc: "",
        stationaryUrl: "",
    });
    }
    console.log(updateDoc);
    
    const editForm = (stationaryDoc) => {
      setFormStatus(false);
      setAddFormShow(!addFormShow);
      setupdateDoc(stationaryDoc);
    }

    const deleteConform = (stationaryDoc) => {
      setdeleteShow(!deleteShow);
      setDeleteDoc(stationaryDoc);
    }

    const handleDeleteNo = () => {
      setdeleteShow(!deleteShow);
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

    const handleUpdateSubmit = async (event) => {
      event.preventDefault();
      const promise = new Promise(async (resolve,reject) => {
        const editDoc = await fetch(editStationaryUrl,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateDoc)
        });
        if(editDoc.ok){
          resolve("Stationary Updated!!");
        }
        else{
          reject("Failed to Update Stationary!!");
        }
      });
      toast.promise(promise, {
        success: "Stationary updated successfully",
        error: "Failed to update Stationary!",
        pending: "Saving data...",
      });
    }

    const handleDelete = async (event) => {
      event.preventDefault();
      const promise = new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, deleteDoc.stationaryUrl );
        deleteObject(storageRef).then(async () => {
          await fetch(deleteStationaryUrl,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            const newData = stationary.filter(data => data._id !== deleteDoc._id );
            setStationary(newData);
            handleDeleteNo();

            if(response.ok) {
              resolve("Stationary Deleted Successfully");
            }else {
              reject("Stationary not found!");
            }
          })

        }).catch((error) => {
          console.log("Image Delete error", error);
        })
      });
      toast.promise(promise, {
        pending: "Saving data...",
        success: "Stationary deleted successfully",
        error: "Failed to delete Stationary!",
      });
    };

    const elementData = ["stationery","notebook"];

    useEffect(() => {
        fetchStationary();
        window.scrollTo(0, 0);
    },[]);

  return (
    <div className='stationary-admin'>
        <div className='delete-background'></div>
        <div className={`addStationaryDiv ${addFormShow ? '': "display-none"} `}>
            <div className="addStationary-heading">
              {
                formStatus?<h2 className='addStationaryHeading'>Add Stationaries</h2>:
                <h2 className='addStationaryHeading'>Update Stationary</h2>
              }
                <button className='addStationaryClose' onClick={closeEditForm}>
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
                {
                  formStatus?<button onClick={handleSubmit} className='addBookBtn' >Submit</button>:
                  <button onClick={handleUpdateSubmit} className='addBookBtn' >Update</button>
                }
            </form>
        </div>

        <div className="addEdit-stationaryDiv">
            <button className="addStationary-button" onClick={toggleForm}>
                Add Stationary +
            </button>
        </div>

        <div className={`deleteForm ${deleteShow ? '' : "display-none" }`}>
          <button onClick={deleteConform}  className="deleteFormClose"> <ImCross/> </button>
            <div className='deleteFormContent' >
              <p className='deleteFormHeading'>Confirm Delete? </p>
              <div className='deleteFormButton'>
                <button className='deleteBoxBtn deleteYesBtn' onClick={handleDelete} >Yes</button>
                <button className='deleteBoxBtn deleteNoBtn' onClick={handleDeleteNo} >No</button>
              </div>
            </div>
        </div>

        <div className="admin-stationaryItems-div">
        {
                stationary ?
                    stationary.length>0? 
                        stationary.map(statData => (
                                <ProductCard2
                                    link={`/stationery/${statData._id}`}
                                    name={getTitle(statData.title)}
                                    price={statData.price}
                                    discount={statData.discount}
                                    deleteBtn={"show"}
                                    deleteFun={deleteConform}
                                    bookDoc={statData}
                                    editBtn={"show"}
                                    editFun={editForm}
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