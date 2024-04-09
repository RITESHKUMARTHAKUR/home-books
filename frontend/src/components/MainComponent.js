import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './homeComponent/Home';
import Orders from './ordersComponent/Orders';
import SingleOrder from './ordersComponent/SingleOrder/SingleOrder';
import Cart from './cartComponent/Cart';
import Profile from './profileComponent/Profile';
import Contact from './contactComponent/Contact';
import School from './schoolComponent/School';
import Product from "./productComponent/Product";
import Login from "./registerComponent/loginComponent/login";
import Signup from "./registerComponent/signupComponent/signup";
import SearchBar from "./searchComponent/Search";

import Admin from "./adminComponent/Admin";
import AddSchoolBooks from './adminComponent/AddSchoolBooksComponent/AddSchoolBooks';
import AddExamBooks from './adminComponent/AddExamBooksComponent/AddExamBooks';
import AddSchool from './adminComponent/AddSchools/AddSchool';
import ViewOrders from './adminComponent/ViewOrders/ViewOrder';
import ViewMessages from './adminComponent/ViewMessages/ViewMessages';
import Promotions from './adminComponent/Promotion/Promotion';


const MainComponent = () => {
  return (
    
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/order/:orderId' element={<SingleOrder/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/search' element={<SearchBar/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/contact-us' element={<Contact/>} />
          <Route path='/school/:id' element={<School/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />

          <Route path='/admin' element={<Admin/>} />
          <Route path='/admin/addSchoolBooks' element={<AddSchoolBooks/>} />
          <Route path='/admin/addSchool' element={<AddSchool/>} />
          <Route path='/admin/addExamBooks' element={<AddExamBooks/>} />
          <Route path='/admin/viewOrders' element={<ViewOrders/>} />
          <Route path='/admin/viewOrder/:orderId' element={<SingleOrder/>} />
          <Route path='/admin/viewMessages' element={<ViewMessages/>} />
          <Route path='/admin/promotions' element={<Promotions/>} />
      </Routes>
  )
}

export default MainComponent