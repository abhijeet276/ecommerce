import React, { useState } from 'react'
import TextField from '../../../components/Inputs';
import CustomButton from '../../../components/button';
import '../login/Login.scss'

const Signup = () => {
    const [inputDetails, setInputDetails] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const val = e.target.value;
        // setInputDetails((prev: any) => ({ ...prev, [name]: val }));
        setInputDetails({ ...inputDetails, [name]: val })
    }

    const HandleFormSubmit = () => {

    }

    const registerDataChange = () => {

    }
    return (
        <div className="container">
            <div className="heading">Sign Up</div>
            <div className='paragraph'>Enter your detail for signup</div>
            <form className="form" action="">
                <TextField
                    type="text"
                    name="userName"
                    placeholder="enter your name"
                    required
                    label="Name"
                    value={inputDetails.userName}
                    onChange={handleInputChange}
                    className='inputField'
                />
                <TextField
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    required
                    label="Email"
                    value={inputDetails.email}
                    onChange={handleInputChange}
                    className='inputField'
                />
                <TextField
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    required
                    label="Password"
                    value={inputDetails.password}
                    onChange={handleInputChange}
                    className='inputField'
                />
                <div className="file-input-container">
                    <label htmlFor="avatar" className="custom-file-label">
                        Choose Profile
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                    />
                </div>
                <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
                <CustomButton type="button" disabled={false} onCLick={HandleFormSubmit} className='customButton'>Sign Up</CustomButton>
            </form>
        </div>
    )
}

export default Signup