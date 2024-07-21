import React from 'react'
import {Routes,Route, Router} from 'react-router-dom'
import Home from './homeComponent/Home';
import Orders from './ordersComponent/Orders';
import SingleOrder from './ordersComponent/SingleOrder/SingleOrder';
import Cart from './cartComponent/Cart';
import Profile from './profileComponent/Profile';
import Contact from './contactComponent/Contact';
import School from './schoolComponent/School';
import Product from "./productComponent/Product";
import ViewAll from './viewAllComponent/ViewAll';
import Login from "./registerComponent/loginComponent/login";
import Signup from "./registerComponent/signupComponent/signup";
import SearchBar from "./searchComponent/Search";
import UploadBook from "./uploadBookComponent/UploadBook";

import Admin from "./adminComponent/Admin";
import AddSchoolBooks from './adminComponent/AddSchoolBooksComponent/AddSchoolBooks';
import AddExamBooks from './adminComponent/AddExamBooksComponent/AddExamBooks';
import AddSchool from './adminComponent/AddSchools/AddSchool';
import ViewOrders from './adminComponent/ViewOrders/ViewOrder';
import ViewMessages from './adminComponent/ViewMessages/ViewMessages';
import Promotions from './adminComponent/Promotion/Promotion';

import OrdersDelivery from "./deliveryComponent/ordersDelivery/OrdersDelivery";

import PrivateRoute from '../PrivateRoute';
import PDFFile from './pdfComponent/PDFFile';

const MainComponent = () => {
  return (
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/orders'  element={<PrivateRoute Component={Orders} />}/>
          <Route path='/order/:orderId'  element={<PrivateRoute Component={SingleOrder} />}/>
          <Route path='/cart'  element={<PrivateRoute Component={Cart} />}/>
          <Route path='/search' element={<SearchBar/>} />
          <Route path='/uploadBookList' element={<UploadBook/>} />
          <Route path='/profile'  element={<PrivateRoute Component={Profile} />}/>
          <Route path='/contact-us' element={<Contact/>} />
          <Route path='/school/:id' element={<School/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/viewallBooks' element={<ViewAll/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/pdf' element={<PDFFile/>} />

          <Route path='/admin'  element={<PrivateRoute Component={Admin} />}/>
          <Route path='/admin/addSchoolBooks' element={<PrivateRoute Component={AddSchoolBooks} />} />
          <Route path='/admin/addSchool' element={<PrivateRoute Component={AddSchool} />} />
          <Route path='/admin/addExamBooks' element={<PrivateRoute Component={AddExamBooks} />} />
          <Route path='/admin/viewOrders' element={<PrivateRoute Component={ViewOrders} />} />
          <Route path='/admin/viewOrder/:orderId' element={<PrivateRoute Component={SingleOrder} />} />
          <Route path='/admin/viewMessages' element={<PrivateRoute Component={ViewMessages} />} />
          <Route path='/admin/promotions' element={<PrivateRoute Component={Promotions} />} />

          <Route path='/delivery'  element={<PrivateRoute Component={OrdersDelivery} />}/>
      </Routes>
  )
}

export default MainComponent