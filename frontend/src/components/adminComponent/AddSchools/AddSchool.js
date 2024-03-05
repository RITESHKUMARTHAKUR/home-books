import React, { useEffect, useState } from 'react';
import "./AddSchool.css"
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const AddSchool = () => {
    const addSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/addSchool`;
    
    const {currentUser} = useAuth();
    const Navigate = useNavigate();
    const [userDoc,setUserDoc] = useState([]);

    const [schoolName,setSchoolName] = useState('');
    const [location,setLocation] = useState('');
    const [area,setArea] = useState('');
    const [district,setDistrict] = useState('');
    const [schoolState,setSchoolState] = useState('');
    const [pinCode,setPincode] = useState(0);
    const [affilated,setAffilated] = useState('');
    const [medium,setMedium] = useState('');
    const [files,setFiles] = useState(null);
    
    useEffect(() => {
        if(currentUser) {
            setUserDoc(currentUser);
        }else {
            Navigate("/login");
        }
    },[currentUser]);


    
    const submitSchool = async (event) => {
        event.preventDefault();

        const schoolData = new FormData();
        schoolData.set('schoolName',schoolName);
        schoolData.set('location',location);
        schoolData.set('area',area);
        schoolData.set('district',district);
        schoolData.set('schoolState',schoolState);
        schoolData.set('pincode',pinCode);
        schoolData.set('affilated',affilated);
        schoolData.set('medium',medium);
        schoolData.set('schoolImg',files[0]);

        if(schoolName !== '' && location !== '' && area !== '' && district !== '' && schoolState !== '' && pinCode !== '' && affilated !== '' && medium !== '' && files !== ''){
            const schoolDoc = await fetch(addSchoolUrl, {
                method: 'POST',
                body: schoolData
            });
            if(schoolDoc.ok) {
                toast.success('School Added!',{
                    autoClose: 1000
                });
            }else {
                toast.success('Failed to add School!',{
                    autoClose: 1000
                });
            }

        }else {
            toast.error("Please Fill all the details!", {
                autoClose:1000
            });
        }

    }

  return (
    <div className='addSchoolComponent'>
        {(userDoc.accType === 1) ? (
            <>
            <h2>Add School</h2>
            <form action="#" className='addSchoolForm'>
                <input className='addSchoolInp' name="schoolName"  onChange={(e) => setSchoolName(e.target.value)}  type="text" placeholder='school name'/>
                <input className='addSchoolInp' name="location"    onChange={(e) => setLocation(e.target.value)}    type="text" placeholder='location'/>
                <input className='addSchoolInp' name="area"        onChange={(e) => setArea(e.target.value)}        type="text" placeholder='area'/>
                <input className='addSchoolInp' name="district"    onChange={(e) => setDistrict(e.target.value)}    type="text" placeholder='district'/>
                <input className='addSchoolInp' name="schoolState" onChange={(e) => setSchoolState(e.target.value)} type="text" placeholder='state'/>
                <input className='addSchoolInp' name="pincode"     onChange={(e) => setPincode(e.target.value)}     type="number" placeholder='pincode'/>
                <input className='addSchoolInp' name="affilated"   onChange={(e) => setAffilated(e.target.value)}   type="text" placeholder='affilated'/>
                <input className='addSchoolInp' name="medium"      onChange={(e) => setMedium(e.target.value)}      type="text" placeholder='medium'/>
                <input className='addSchoolInp addSchoolFile' onChange={(e) => setFiles(e.target.files)} name='schoolImg' type="file" />

                <button onClick={submitSchool} className='addSchoolBtn'>Submit</button>
            </form>
            </>
        ): <div className='notPermission'>
            <h2>You Don't have Admin Permissions</h2>
            <Link to="/" className='backHome'>Back to Home</Link>
        </div>}
        
    </div>
  )
}

export default AddSchool