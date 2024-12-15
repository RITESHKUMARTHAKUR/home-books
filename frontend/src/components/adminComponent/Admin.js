import React from 'react';
import "./Admin.css";
import {useAuth} from "../../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const {currentUser} = useAuth();

    return (
        <div className='adminContainer'>
            {(currentUser.accType === 1) ? (
                <>
                    <center><h2>Admin Panel</h2></center>
                    <div className="adminBtns">
                    <Link className='adminLinks' to="/admin/addSchool">Add School</Link>
                    <Link className='adminLinks' to="/admin/addSchoolBooks">Add School Books</Link>
                    <Link className='adminLinks' to="/admin/editSchoolBooks">Edit School Books</Link>
                    <Link className='adminLinks' to="/admin/addExamBooks">Add Exam Books</Link>
                    <Link className='adminLinks' to="/admin/viewOrders">View Orders</Link>
                    <Link className='adminLinks' to="/admin/viewMessages">View Messages</Link>
                    <Link className='adminLinks' to="/admin/promotions">Promotions</Link>
                    </div>
                </>
            ) : 
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

export default Admin