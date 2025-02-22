import React, { useEffect, useState } from 'react';
import "./EditSchoolBooks.css";
import { useAuth } from '../../../contexts/AuthContext';
import { storage } from '../../../firebase';
import BookImg from "../../../images/phys_book.jpg"
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ProductCard2 from '../../homeComponent/productCard2/ProductCard2';
import { ImCross } from 'react-icons/im';

const EditSchoolBooks = () => {
    const { currentUser } = useAuth();
    const[deleteDoc,setDeleteDoc] = useState({}); //useState to hold doc for deleteing object
    const[updateDoc,setupdateDoc] = useState({}); //useState to hold single doc before updating 

    const [userDoc,setUserDoc] = useState([]);
    const [booksDoc,setBooksDoc] = useState([]);
    const [editFormShow,setEditFormShow] = useState(false);
    const [deleteShow,setdeleteShow] = useState(false);

    const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
    const editBookUrl = `${process.env.REACT_APP_API_BASE_URL}/updateBook`;
    const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getBooks`;
    const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;
    const deleteBookUrl = `${process.env.REACT_APP_API_BASE_URL}/deleteBook/${deleteDoc._id}`;

    const booksClass = [1,2,3,4,5,6,7,8,9,10,11,12];
    const elementData = ["book","noteBook","stationery"];
    const [schoolDoc,setSchoolDoc] = useState([]);
    const [files,setFiles] = useState(null);

    const fileTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
    ];

    const handleUpdate = (e) => {
      const {name,value} = e.target;
      setupdateDoc({...updateDoc,[name]: value});
    }


    const editForm = (booksDoc) => {
      setEditFormShow(!editFormShow);
      setupdateDoc(booksDoc);
    }

    const closeEditForm = () => {
      setEditFormShow(!editFormShow);
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
      const promise = new Promise(async (resolve,reject) => {
        const editDoc = await fetch(editBookUrl,{
          method:'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateDoc)
        });
        if(editDoc.ok){
          resolve("Book Updated!!");
        }
        else{
          reject("Failed to add Book!!")
        }
      });
      toast.promise(promise, {
        success: "Book updated successfully",
        error: "Failed to update book!",
        pending: "Saving data...",
      });
      
    }

    const handleDelete = async (event) => {
      event.preventDefault();
      const promise = new Promise(async (resolve,reject) => {
        const storageRef = ref(storage, deleteDoc.bookImg );
        deleteObject(storageRef).then(async () => {
          await fetch(deleteBookUrl,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            const newData = booksDoc.filter(data => data._id !== deleteDoc._id );
            setBooksDoc(newData);
            handleDeleteNo();

            if(response.ok) {
              resolve("Book Deleted Successfully!");
            };


          })

        }).catch((error) => {
          console.log("Image Delete error", error);
        })
      });
      toast.promise(promise, {
        pending: "Saving data...",
        success: "Book deleted successfully",
        error: "Failed to delete book!",
      });

    }
  
    const deleteConform = (booksDoc) => {
      setdeleteShow(!deleteShow);
      setDeleteDoc(booksDoc);
    }

    const handleDeleteNo = () => {
      setdeleteShow(!deleteShow);
    }

    const fetchBooks = async () => {
      await fetch(getSchoolBooksUrl, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status !== 200) {
            toast("No school found!");
        }else {
            response.json().then(booksInfo => {
              setBooksDoc(booksInfo);
            })
        }
      });
      window.scrollTo(0, 0);
    };

    const fetchSchools = () => {
        fetch(getSchoolUrl, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json"
          }
        }).then(response => {
          if (response.status !== 200) {
              toast("No school found!");
          }else {
              response.json().then(schoolInfo => {
                  setSchoolDoc(schoolInfo);
              })
          }
        })
    };

    const getTitle = (titleString) => {
      if(titleString.length > 16){
        // return titleString
        return titleString.slice(0,25)+ "...";
      }else{
        return titleString
      }
    } 
    const getImage = (productImage) => {
      if(productImage.slice(0,1) === "u") {
        return BookImg;
      }
      else {
        return productImage;
      }
    }

    const handleAddToCart = async (productId) => {
      const bookId = productId;
      if(currentUser){
        const bookIndex = booksDoc.findIndex( obj => obj._id === bookId );
        const bookDetails = booksDoc[bookIndex];
      
        const cartDoc = await fetch(addCartUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({bookDetails,currentUser})
        });
        if(cartDoc.status === 200 ){
          toast.success("Added to Cart!");
          
        }else {
          toast.error("Failed to add!");
        }
  
      }else{
        toast.error("Login First!")
      }
    
    }

    useEffect(() => {
        setUserDoc(currentUser);
        fetchSchools();
        fetchBooks();
    },[currentUser]);

  return (
    <div className='editBooksContainer'>
          <div className={`editForm ${editFormShow ? '' : "display-none" }`}>
            <div className="editFormHeading">
              <h2>Update Book</h2>
              <button onClick={closeEditForm}  className="editFormClose"> <ImCross/> </button>
            </div>
            <form action="#" className='addBooksForm editBooksForm'>
                <div className="inp-group">
                  <input className='editBooksInp' name='title'  required="required" value={updateDoc.title} onChange={(e) => handleUpdate(e)  } type="text" placeholder='title'/>
                  <label className='editBooksTitle' htmlFor="title">Title</label>
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
                <div className="inp-group">
                  <input className='editBooksInp' name='subject' value={updateDoc.subject} onChange={(e) => handleUpdate(e) } type="text" placeholder='subject'/>
                  <label className='editBooksTitle' htmlFor="title">Subject</label>
                </div>
                <div className="inp-group">
                  <select className='editBooksInp' value={updateDoc.schoolName}  onChange={(e) => handleUpdate(e) }  name="schoolName" id="">
                    <option value="">select school</option>
                    {schoolDoc.map((school) => (
                      <option key={school.schoolName} value={school._id} >{school.schoolName}</option>
                    ))}
                  </select>
                  <label className='editBooksTitle' htmlFor="title">School Name</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp'  value={updateDoc.price} onChange={(e) => handleUpdate(e) } name='price' type="number" placeholder='price'/>
                  <label className='editBooksTitle' htmlFor="title">Price</label>
                </div>
                <div className="inp-group">
                  <select className='editBooksInp' value={updateDoc.bookClass} onChange={(e) => handleUpdate(e) } name="bookClass" id="">
                    <option  value="">select class</option>
                    {booksClass.map((bookClass) => (
                      <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                  </select>
                  <label className='editBooksTitle' htmlFor="title">Book Class</label>
                </div>
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
                  <label className='editBooksTitle' htmlFor="title">Book Description</label>
                </div>
                <div className="inp-group">
                  <input className='editBooksInp addBooksFile' onChange={handleChange} placeholder='no image' name='bookImg'  type="file" />
                  <label className='editBooksTitle' htmlFor="title">Book Img</label>
                </div>
                    
                <button onClick={handleSubmit} className='addBookBtn' >Submit</button>
            </form>
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

          {/* ) : (
        <div className='notPermission'>
          <center><h2>You Don't have Admin Permissions</h2></center>
          <center><Link to="/" className='backHome'>Back to Home</Link></center>
        </div> */}
    

        <div className="edit-books">
          {
            booksDoc.map(books => (
              <ProductCard2
                link={`/product/${books._id}`}
                off={25}
                name={getTitle(books.title)}
                price={books.price}
                discount={books.discount}
                cartFun={handleAddToCart}
                deleteBtn={"show"}
                deleteFun={deleteConform}
                bookDoc={books}
                editBtn={"show"}
                editFun={editForm}
                cartId={books._id}
                img={getImage(books.bookImg)}
              />
            ))
          }

        </div>
    </div>
  )
}

export default EditSchoolBooks