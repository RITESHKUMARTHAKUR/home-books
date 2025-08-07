import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./School.css";
import {toast} from 'react-toastify';
import {useAuth} from "../../contexts/AuthContext";
import OrderBox from "../helpers/orderConfirmation/OrderConfirm";
// import SchoolImg from "../../images/school.jpg";


const School = () => {
  const { id } = useParams();
  const {currentUser} = useAuth();
  const Navigate = useNavigate();

  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool/${id}`;
  const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchoolBooks/${id}`;

  const createOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/createOrder`;
  
  const[userDoc,setUserDoc] = useState({
    address: "",
    contact: "",
    email:"",
    name:""
  });

  const [schoolInfo, setSchoolInfo] = useState([]);
  const [selectAllValue,setSelectAllValue] = useState(false);

  //All Books List
  const [schoolBooks, setSchoolBooks] = useState([]);  
  //Filtered Books
  const [schoolBooksDoc, setSchoolBooksDoc] = useState([]); 

  //Selected Books
  const [selectedBooks,setSelectedBooks] = useState([]);

  //Selected Class For Filter
  const [selectedBookClass,setSelectedBookClass] = useState("1");

  //Distinct Class List 
  const [distinctBookClass,setDistinctBookClass] = useState([]);

  const [boxVisible,setBoxVisible] = useState(false);

  const fetchSchool = async () => {
    await fetch(getSchoolUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        response.json().then(schoolDoc =>  {
          setSchoolInfo(schoolDoc)
        }
        );
    })
  }

  const fetchSchoolBooks = async () => {
    await fetch(getSchoolBooksUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        response.json().then(schoolDoc =>{
          let responseDoc = schoolDoc.map( shoolData => ({...shoolData, selected: false }))
          setSchoolBooks(responseDoc);
          let disttClass = [...new Set(responseDoc.map(book => book.bookClass))];
          setDistinctBookClass(disttClass);
          let newArray = disttClass.sort((a,b) => a - b );
          let booksList = responseDoc.filter((x) => x.bookClass === newArray[0] )
          setSchoolBooksDoc(booksList);
        }
        )
    });
  }

  const handleSelectAllBtn = (docList) => {
    if(docList.length === 0) {
      setSelectAllValue(false);
    }
    else{
      const hasFalse = docList.some(x => x.selected === false );
      if (hasFalse) {
        setSelectAllValue(false);
      }
      else{
        setSelectAllValue(true);
      }
    }
    
    // docList.map(x => {
    //   if(x.selected === false ) {
    //     setSelectAllValue(false);
    //   }else{
    //     setSelectAllValue(true);
    //   }
    // })
  }


  const showFilteredBooks = () => {
    let booksList = schoolBooks.filter((x) => x.bookClass === selectedBookClass )
    setSchoolBooksDoc(booksList);

    handleSelectAllBtn(booksList);
  }

  const handleSelectAll = () => {
    const selectedId = schoolBooksDoc.map((x) => x._id  );
    setSelectAllValue((prevSelectAllValue) => {
      
      const updatedSelectAllValue = !prevSelectAllValue;

      
      const updatedArray = schoolBooks.map((obj) => {
          
          if (selectedId.includes(obj._id)) {
              if(updatedSelectAllValue === false) {
                obj.selected = false;
              }else{
                obj.selected = true;
              }
            
          }
          return obj;
      });

      setSchoolBooks(updatedArray);
      // console.log(updatedArray);
     
      return updatedSelectAllValue;
    });

    // const selectedId = schoolBooksDoc.map((x) => x._id  );
    // const updatedArray = schoolBooks.map(obj => {
    //   if(selectedId.includes(obj._id)){
    //     console.log(selectAllValue);
    //     if(selectAllValue === false) {
    //       obj.selected = false;
    //     }else{
    //       obj.selected = true;
    //     }
    //   }
    //   return obj;
    // });
    // setSchoolBooks(updatedArray);
    // console.log(updatedArray);


  }

  const handleSelect = (bookId) => {
    let bookIndex = schoolBooks.findIndex(obj => obj._id === bookId );
    let bookDocIndex = schoolBooksDoc.findIndex( obj => obj._id === bookId );

    if(bookIndex !== -1) {
      const updatedObject = {...schoolBooks[bookIndex]};
      updatedObject.selected = !updatedObject.selected;

      const updatedSchoolBooksArray = [...schoolBooks];
      updatedSchoolBooksArray[bookIndex] = updatedObject;
      setSchoolBooks(updatedSchoolBooksArray);

      const updatedBookDocsArray = [...schoolBooksDoc];
      updatedBookDocsArray[bookDocIndex] = updatedObject;
      setSchoolBooksDoc(updatedBookDocsArray);

      handleSelectAllBtn(updatedBookDocsArray);
    }
  }

  const handleCancel = () => {
    setBoxVisible(!boxVisible)
  }

  const handleConfirm = async (selectedArray,orderTotal) => {
    if(!selectedArray.length > 0) return;
    const orderResponse = await fetch(createOrderUrl,{
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userDoc,selectedArray,orderTotal}) 
    });

    if(orderResponse.status === 200 ){
      toast.success("Order Created!");
      Navigate("/orders");
      
    }else {
      toast.error("Failed to Create Order!")
    }
  

  }


  const handleBuyNow = () => {
    if(currentUser) {
      setUserDoc(currentUser);

      let selectedList = schoolBooks.filter( book => ( book.selected === true ));
      setSelectedBooks(selectedList);
      setBoxVisible(!boxVisible);
      // console.log(currentUser);
    }else {
      Navigate("/login");
    }
    
  }

  

  useEffect(()=> {
    showFilteredBooks();
  },[selectedBookClass]);

  
  const handleClassChange = (e) => {  
    setSelectedBookClass(e.target.value);
  }


  const handleUserAddressChange = (addValue) => {
    const updatedUserDetails = {...userDoc, address: addValue };
    setUserDoc(updatedUserDetails);
  };

  useEffect(() => {
      fetchSchool();
      fetchSchoolBooks();
      window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className="schoolContainer">
      <OrderBox 
        boxVisible={boxVisible}  
        userName={userDoc.name} 
        userEmail={userDoc.email} 
        userContact={userDoc.contact} 
        userAddress={userDoc.address} 
        userBooks={selectedBooks}
        onUserAddressChange={handleUserAddressChange} 
        cancelBtn={handleCancel} 
        confirmBtn={handleConfirm} 
      />
     
      <div className="schoolBannerContainer">
        <div className="schoolImgBanner">
          {/* <img src={`${process.env.REACT_APP_API_BASE_URL + "/" + schoolInfo.schoolImg}`} alt="" /> */}
          <img src={`${schoolInfo.schoolImg}`} alt="" />
        </div>
        <div className="schoolContent">
          <div className="schoolContentUp">
            <h2>{schoolInfo.schoolName}</h2>
            <hr />
            <h5>{schoolInfo.location}</h5>
            <h5>{schoolInfo.district}, {schoolInfo.schoolState} {schoolInfo.pincode}</h5>
          </div>
          <div className="schoolContentDown">
            <div className="displayBox">
              <h5>Affilated By</h5>
              <hr />
              <h5>{schoolInfo.affilated} Board</h5>
            </div>
            <div className="displayBox">
              <h5>Medium</h5>
              <hr />
              <h5>{schoolInfo.medium}</h5>
            </div>
          </div>
        </div>
      </div>
      {/* {selectAllValue + 1 === 1? "false": "true" } */}
      <div className="schoolBooksContainer">
        {schoolBooks.length>0 ? 
        <>
        <table class="schoolTable">
          <thead>
            <tr className="tableBorderRadius">
              <th className="tableBorderRadius" scope="col" colSpan="6">
                <select className="tableSelect" name="" id=" " onChange={(e) => handleClassChange(e)} >
                  {distinctBookClass.map((bookDistinctClass) => ( 
                    <option className="tableSelect" value={`${bookDistinctClass}`}>Class {bookDistinctClass}</option> 
                  ) )}
                </select>
              </th>
              {/* <th className='tableBorderRadiusRight' scope="col"  colSpan="4">
                
              </th> */}
            </tr>
          </thead>
          <div style={{ height: "1em" }}></div>
          <tbody>
            <tr>
              <th className="borderLeft" aria scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col" style={{textAlign:"center"}}>Publication</th>
              <th scope="col" style={{textAlign:"center"}}>Author</th>
              <th scope="col" style={{textAlign:"center"}}>Price</th>
              <th className="borderRight" scope="col">
                <label htmlFor="selectAll"></label>
                <input onClick={handleSelectAll} checked={selectAllValue} type="checkbox" name="selectAll" id="" />
              </th>
            </tr>
            {schoolBooksDoc.map( (bookList, index) => ( 
              <tr>
                <th scope="row">{index+1}</th>
                <td className="schoolTableBookTitle">{bookList.title}</td>
                <td style={{textAlign:"center"}}>{bookList.bookPublication}</td>
                <td style={{textAlign:"center"}}>{bookList.author}</td>
                {bookList.discount? 
                <td style={{textAlign:"center", padding:"0 30px"}}><span style={{textDecoration: "line-through", color:"gray"}}>&#8377;{bookList.price}</span>&nbsp;&#8377;{bookList.price - bookList.discount} </td>
                : 
                <td style={{textAlign:"center", padding:"0 30px"}}> &#8377; {bookList.price} </td>
                }
                <td>
                  <input 
                  checked={bookList.selected} 
                  onClick={ (e) =>  handleSelect(bookList._id) } 
                  type="checkbox" />
                  </td>
              </tr>
            ))}
            
          </tbody>
        </table> 
        <div className="tableBuy">
        <button onClick={handleBuyNow} className="tableBtnBuy">Buy Now</button>
      </div>
      </>
        : 
        <center>No data</center>
         }
        
        
      </div>
    </div>
  );
};

export default School;
