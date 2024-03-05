import React, { useEffect, useState } from 'react';
import "./AddSchoolBooks.css";
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AddSchoolBooks = () => {
  const {currentUser} = useAuth();
  const [userDoc,setUserDoc] = useState([]);
  const Navigate = useNavigate();

  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
  const postBook = `${process.env.REACT_APP_API_BASE_URL}/addBook`;

  const booksClass = [1,2,3,4,5,6,7,8,9,10,11,12];
  const [schoolDoc,setSchoolDoc] = useState([]);
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [edition,setEdition] = useState('');
  const [pubDate,setPubDate] = useState('');
  const [language,setLanguage] = useState('');
  const [schoolName,setSchoolName] = useState('');
  const [subject,setSubject] = useState('');
  const [bookClass,setBookClass] = useState('');
  const [price,setPrice] = useState(0);
  const [discount,setDiscount] = useState(0);
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

  useEffect(() => {
    if(currentUser) {
        setUserDoc(currentUser);
        fetchSchools();
    }else {
        Navigate("/login");
    }
},[currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('author', author);
    data.set('edition', edition);
    data.set('pubDate', pubDate);
    data.set('language', language);
    data.set('schoolName', schoolName);
    data.set('subject', subject);
    data.set('bookClass', bookClass);
    data.set('price', price);
    data.set('discount', discount);
    data.set('bookDesc', bookDesc);
    data.set('bookImg', files[0]);

    if(title !== '' && author !== '' && edition !== ''&& pubDate !== '' && language !== '' && schoolName !== '' && subject !== '' && bookClass !== '' && price !== '' && bookDesc !== '' && files !== null ) {
      const bookDoc = await fetch(postBook, {
        method: 'POST',
        body: data
      });
      if (bookDoc.ok) {
        toast.success("Book added!");
        // setTimeout(
        //   window.location.reload()
        // , 1500)
        
      }else {
        toast.error("Failed to add book!")
      }
    }else {
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
                <input className='addBooksInp' name='title'    onChange={e => setTitle(e.target.value) } type="text" placeholder='title'/>
                <input className='addBooksInp' name='author'   onChange={e => setAuthor(e.target.value) } type="text" placeholder='author'/>
                <input className='addBooksInp' name='edition'  onChange={e => setEdition(e.target.value) } type="text" placeholder='edition'/>
                <input className='addBooksInp' name='pubDate'  onChange={e => setPubDate(e.target.value) } type="text" placeholder='publication date'/>
                <input className='addBooksInp' name='language' onChange={e => setLanguage(e.target.value) } type="text" placeholder='language'/>
                <select className='addBooksInp'  onChange={e => setSchoolName(e.target.value) }  name="schoolName" id="">
                    <option value="">select school</option>
                    {schoolDoc.map((school,index) => (
                        <option key={index} id={school._id} value={school._id}>{school.schoolName}</option>
                    ))}
                </select>
                <input className='addBooksInp' name='subject' onChange={e => setSubject(e.target.value) } type="text" placeholder='subject'/>
                <select className='addBooksInp'  onChange={e => setBookClass(e.target.value) } name="bookClass" id="">
                    <option  value="">select class</option>
                    {booksClass.map((bookClass) => (
                        <option key={bookClass} value={bookClass}>{bookClass}</option>
                    ))}
                </select>
                <input className='addBooksInp' onChange={e => setPrice(e.target.value) } name='price' type="number" placeholder='price'/>
                <input className='addBooksInp' onChange={e => setDiscount(e.target.value) } name='discount' type="number"  placeholder='discount'/>
                <textarea className='addBooksInp addBookDesc' onChange={e => setBookDesc(e.target.value) } name="bookDesc" id="" rows="4" placeholder='book description'></textarea>
                <input className='addBooksInp addBooksFile' onChange={(e) => setFiles(e.target.files)} placeholder='no image' name='bookImg'  type="file" />
                    
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