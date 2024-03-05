import React from 'react';
import "./Admin.css";
import {useAuth} from "../../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const {currentUser} = useAuth();


    return (
        <div className='adminContainer'>
            <center><h2>Admin Panel</h2></center>
            <div className="adminBtns">
                <Link className='adminLinks' to="/admin/addSchool">Add School</Link>
                <Link className='adminLinks' to="/admin/addSchoolBooks">Add School Books</Link>
                <Link className='adminLinks' to="/admin/addExamBooks">Add Exam Books</Link>
            </div>
        </div>
    )
    
}

export default Admin