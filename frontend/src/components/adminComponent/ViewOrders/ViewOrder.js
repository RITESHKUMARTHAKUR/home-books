import React, { useEffect, useState } from 'react';
import './ViewOrder.css';
import {useAuth} from '../../../contexts/AuthContext' ;
import OrderCard from '../../ordersComponent/OrderCard/OrderCard';
import { Link } from 'react-router-dom';
// import PDFFile from '../../pdfComponent/PDFFile';
// import { PDFDownloadLink } from '@react-pdf/renderer';

const ViewOrder = () => {
  const {currentUser} = useAuth();
  const getOrdersUrl = `${process.env.REACT_APP_API_BASE_URL}/getAllOrders`;
  const [ordersDoc,setOrdersDoc] = useState([]);
  const [firstProduct,setFirstProduct] = useState([]);

  const getAllOrders = async () => {
        await fetch(getOrdersUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            response.json().then(responseDoc => {
                setOrdersDoc(responseDoc);

                if(responseDoc.length>0) {
                    responseDoc.map(orderData => {
                        const {orderProducts} = orderData ;
                        // setFirstProduct(...firstProduct,orderProducts[0]);
                        if (orderProducts.length > 0) {
                          setFirstProduct(prevProducts => [...prevProducts, orderProducts[0]]);
                        }
                    });
                }
            })  
        })
  };
    
  const getOrderId = (orderId) => {
      return orderId.slice(-8);
  }
  const getDate = (orderDate) => {
        const date = new Date(orderDate);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        // Get day, month, and year from the date object
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        const year = date.getFullYear().toString(); // Get last two digits of the year
    
        // Concatenate day, month, and year to form ddmmyy format
        const formattedDate = day + " " + months[month-1] + " " + year;
        return(formattedDate);
      
  }

  // const handleDownloadPdf = () => {
  //     <PDFDownloadLink document={<PDFFile/>} fileName='orderBill' >
  //         <button>Download</button>
  //     </PDFDownloadLink>
  // }

  useEffect(() => {
      getAllOrders();
  },[])


  return (
    <div className='viewOrdersContainer'>
        {(currentUser.accType === 1 ) ? <>
                {ordersDoc && ordersDoc.map((orders,index) => (
                    <OrderCard 
                        orderImg={firstProduct[index].bookImg} 
                        link={`/admin/viewOrder/${orders._id}`} 
                        orderId={getOrderId(orders._id)} 
                        date={getDate(orders.createdAt)} 
                        title={firstProduct[index].title} 
                        pay={orders.orderTotal} 
                        orderStatus={orders.orderStatus} 
                        items={orders.itemsCount} 
                        // pdfDownload={handleDownloadPdf}
                    />
                ))} </>
        : 
            <div className='notPermission'>
                <center>
                    <h2>You Don't have Admin Permissions</h2>
                </center>
                <center>
                    <Link to="/" className='backHome'>Back to Home</Link>
                </center>
        </div> 
        }
        
    </div>
  )
}

export default ViewOrder