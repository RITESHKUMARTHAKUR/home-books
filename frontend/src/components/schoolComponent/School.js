import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./School.css";
import OrderBox from "../helpers/orderConfirmation/OrderConfirm";
// import SchoolImg from "../../images/school.jpg";


const School = () => {
  const { id } = useParams();
  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool/${id}`;
  const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchoolBooks/${id}`;
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
          let booksList = responseDoc.filter((x) => x.bookClass === "1" )
          setSchoolBooksDoc(booksList);
        }
        )
    });
  }

  const handleSelectAllBtn = (docList) => {
   
    docList.map(x => {
      if(x.selected === false ) {
        setSelectAllValue(false);
      }
      else{
        setSelectAllValue(!selectAllValue);
      }

    })
  }


  const showFilteredBooks = () => {
    let booksList = schoolBooks.filter((x) => x.bookClass === selectedBookClass )
    setSchoolBooksDoc(booksList);

    handleSelectAllBtn(booksList);
  }

  const handleSelectAll = () => {
    setSelectAllValue(!selectAllValue);
    const selectedId = schoolBooksDoc.map((x) => x._id  );
    const updatedArray = schoolBooks.map(obj => {
      if(selectedId.includes(obj._id)){
        obj.selected = !obj.selected;
      }
      return obj;
    });
    setSchoolBooks(updatedArray);
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

  const handleConfirm = () => {
    selectedBooks.map( book => {
      console.log(book.title);
    } )
  }
  const handleBuyNow = () => {
    let selectedList = schoolBooks.filter( book => ( book.selected === true ));
    setSelectedBooks(selectedList);
    setBoxVisible(!boxVisible);
  }

  

  useEffect(()=> {
    showFilteredBooks();
  },[selectedBookClass]);

  
  const handleClassChange = (e) => {  
    setSelectedBookClass(e.target.value);
  }

  useEffect(() => {
      fetchSchool();
      fetchSchoolBooks();
  }, [])
  
  return (
    <div className="schoolContainer">
      <OrderBox boxVisible={boxVisible}  cancelBtn={handleCancel} confirmBtn={handleConfirm} />
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
      {/* {selectAllValue + 1} */}
      <div className="schoolBooksContainer">
        {schoolBooks.length>0 ? 
        <>
        <table class="schoolTable">
          <thead>
            <tr className="tableBorderRadius">
              <th className="tableBorderRadius" scope="col" colSpan="6">
                <select name="" id=" " onChange={(e) => handleClassChange(e)} >
                  {distinctBookClass.map((bookDistinctClass) => ( 
                    <option value={`${bookDistinctClass}`}>Class {bookDistinctClass}</option> 
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
              <th className="borderLeft" scope="col">
                S.No.
              </th>
              <th scope="col">Name</th>
              <th scope="col">Publication</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th className="borderRight" scope="col">
                <label htmlFor="selectAll"></label>
                <input onClick={handleSelectAll} checked={selectAllValue} type="checkbox" name="selectAll" id="" />
              </th>
            </tr>
            {schoolBooksDoc.map( (bookList, index) => ( 
                <tr>
                <th scope="row">{index+1}</th>
                <td>{bookList.title}</td>
                <td>{bookList.bookPublication}</td>
                <td>{bookList.author}</td>
                <td> &#8377; {bookList.price} </td>
                <td>
                  {" "}
                  <input checked={bookList.selected} onClick={ (e) =>  handleSelect(bookList._id) } type="checkbox" />{" "}
                </td>
              </tr>
            ) )}
            
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
