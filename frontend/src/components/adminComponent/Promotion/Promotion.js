import React, { useEffect, useState } from "react";
import "./Promotion.css";
import { X,Plus } from 'lucide-react';
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import PromotionsCard from "./PromotionCard/PromotionCard";

const Promotion = () => {
  const Navigate = useNavigate();
  const { currentUser } = useAuth();
  const [promotionImgUrl,setPromotionImgUrl] = useState("");

  const [showAddPromotionBox,setAddPromotionBox] = useState(false);
  const [promotionId,setPromotionId] = useState("");
  const [promotionsList,setPromotionsList] = useState([]);
  
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionRedirect, setPromotionRedirect] = useState("");
  const [files, setFiles] = useState(null);
  const [promotionDesc, setPromotionDesc] = useState("");

  const addPromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/addPromotion`;
  const getPromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/getPromotions`;
  const deletePromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/deletePromotion`;
  const updatePromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/updatePromotion/${promotionId}`;
  
  const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

  const handleChange = (e) => {
    const fileUpload = e.target.files[0];
    if (fileUpload && fileTypes.includes(fileUpload.type)) {
      setFiles(e.target.files[0]);
    } else {
      setFiles(null);
      toast.error("use only specified file type!");
    }
  };

  const getFileName = () => {
    let splitName = files.name.split(".");
    let fileName = splitName[0].replace(/\s/g, "").toLowerCase();

    let dateTime = new Date();

    let time = dateTime.toLocaleTimeString().split(" ");
    let formattedTime = time[0].split(":").join("");

    let currDate = dateTime.toLocaleDateString().split(" ");
    let formattedDate = currDate[0].split("/").join("");

    let newName =
      fileName +
      "_" +
      formattedDate +
      "_" +
      formattedTime +
      time[1][0].toLowerCase() +
      "." +
      splitName[1];

    return newName;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (promotionTitle !== "" && promotionDesc !== "" && files !== null) {
      const promise = new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, "promotions/" + getFileName());
        const fileUpload = await uploadBytesResumable(storageRef, files);

        if (fileUpload.state === "success") {
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            const promotionsDoc = await fetch(addPromotionUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                promotionTitle,
                promotionImg: downloadURL,
                promotionDesc,
                promotionRedirect,
              }),
            });
            if (promotionsDoc.ok) {
              // toast.success("Promotion added!");
              resolve("Promotion added!");
              Navigate("/admin");
            } else {
              reject("Failed to add Promotion!");
              // toast.error("Failed to add Promotion!")
            }
          });
        }
      });
      toast.promise(promise, {
        pending: "Saving data...",
        success: "Data saved successfully",
        error: "Error saving data",
      });
    } else {
      toast.error("Please fill all the Details!");
    }
  };

  const updatePromotionList = (upDateDoc) => {
    const promotionIndex = promotionsList.findIndex(promotion => promotion._id === promotionId );
    promotionsList[promotionIndex] = upDateDoc;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedUrl = promotionImgUrl;

    const promise = new Promise(async (resolve, reject) => { 
      if(files) {
        const storageRef = ref(storage, "promotions/" + getFileName());
        const fileUpload = await uploadBytesResumable(storageRef, files);

        if (fileUpload.state === "success") {
          await getDownloadURL(storageRef).then(downloadURL => {  
            updatedUrl = downloadURL;
          });
        }
      }

      const updateDoc = await fetch(updatePromotionUrl, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          promotionTitle,
          promotionImg: updatedUrl,
          promotionDesc,
          promotionRedirect,
        })  
      });
      const data = await updateDoc.json();
        if(updateDoc.ok){
          resolve("Promotion added!");
          updatePromotionList(data);
        }
        else{
          toast.error(data.msg);
        }
    });
    toast.promise(promise, {
      pending: "Updating data...",
      success: "Promotion Updated successfully",
      error: "Some error occured!",
    });

  }
  
  const getPromotions = async () => {
    const promotionsDoc = await fetch(getPromotionUrl,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });
    if(promotionsDoc.ok){
      promotionsDoc.json().then(responseDoc => {
        setPromotionsList(responseDoc);
      })
    }else {
      toast.error("Unable to fetch Data!!")
    }
  }
  const handleAddPromotion = () => {
    setPromotionTitle("");
    setPromotionDesc("");
    setPromotionRedirect("");
    handleShowPromotion();
  }
  const handleClosePromotion = () => {
    handleShowPromotion();
    setPromotionId("");
    setFiles(null);
  }

  const handleShowPromotion = () => {
    setAddPromotionBox(!showAddPromotionBox);
  }

  const handleDelete = async (pId) => {
    const deleteDoc = await fetch(deletePromotionUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: pId
        })
    })
    const data = await deleteDoc.json();
    if(deleteDoc.ok) {
      const promotionIndex = promotionsList.findIndex(promotion => promotion._id === pId );
      const newPromotionsList = [...promotionsList];
      newPromotionsList[promotionIndex] = data;
      setPromotionsList(newPromotionsList);
      toast.success("Promotion Updated!!");
    }else {
      toast.error(data.msg)
    }
  }

  const handleEdit = (pId) => {
    setPromotionId(pId);
    const promotionDoc = promotionsList.find(blog => blog._id === pId );
    setPromotionTitle(promotionDoc.promotionTitle);
    setPromotionDesc(promotionDoc.promotionDesc);
    setPromotionRedirect(promotionDoc.promotionRedirect);
    setPromotionImgUrl(promotionDoc.promotionImg);
    handleShowPromotion();
  }
  
  useEffect(() => {
    getPromotions();
  },[]);
  return (
    <div className="promotionContainer">
      {currentUser.accType === 1 ? (
        <>
          <div className="promotionHeader">
            <center>
              <button className="addPromotion" onClick={handleAddPromotion} >
                Add Promotion <Plus/> 
              </button>
            </center>
          </div>

          { showAddPromotionBox &&
            <>
          <div className="promotionCreateOverlay"
            onClick={handleClosePromotion}
          ></div>
          <div className="promotionCreate">
            <div className="promotionCreateHeading">
              <h4 className="promotionInputTitle">
                {promotionId === "" ? 
                "Add Promotion" :
                "Update Promotion" 
                }
              </h4>
              <X size="30" cursor="pointer"  strokeWidth="3" onClick={handleClosePromotion} />
            </div>

            <form action="" className="promotionForm">
              <div className="promotionInputGroup">
                <label htmlFor="title">
                  <h4 className="promotionInputTitle">Title</h4>
                </label>
                <input
                  className="promotionInputBorder"
                  onChange={(e) => setPromotionTitle(e.target.value)}
                  type="text"
                  value={promotionTitle}
                  name="title"
                  placeholder="title"
                />
              </div>
              <div className="promotionInputGroup">
                <label htmlFor="redirect">
                  <h4 className="promotionInputTitle">Redirect Link</h4>
                </label>
                <input
                  className="promotionInputBorder"
                  onChange={(e) => setPromotionRedirect(e.target.value)}
                  type="text"
                  name="title"
                  value={promotionRedirect}
                  placeholder="redirect link"
                />
              </div>
              <div className="promotionInputGroup promotionImageContainer">
                <label htmlFor="promotionImage">
                  <h4 className="promotionInputTitle">Promotion Image</h4>
                </label>
                <input
                  type="file"
                  onChange={handleChange}
                  className="promotionInputBorder promotionInputImage"
                  placeholder="promotionImage"
                />
              </div>
              <div className="promotionInputGroup promotionDesc">
                <label htmlFor="promotionDescription">
                  <h4 className="promotionInputTitle">Promotion Description</h4>
                </label>
                <textarea
                  className="promotionInputDescription"
                  onChange={(e) => setPromotionDesc(e.target.value)}
                  type="text"
                  value={promotionDesc}
                  name="promotionDescription"
                  placeholder="description"
                />
              </div>
              {
                promotionId === "" ? 
                <button className="promotionSubmitBtn" onClick={handleSubmit} >Submit Promotion</button>
                :
                <button className="promotionSubmitBtn" onClick={handleUpdate} >Update Promotion</button>
              }
            </form>
          </div> </>}
          <div className="promotionsList">
              {promotionsList.length>0 ? promotionsList.map(response => (
                  <PromotionsCard
                      deleteBtn={handleDelete}
                      editBtn={handleEdit}
                      promotionId={response._id}
                      status={response.promotionStatus}
                      img={response.promotionImg}
                      title={response.promotionTitle}
                      desc={response.promotionDesc}
                  />
              )) 
              : 
                <div className="">No Promotions Here</div>
              }
          </div>
        </>
      ) : (
        <div className="notPermission">
          <center>
            <h2>You Don't have Admin Permissions</h2>
          </center>
          <center>
            <Link to="/" className="backHome">
              Back to Home
            </Link>
          </center>
        </div>
      )}
    </div>
  );
};

export default Promotion;
