import React from "react";
import { useParams } from "react-router-dom";
import "./School.css";
import SchoolImg from "../../images/school.jpg";

const School = () => {
  const { id } = useParams();
  return (
    <div className="schoolContainer">
      <div className="schoolBannerContainer">
        <div className="schoolImgBanner">
          <img src={SchoolImg} alt="" />
        </div>
        <div className="schoolContent">
          <h3>M.G.M School </h3>
          <hr />
          <h3>Sector 6 Bhilai Nagar</h3>
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
      </div>
    </div>
  );
};

export default School;
