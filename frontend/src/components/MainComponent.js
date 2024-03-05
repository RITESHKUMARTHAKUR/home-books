import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './homeComponent/Home';
import Orders from './ordersComponent/Orders';
import Cart from './cartComponent/Cart';
import Profile from './profileComponent/Profile';
import Contact from './contactComponent/Contact';
import School from './schoolComponent/School';
import Product from "./productComponent/Product";
import Login from "./registerComponent/loginComponent/login";
import Signup from "./registerComponent/signupComponent/signup";
import Admin from "./adminComponent/Admin";
import AddSchoolBooks from './adminComponent/AddSchoolBooksComponent/AddSchoolBooks';
import AddExamBooks from './adminComponent/AddExamBooksComponent/AddExamBooks';
import AddSchool from './adminComponent/AddSchools/AddSchool';


const MainComponent = () => {
  return (
    
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/cart' element={<Cart/>} />
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
      </Routes>
  )
}

export default MainComponent