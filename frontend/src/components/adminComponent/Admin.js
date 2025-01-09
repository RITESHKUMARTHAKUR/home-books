import React from 'react';
import "./Admin.css";
import {useAuth} from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';
const Admin = () => {
    const {currentUser} = useAuth();
    const adminButtonsList = [
        {
            name: "Add School",
            link:"/admin/addSchool"
        },
        {
            name: "Add School Books",
            link:"/admin/addSchoolBooks"
        },
        {
            name: "Edit School Books",
            link:"/admin/editSchoolBooks"
        },
        {
            name: "Stationery",
            link:"/admin/stationeries"
        },
        {
            name: "View Orders",
            link:"/admin/viewOrders"
        }
        ,{
            name: "View Booklist",
            link:"/admin/bookList"
        }
        ,{
            name: "View Messages",
            link:"/admin/viewMessages"
        }
        ,{
            name: "Promotions",
            link:"/admin/promotions"
        }
    ]

    return (
        <div className='adminContainer'>
            {(currentUser.accType === 1) ? (
                <>
                    <center><h2>Admin Panel</h2></center>
                    <div className="adminBtns">
                    {
                        adminButtonsList.map((buttonList) => (
                            <Link className='adminLinks' to={`${buttonList.link}`}>{buttonList.name}</Link>
                        ))
                    }
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