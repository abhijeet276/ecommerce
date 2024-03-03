import React, { useState, useEffect } from 'react'
import TextField from '../../../components/Inputs';
import CustomButton from '../../../components/button';
import { useAppDispatch } from '../../../redux/hooks';
import { userSignup } from '../../../redux/services/authService';
import '../login/Login.scss';

const Signup = () => {
    const [inputDetails, setInputDetails] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    });

    const dispatch = useAppDispatch();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const val = e.target.value;
        // setInputDetails((prev: any) => ({ ...prev, [name]: val }));
        setInputDetails({ ...inputDetails, [name]: val })
    }

    const HandleFormSubmit = () => {
        // const myForm = new FormData();

        // myForm.set("name", inputDetails.name);
        // myForm.set("email", inputDetails.email);
        // myForm.set("password", inputDetails.password);
        // myForm.set("avatar", inputDetails.avatar);
        dispatch(userSignup(inputDetails)).unwrap().then(data => (
            localStorage.setItem("token", data.token),
            console.log(data, "dataaaaaa")
        )).catch((error) => (
            console.log(error, "errorrrrrr")
        ))
    };

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }
    //     if (isAuthenticated) {
    //         history.push(redirect);
    //     }
    // }, [dispatch, error, alert, history, isAuthenticated, redirect]);

    const registerDataChange = () => {

    }
    return (
        <div className="auth-container">
            <div className="heading">Sign Up</div>
            <div className='paragraph'>Enter your detail for signup</div>
            <form className="form" action="">
                <TextField
                    type="text"
                    name="name"
                    placeholder="enter your name"
                    required
                    label="Name"
                    value={inputDetails.name}
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