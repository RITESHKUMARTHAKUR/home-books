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
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [selectedBooks,setSelectedBooks] = useState([]);
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
        response.json().then(schoolDoc =>  {
          setSchoolBooks(schoolDoc)
          // console.log(schoolDoc);
        }
        );
    })
  }

  const handleSelectAll = () => {
    // console.log("All books selected!!");
    const selectedId = schoolBooks.map((x) => x._id  );
    setSelectedBooks(selectedId);
  }
  const handleBuyNow = () => {
        setBoxVisible(!boxVisible)
  }



  useEffect(() => {
      fetchSchool();
      fetchSchoolBooks();
  }, [])

  
  return (
    <div className="schoolContainer">
      <OrderBox boxVisible={boxVisible}  cancelBtn={handleBuyNow} />
      <div className="schoolBannerContainer">
        <div className="schoolImgBanner">
          <img src={`${process.env.REACT_APP_API_BASE_URL + "/" + schoolInfo.schoolImg}`} alt="" />
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
      <div className="schoolBooksContainer">
        {schoolBooks.length>0 ? 
        <>
        <table class="schoolTable">
          <thead>
            <tr className="tableBorderRadius">
              <th className="tableBorderRadius" scope="col" colSpan="6">
                <select name="" id="">
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
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
                <input onClick={handleSelectAll} type="checkbox" name="selectAll" id="" />
              </th>
            </tr>
            {schoolBooks.map( (bookList, index) => ( 
                <tr>
                <th scope="row">{index+1}</th>
                <td>{bookList.title}</td>
                <td>{bookList.bookPublication}</td>
                <td>{bookList.author}</td>
                <td> &#8377; {bookList.price} </td>
                <td>
                  {" "}
                  <input type="checkbox" />{" "}
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
