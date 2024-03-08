import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./School.css";
import SchoolImg from "../../images/school.jpg";

const School = () => {
  const { id } = useParams();
  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool/${id}`;
  const [schoolInfo, setSchoolInfo] = useState([]);

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
  useEffect(() => {
      fetchSchool();
  }, [])
  
  return (
    <div className="schoolContainer">
      <div className="schoolBannerContainer">
        <div className="schoolImgBanner">
          <img src={SchoolImg} alt="" />
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
                <input type="checkbox" name="selectAll" id="" />
              </th>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Simplified Physics</td>
              <td>NCRT</td>
              <td>Lorem ipsum sit amet.</td>
              <td> &#8377; 1000 </td>
              <td>
                {" "}
                <input type="checkbox" />{" "}
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Chemistry N.C.E.R.T</td>
              <td>NCRT</td>
              <td>Lorem ipsum dolor sit amet.</td>
              <td> &#8377; 800 </td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="bookCheckbox"
                  checked=""
                />{" "}
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Simplified Mathematics</td>
              <td>NCRT</td>
              <td>Lorem ipsum dolor sit amet.</td>
              <td> &#8377; 1200 </td>
              <td>
                
                <input
                  type="checkbox"
                  className="bookCheckbox"
                  checked=""
                />
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>R.D Sharma</td>
              <td>NCRT</td>
              <td>Lorem ipsum dolor sit amet.</td>
              <td> &#8377; 500 </td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="bookCheckbox"
                  checked=""
                />{" "}
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Simplified Physics</td>
              <td>NCRT</td>
              <td>Lorem ipsum dolor sit amet.</td>
              <td> &#8377; 850 </td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="bookCheckbox"
                  checked=""
                />{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tableBuy">
          <button className="tableBtnBuy">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default School;
