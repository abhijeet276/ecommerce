import React, { useState } from 'react'
import TextField from '../../../components/Inputs';
import CustomButton from '../../../components/button';
import './Login.scss'


const Login = () => {
    const [inputDetails, setInputDetails] = useState({
        password: "",
        email: ""
    });
    const [errors, setErrors] = useState({
        password: "",
        email: ""
    });

    const handleInputChange = (e: any) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputDetails({ ...inputDetails, [name]: val });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { password: "", email: "" };

        if (!inputDetails.password) {
            isValid = false;
            newErrors.password = "Please enter your password";
        }

        if (!inputDetails.email) {
            isValid = false;
            newErrors.email = "Please enter your email";
        }

        setErrors(newErrors);
        return isValid;
    };

    const HandleFormSubmit = () => {
        if (validateForm()) {
            console.log("Form submitted:", inputDetails);
        } else {
            console.log("Form not submitted. Check for errors.");
        }
    }

    return (
        <div className="container">
            <div className="heading">Sign In</div>
            <div className='paragraph'>Enter your correct detail</div>
            <form className="form" action="">
                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="enter your email"
                    value={inputDetails.email}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.email}</span>
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="enter your password"
                    value={inputDetails.password}
                    onChange={handleInputChange}
                    required
                />
                <span className="error-message">{errors.password}</span>
                <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
                <CustomButton type="button" disabled={false} onCLick={HandleFormSubmit}>Login</CustomButton>
            </form>
        </div>
    )
}

export default Login