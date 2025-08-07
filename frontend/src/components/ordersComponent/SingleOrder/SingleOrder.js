import React, { useEffect, useRef, useState } from 'react';
import "./SingleOrder.css";
import { FaCircle } from "react-icons/fa6";
import {useAuth} from '../../../contexts/AuthContext';
import {toast} from 'react-toastify';
import SingleOrderCard from './SingleOrderProductCard/SingleOrderCard';
import { Link, useParams } from 'react-router-dom';
import PDFFile from '../../pdfComponent/PDFFile';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from 'lucide-react';

const SingleOrder = () => {
  const { orderId } = useParams();
  const {currentUser} = useAuth();
  const reciptRef = useRef();

  const getSingleOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/getOrder/${orderId}`;
  const updateOrderUrl = `${process.env.REACT_APP_API_BASE_URL}/updateOrder/${orderId}`;
  const sendOtpUrl = `${process.env.REACT_APP_API_BASE_URL}/otp-mail`;
  const verifyOtpUrl = `${process.env.REACT_APP_API_BASE_URL}/otp-verify`;


  const [showState,setShowState] = useState(false);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);
  const [orderData,setOrderData] = useState({});
  const [orderStatusValue,setOrderStatusValue] = useState("Pending");
  const [orderStatusColorValue,setOrderStatusColorValue] = useState("statusPending");
  const [newStatus,setNewStatus] = useState(1);
  const [orderProducts,setOrderProducts] = useState([]);

  const [otp,setOtp] = useState("");  
  const [otpSent,setOtpSent] = useState(false)  

 
  const getDeliveryColor = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        setOrderStatusColorValue("statusPending");
        break;
      case 2:
        setOrderStatusColorValue("statusProcessing");
        break;
      case 3:
        setOrderStatusColorValue("statusDelivered");
        break;
    
      default:
        break;
    }
  }

  const getDeliveryStatus = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        setOrderStatusValue("Pending");
        break;
      case 2:
        setOrderStatusValue("Processing");
        break;
      case 3:
        setOrderStatusValue("Delivered");
        break;
    
      default:
        break;
    }
  }

  const getSingleOrder = async () => {
    await fetch(getSingleOrderUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        response.json().then(orderDoc => {
          setOrderData(orderDoc);
          getDeliveryStatus(orderDoc.orderStatus);
          getDeliveryColor(orderDoc.orderStatus);

          const {orderProducts} = orderDoc ;
          setOrderProducts(orderProducts);

          const tDiscount = orderProducts.reduce((sum,product) => {
            return sum + (product.discount || 0);
          },0);
          setTotalDiscount(tDiscount);
          const tPrice = orderProducts.reduce((sum,product) => {
            return sum + (product.price || 0);
          },0);
          setTotalPrice(tPrice);
          
        })
    });
  };
  const handleStatusChange = (e) => {
    setNewStatus(Number(e.target.value));
  }
  const handleStatusSave = async (orderStatus) => {
    try {
      const response = await fetch(updateOrderUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateFieldValue: orderStatus }),
      });

      if(response.status === 200 ){
        getDeliveryStatus(orderStatus);  
        getDeliveryColor(orderStatus);
        toast.success("Order Updated!")
      }
      else {
        toast.error("Cannot update order!");
      }
    


    } catch (error) {
      toast.error("Cannot update order!");
      console.error(error);
    }

   
  }

  const handleReciptDownload = async () => {
    const inputData = reciptRef.current;
    try {
      const canvas = await html2canvas(inputData);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG",0,0, width,height);
      pdf.save("homebooks_recipt.pdf");

    } catch (error) {
      console.log(error)
    }
  };
  const handleOtp = (e) => {
    setOtp(e.target.value)
  }
  const sendOtp = async (userEmail) => {
    try {
      const response = await fetch(sendOtpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });

      if(response.ok) {
        setOtpSent(!otpSent);
        response.json().then(response => {
          toast.success(response.msg);
        })
      }

    } catch (error) {
        console.log(error);
    }
  }
  const verifyOtp = async (userEmail) => {
      try {
        const verifyDoc = await fetch(verifyOtpUrl,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userEmail,otp})
        });

        if(verifyDoc.ok) {
          await verifyDoc.json().then(response => {
            toast.success(response.msg);
          });
          handleStatusSave(3);
        }else{
          verifyDoc.json().then(response => {
            toast.error(response.msg);
          });
        }

      } catch (error) {
          console.log(error);
      }
  }

  // console.log(orderStatusValue);
  useEffect(() => {
    getSingleOrder();
  },[]);

  return (
    <div className="singleOrderContainer">
      {currentUser.accType === 1 || currentUser.accType === 2 || currentUser.accType === 3 ?  (
        <>
          <div className='pdf-container'  ref={reciptRef} >
             {orderData && <PDFFile orderData={orderData} />} 
          </div>

          <div className="singleOrderDivHeader">
            <div>Order: {orderData._id}</div>
            <div className='singleOrderDiv'>
              <button className="singleOrderInvoice" onClick={() => handleReciptDownload() }>Invoice <Download /></button>
              <button className={`showDelivery ${orderStatusColorValue}`}>{orderStatusValue}</button>
            </div>
          </div>
          <div className="singleOrderDivBody">
            <div className="singleOrderDivBodyContainer">
              <div className="singleOrderNav">
                <div className="singleNavBtn">
                  <button
                    className={`singleOrderSummaryBtn ${
                      showState
                        ? "singleOrderBorderNone"
                        : "singleOrderBorderBottom"
                    } `}
                    onClick={() => setShowState(!showState)}
                  >
                    Summary
                  </button>
                  <button
                    className={`singleOrderDeliveryBtn ${
                      showState
                        ? "singleOrderBorderBottom"
                        : "singleOrderBorderNone"
                    }`}
                    onClick={() => setShowState(!showState)}
                  >
                    Delivery
                  </button>
                </div>
                <hr />
                <div className="showSection">
                  {showState ? (
                    <div className="showSectionDelivery">
                      {currentUser.accType === 1 ? (
                        <div className="orderStatusContainer">
                          <p className="orderStatusHeader">
                            {" "}
                            <b> Change Order Status: </b>{" "}
                          </p>

                          <div className="orderStatusChangeContainer">
                            <select
                              className="orderStatusChange"
                              onChange={handleStatusChange}
                              name=""
                              id=""
                            >
                              <option
                                className="orderStatusChangeValue"
                                value=""
                              >
                                {" "}
                                -- Change Status --{" "}
                              </option>
                              <option
                                className="orderStatusChangeValue"
                                value="1"
                              >
                                Pending
                              </option>
                              <option
                                className="orderStatusChangeValue"
                                value="2"
                              >
                                Processing
                              </option>
                              <option
                                className="orderStatusChangeValue"
                                value="3"
                              >
                                Delivered
                              </option>
                            </select>
                            <button
                              onClick={() => handleStatusSave(newStatus) }
                              className="orderStatusSaveBtn"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {currentUser.accType === 1 || currentUser.accType === 2 && orderStatusValue !== "Delivered" ? (
                        <div className="orderDeliveryContainer">
                          <p className="orderDeliveryHeader">
                            <b> COMPLETE DELIVERY: </b>
                          </p>
                          
                          <div className="orderDeliveryOtpContainer">
                            { otpSent ? 
                            (<div className="deliveryEnterOtpContainer">
                              <input 
                              className='deliveryUserOtp-enter'
                                type="text" 
                                placeholder='enter otp'
                                maxLength={6}
                                onChange={handleOtp}
                              />
                              <button className='deliveryUserSubmit' onClick={() => verifyOtp(orderData.userEmail) }>Submit </button>
                            </div>) : 
                            (<div className="deliveryOtpSendContainer">
                              <div className='deliveryUserOtp'>
                                {orderData.userEmail}
                              </div>
                              <button className='deliveryUserSend' onClick={() => sendOtp(orderData.userEmail)}>Send OTP</button>
                            </div>)
                            } 
                          </div>

                        </div>
                      ) : null}

                      <div className="deliveryContainer">
                        <table className="deliveryContainerTable">
                          <thead>
                            <tr>
                              <td colSpan={3}>
                                <p className="deliveryTableHeader">
                                  <b>Deliver to:</b>{" "}
                                </p>
                              </td>
                            </tr>
                          </thead>
                          <tbody className="deliveryTableBody">
                            <tr>
                              <td>Name</td>
                              <td>: {orderData.userName}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>: {orderData.userEmail}</td>
                            </tr>
                            <tr>
                              <td>Contact</td>
                              <td>: {orderData.userContact}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td>: {orderData.userAddress}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="showSectionSummary">
                      {orderProducts &&
                        orderProducts.map((orderProduct) => (
                          <SingleOrderCard
                            productTitle={orderProduct.title}
                            productType={orderProduct.elementType}
                            originalPrice={orderProduct.price}
                            discountPrice={orderProduct.discount}
                            productImg={orderProduct.bookImg || orderProduct.stationaryUrl}
                            productCount={orderProduct.bookQuantity}
                          />
                        ))}
                    </div>
                  )}
                </div>
                <div className="singleOrderTotalContainer">
                  <div className="singleOrderTotalDiv">
                    <div className="singleOrderTotal">
                      <h5>Price</h5>
                      <h5>
                        &#8377;{" "}
                        {Number.isInteger(totalPrice)
                          ? totalPrice + ".00"
                          : totalPrice}
                      </h5>
                    </div>
                    <hr />
                    <div className="singleOrderTotal">
                      <h5>Discount</h5>
                      <h5>{
                        (totalDiscount*100)/totalPrice
                      }%</h5>
                    </div>
                    <div className="singleOrderTotal">
                      <h5>Discounted Price</h5>
                      <h5>
                        &#8377;{" "}
                        {Number.isInteger(totalPrice-totalDiscount)
                          ? totalPrice-totalDiscount + ".00"
                          : totalPrice-totalDiscount}
                      </h5>
                    </div>
                    
                    <hr />
                    <div className="singleOrderTotal">
                      <h5 style={{"color":"green"}} >Shipping</h5>
                      <span style={{"display":"flex","alignItems":"center","gap":"10px"}}>
                          <h6 style={{"margin":"0","color":"red"}} > <strike>&#8377; 40.00</strike>  </h6>
                          <h4 style={{"margin":"0" , "color":"green"}} >Free</h4>
                      </span>
                    </div>
                  </div>

                  <div className="singleOrderTotal singleOrderSum">
                    <h5>Total Amount</h5>
                    <h5>
                      &#8377;{" "}
                      {Number.isInteger(totalPrice-totalDiscount)
                        ? totalPrice-totalDiscount + ".00"
                        : totalPrice-totalDiscount}{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
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
}

export default SingleOrder