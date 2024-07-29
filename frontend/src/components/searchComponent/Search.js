import React, { useEffect, useState } from 'react';
import './Search.css';
import { toast } from "react-toastify";
import {Link, useParams} from 'react-router-dom';
import { FaFileImage } from "react-icons/fa6";
import BookImg from "../../images/phys_book.jpg";
import {useAuth} from '../../contexts/AuthContext';
import SchoolCard from '../schoolComponent/schoolCard/schoolCard';
import BooksCard from '../homeComponent/productCard2/ProductCard2';

const Search = () => {
    const {currentUser} = useAuth();
    const { searchId } = useParams();
  
    const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
    const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getBooks`;
    const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;

    const [schoolDoc,setSchoolDoc] = useState([]);
    const [booksDoc,setBooksDoc] = useState([]);

    const [showSchoolDoc,setShowSchoolDoc] = useState([]);
    const [showBooksDoc,setShowBooksDoc] = useState([]);

    function getRandomItems(array) {
        const shuffledArray = [...array]; // Create a copy of the original array
        let currentIndex = shuffledArray.length;
        let temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = shuffledArray[currentIndex];
          shuffledArray[currentIndex] = shuffledArray[randomIndex];
          shuffledArray[randomIndex] = temporaryValue;
        }
        // Return the first 'count' elements from the shuffled array
        setShowBooksDoc(shuffledArray.slice(0, 5));
    }

    const searchObjects = () =>  {
      const searchQuery = searchId.toLowerCase();
      const schoolResults = [];
      const bookResults = [];
      
      schoolDoc.forEach(obj => {
        // Iterate over each key in the object
        Object.keys(obj).forEach(key => {
          // Check if the key's value contains the input string (case-insensitive)
          if (obj[key].toString().toLowerCase().includes(searchQuery)) {
            // If found, add the object to the results array
            schoolResults.push(obj);
            // Break out of the loop for this object
            return;
          }
        });
      });


      booksDoc.forEach(obj => {
        // Iterate over each key in the object
        Object.keys(obj).forEach(key => {
          // Check if the key's value contains the input string (case-insensitive)
          if (obj[key].toString().toLowerCase().includes(searchQuery)) {
            // If found, add the object to the results array
            bookResults.push(obj);
            // Break out of the loop for this object
            return;
          }
        });
      });


      let disttSchool = [...new Set(schoolResults.map(school => school))];
      let disttBook = [...new Set(bookResults.map(book => book))];
      
      setShowSchoolDoc(disttSchool);
      setShowBooksDoc(disttBook);
      
    }

    const fetchBooks = async () => {
        await fetch(getSchoolBooksUrl, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
            if (response.status !== 200) {
              toast("No school found!");
            }else {
              response.json().then(booksInfo => {
                setBooksDoc(booksInfo);
                getRandomItems(booksInfo);
              })
            }
        })
    };
    
    const fetchSchools = async () => {
        await fetch(getSchoolUrl, {
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
                    setShowSchoolDoc(schoolInfo);
                })
            }
        })
    };

    const getTitle = (titleString) => {
        if(titleString.length > 16){
          return titleString.slice(0,16) + "...";
        }else{
            return titleString;
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
        fetchSchools();
        fetchBooks()
    },[]);

    useEffect(() => {
      if(searchId) {
        searchObjects();
      }else {
        setShowSchoolDoc(schoolDoc);
        getRandomItems(booksDoc);
      }
    }, [searchId, schoolDoc, booksDoc]); 
    return (
        <div className='searchContainer'>
            { window.innerWidth > 992 && <div className="searchInputContainer">
                <input 
                    className='searchInputBar' 
                    type="text" 
                    placeholder='search for books or schools'
                    // onChange={  }
                />
                <Link className='searchUpload' to="/uploadBookList" >
                    {window.innerWidth < 992 ? 
                        <FaFileImage />
                        :   
                        <> Upload Book list <FaFileImage /></>
                    }
                    
                </Link>
            </div>}
            <div className="searchResultContainer">
                <div className="searchSchoolContainer">
                    {showSchoolDoc && showSchoolDoc.map(schoolInfo => (
                        <SchoolCard 
                            link={`/school/${schoolInfo._id}`}
                            img={schoolInfo.schoolImg}
                            title={schoolInfo.schoolName}
                            address={schoolInfo.area}
                        />
                    ))

                    }
                </div>
                <div className="searchBooksContainer">
                        {showBooksDoc && showBooksDoc.map((booksInfo) => (
                            <BooksCard 
                                link={`/product/${booksInfo._id}`}
                                off={25}

                                img={getImage(booksInfo.bookImg)}
                                name={getTitle(booksInfo.title)}
                                price={booksInfo.price}
                                discount={booksInfo.discount}
                            />
                        ))}
                </div>   
            </div>
            {
              showSchoolDoc.length === 0 && showBooksDoc.length === 0 ? 
                <h5>No results</h5>
              : null
            }
        </div>
    )
}

export default Search