import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { userProfile } from '../../redux/services/authService';
import './Profile.scss';
import CustomButton from '../../components/button';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'path/to/avatar.jpg',
        designation: "dfghjkl gfhyghjkl fhghjkl"
    };

    useEffect(() => {
        dispatch(userProfile()).unwrap().then(data => (
            console.log(data, "get user profile")
        )).catch((error) => (
            console.log(error, "user profile error")
        ))
    })
    return (
        <div className="profile-card">
            <div className="profile-left">
                <img src={'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp'} alt={user.name} className="profile-image" />
                <div className="profile-info">
                    <label>NAME:</label>
                    <input type="text" value={user.name} readOnly className="profile-name" />
                    <label>DESIGNATION:</label>
                    <input type="text" value={user.designation} readOnly className="profile-designation" />
                </div>
                <CustomButton type="button" className="save-btn" onClick={() => navigate('/update-profile')}>update profile</CustomButton>
                <CustomButton type="button" className="save-btn" onClick={() => navigate('/forgot-password')}>Forgot password</CustomButton>
                <CustomButton type="button" className="save-btn" onClick={() => navigate('/forgot-password')}>My orders</CustomButton>
            </div>

            <div className="profile-body">

                <div className="about-section">
                    <h3 className='section-header'>About</h3>
                    <p>Name : Johan Doe</p>
                    <p>Admin</p>
                </div>
                <div className="ratings">
                    <h3 className='section-header'>Address</h3>
                    <p>House no. ABC,Pin : 236547, Near XYZ</p>
                    <p>City : Chandigarh</p>
                    <p>State : Haryana</p>
                </div>
                <div className="contact-information">
                    <h3 className='section-header'>Contact</h3>
                    <p>Phone : +97623456789</p>
                    <p>Email : abc@gmail.com</p>
                </div>
                <div className="basic-information">
                    {/* <BasicInformationComponent /> */}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;