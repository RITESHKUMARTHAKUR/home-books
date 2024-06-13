import React from "react";
import "./PDFFile.css";
import Helvetica from "../../fonts/Helvetica.ttf"
import HelveticaBold from "../../fonts/Helvetica-Bold.ttf"
import HelveticaMedium from "../../fonts/Helvetica-BoldOblique.ttf"
import HomeLogo from "../../images/Logo.png";

const PDFFile = ({orderData}) => {

  // {orderData && console.log(orderData)}
  return (
    <div className="pdffile-container">
      <section className="pdffile-header">
        <div className="pdffile-title">
          <div className="recipt-logo">
            <img className="reciptlogoimg" src={HomeLogo} alt="homebooksLogo" />
          </div>
          <h1 className="pdffile-textHeading">Home Books</h1>
        </div>

        <p className="pdffile-textSubHeading pdffile-textSubColor">Receipt</p>
      </section>
      {/* <hr /> */}
      {/* <br /> */}
      <section className="pdffile-date">
        <div className="recipt-date">
          <h2 className="pdffile-textSubHeading"><b>Order Date</b></h2>
          <p className="pdffile-textDesc pdffile-textSubColor">{new Date(orderData.createdAt).toDateString()}</p>
          {/* <p className="pdffile-textDesc pdffile-textSubColor">{Date(orderData.createdAt.split("T")[0])}</p> */}
        </div>
      </section>

      

      <section className="pdffile-info">
        <div className="customer-details">
            <h2 className="pdffile-textSubHeading"><b>Customer Details</b></h2>
            <p id="testMe" className="pdffile-textDesc pdffile-textSubColor">
              {orderData.userName} <br /> {orderData.userEmail} <br /> {orderData.userContact}
              <span style={{"visibility": "hidden"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, architecto?
              </span>
            </p>
        </div>
        <div className="delivery-details">
            <h2 className="pdffile-textSubHeading"><b>Delivery Details</b></h2>
            <p className="pdffile-textDesc pdffile-textSubColor">{orderData.userAddress}</p>
        </div>
      </section>
      
      <hr />
      <br />
      <section className="pdffile-summary">
        <div className="pdffile-details">
            <h2 className="pdffile-textSubHeading"><b>Order Summary</b></h2>
        </div>
       <br />
        <table className="pdffile-table pdffile-textDesc pdffile-textSubColor">
            <thead className="pdffile-tableheader pdffile-bottom">
              <tr className="pdffile-tableheaderrow">
                <th scope="col" className="pdffile-bookNameHeading pdffile-padding"  >Book</th>
                <th scope="col" >Author</th>
                <th scope="col" >Qty</th>
                <th className="pdffile-textCenter" scope="col" >List Price</th>
                <th className="pdffile-textCenter" scope="col" >Discount</th>
                <th className="pdffile-textCenter" scope="col" >Price</th>
              </tr>
            </thead>
            <tbody>
              {orderData.orderProducts && orderData.orderProducts.map((bookItems,index) => (
                <tr className={`${index === orderData.orderProducts.length - 1 ? "": "pdffile-bottom"} pdffile-tr`}>
                {/* <tr className={`pdffile-bottom pdffile-tr`}> */}
                  <td className="pdffile-padding">{bookItems.title}</td>
                  <td>{bookItems.author}</td>
                  <td>{bookItems.bookQuantity}</td>
                  <td className="pdffile-textCenter" >&#8377;{bookItems.price}</td>
                  <td className="pdffile-textCenter" >&#8377;{bookItems.discount}</td>
                  <td className="pdffile-textCenter" >&#8377;{bookItems.price - bookItems.discount}</td>  
                </tr>
              ))}
              <br />
              <tr>
                <td><hr /></td>
                <td><hr /></td>
                <td><hr /></td>
                <td><hr /></td>
                <td><hr /></td>
                <td><hr /></td>
              </tr>
              <tr className="pdffile-totalContainer pdffile-textSubHeading">
                <td><h2>Total</h2></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="pdffile-textCenter"><h2>&#8377;{orderData.orderTotal}</h2></td>
              </tr>
              
            </tbody>
        </table>
        </section>
        {/* <section className="pdffile-info">
          <div className="customer-details">
            <p><b>Customer Details</b></p>
            <p>{name} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, quia!</p>
          </div>
          <div className="delivery-details">
            <p><b>Delivery Details</b></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nemo!</p>
          </div>
      </section> */}
    </div>

    //   <Document>
    //       <Page size="A4" style={styles.page}>
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 10}}>5:40 pm</Text>
    //         <Text style={{ fontSize: 10, fontWeight: 'bold', margin:"0 auto" }}>Sales | homebooks.in </Text>
    //       </View>

    //       <Text style={styles.header}>Home Books</Text>
    //       <Text style={styles.title}>Receipt</Text>

    //       <View style={{ marginBottom: 10 }}>
    //           <Text style={styles.fontBold}>Date: 2024-05-05</Text>
    //           <Text>Receipt No: 1714898796</Text>
    //       </View>

    //       <View style={styles.table}>
    //           <View style={styles.tableHeader}>
    //           <Text style={{ textAlign: 'left' }}>QTY</Text>
    //           <Text style={{ textAlign: 'left' }}>Product</Text>
    //           <Text style={{ textAlign: 'right' }}>Amount</Text>
    //           </View>
    //           <View style={styles.tableData}>
    //           <Text style={{ textAlign: 'left' }}>1</Text>
    //           <Text style={{ textAlign: 'left' }}>320304403</Text>
    //           <Text style={{ textAlign: 'right' }}>2  00</Text>
    //           </View>
    //           <View style={styles.tableData}>
    //           <Text style={{ textAlign: 'left' }}>1</Text>
    //           <Text style={{ textAlign: 'left' }}>987545</Text>
    //           <Text style={{ textAlign: 'right' }}>50</Text>
    //           </View>
    //           <View style={styles.tableData}>
    //           <Text style={{ textAlign: 'left' }}>1</Text>
    //           <Text style={{ textAlign: 'left' }}>123654789</Text>
    //           <Text style={{ textAlign: 'right' }}>20</Text>
    //           </View>
    //       </View>

    //       <View style={{ marginTop: 20 }}>
    //           <Text style={styles.title}>Total</Text>
    //           <Text style={styles.tableData}>270</Text>
    //           <Text style={styles.title}>Tax 12%</Text>
    //           <Text style={styles.tableData}>32.4</Text>
    //           <Text style={styles.title}>Tendered Amount</Text>
    //           <Text style={styles.tableData}>270</Text>
    //           <Text style={styles.title}>Change</Text>
    //           <Text style={styles.tableData}>0</Text>
    //       </View>
    //       </Page>
    // </Document>
  );
};

export default PDFFile;
