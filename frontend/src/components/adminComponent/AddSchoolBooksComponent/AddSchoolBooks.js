import React, { useEffect, useState } from 'react';
import "./AddSchoolBooks.css";
import {getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage'
import {storage} from '../../../firebase';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const AddSchoolBooks = () => {
  const {currentUser} = useAuth();
  const [userDoc,setUserDoc] = useState([]);

  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
  const postBook = `${process.env.REACT_APP_API_BASE_URL}/addBook`;

  const booksClass = [1,2,3,4,5,6,7,8,9,10,11,12];
  const elementData = ["book","noteBook","stationery"];
  const [schoolDoc,setSchoolDoc] = useState([]);
  const [title,setTitle] = useState('');
  const [bookPublication,setBookPublication] = useState('');
  const [author,setAuthor] = useState('');
  const [edition,setEdition] = useState('');
  const [pubDate,setPubDate] = useState('');
  const [language,setLanguage] = useState('');
  const [schoolName,setSchoolName] = useState('');
  const [subject,setSubject] = useState('');
  const [bookClass,setBookClass] = useState('');
  const [price,setPrice] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [elementType,setElementType] = useState('');
  const [bookDesc,setBookDesc] = useState('');

  const [files,setFiles] = useState(null);

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
  }


  useEffect(() => {
    setUserDoc(currentUser);
    fetchSchools();
  },[currentUser]);


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
    if(title !== '' && bookPublication !== '' && author !== '' && edition !== ''&& pubDate !== '' && language !== '' && schoolName !== '' && subject !== '' && bookClass !== '' && price !== '' && bookDesc !== '' && files !== null ) {
      const promise = new Promise(async (resolve,reject) => {
        const storageRef = ref(storage, 'books/' + getFileName());
        const fileUpload = await uploadBytesResumable(storageRef, files);
    
        if(fileUpload.state === "success") {
          await getDownloadURL(storageRef).then( async (downloadURL) => {
            // data.set('bookImg', downloadURL);
            const bookDoc = await fetch(postBook, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                bookPublication,
                author,
                edition,
                pubDate,
                language,
                schoolName,
                subject,
                bookClass,
                price,
                discount,
                elementType,
                bookDesc,
                bookImg: downloadURL })
            });
            if (bookDoc.ok) {
              resolve("Book added!");
            } else {
              reject("Failed to add book!")
            }
  
          });
  
        }else{
          toast.error("error in uploading image!");
        }
      });
      toast.promise(promise, {
        pending: "Saving data...",
        success: "Book added successfully",
        error: "Failed to add book!",
      });
      
      
    }
    else {
      toast.error("Missing Some Data", {
        autoClose: 2000
      })
    }
    
    
  }  
  
  return (
    <div className='addBooksContainer'>
        {(userDoc.accType === 1 ) ? (
          <>
            <center><h2>Add Books</h2></center>
            <form action="#" className='addBooksForm' >
                <input className='addBooksInp' name='title'       onChange={(e) => setTitle(e.target.value) } type="text" placeholder='title'/>
                <input className='addBooksInp' name='author'      onChange={e => setAuthor(e.target.value) } type="text" placeholder='author'/>
                <input className='addBooksInp' name='publication' onChange={e => setBookPublication(e.target.value) } type="text" placeholder='publication'/>
                <input className='addBooksInp' name='pubDate'     onChange={e => setPubDate(e.target.value) } type="text" placeholder='publication date'/>
                <input className='addBooksInp' name='edition'     onChange={e => setEdition(e.target.value) } type="text" placeholder='edition'/>
                <input className='addBooksInp' name='language'    onChange={e => setLanguage(e.target.value) } type="text" placeholder='language'/>
                <input className='addBooksInp' name='subject' onChange={e => setSubject(e.target.value) } type="text" placeholder='subject'/>
                <select className='addBooksInp'  onChange={e => setSchoolName(e.target.value) }  name="schoolName" id="">
                    <option value="">select school</option>
                    {schoolDoc.map((school,index) => (
                        <option key={index} id={school._id} value={school._id}>{school.schoolName}</option>
                    ))}
                </select>
                <input className='addBooksInp' onChange={e => setPrice(e.target.value) } name='price' type="number" placeholder='price'/>
                <select className='addBooksInp'  onChange={e => setBookClass(e.target.value) } name="bookClass" id="">
                    <option  value="">select class</option>
                    {booksClass.map((bookClass) => (
                        <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                </select>
                <input className='addBooksInp' onChange={e => setDiscount(e.target.value) } name='discount' type="number"  placeholder='discount'/>
                <select className='addBooksInp'  onChange={e => setElementType(e.target.value) } name="bookClass" id="">
                    <option  value="">select type</option>
                    {elementData.map((bookClass) => (
                        <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                </select>
                <textarea className='addBooksInp addBookDesc' onChange={e => setBookDesc(e.target.value) } name="bookDesc" id="" rows="4" placeholder='book description'></textarea>
                <input className='addBooksInp addBooksFile' onChange={handleChange} placeholder='no image' name='bookImg'  type="file" />
                    
                <button onClick={handleSubmit} className='addBookBtn' >Submit</button>
            </form>
          </>
        ) : (
        <div className='notPermission'>
          <center><h2>You Don't have Admin Permissions</h2></center>
          <center><Link to="/" className='backHome'>Back to Home</Link></center>
        
    </div>
        )}
        
    </div>
  )
}

export default AddSchoolBooks