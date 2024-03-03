import React, { useEffect, useState } from 'react'
import TextField from '../../../components/Inputs';
import CustomButton from '../../../components/button';
import './Login.scss'
import { userLogin } from '../../../redux/services/authService';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputDetails, setInputDetails] = useState({
        password: "",
        email: ""
    });
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { error, isError, isSuccess, isAuthenticated } = useAppSelector(state => state.user)

    const handleInputChange = (e: any) => {
        const name = e.target.name;
        const val = e.target.value;
        setInputDetails({ ...inputDetails, [name]: val });
    };

    const HandleFormSubmit = () => {
        dispatch(userLogin(inputDetails)).unwrap().then(data => (
            console.log(data, "login user")
        )).catch((error) => (
            console.log(error, "login error")
        ))
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    console.log(redirect, "redirectredirect", location.search)

    useEffect(() => {
        if (error) {
            // alert.error(error);
            // dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, isAuthenticated]);

    return (
        <div className="auth-container">
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
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="enter your password"
                    value={inputDetails.password}
                    onChange={handleInputChange}
                    required
                />

                <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
                <CustomButton type="button" disabled={false} onCLick={HandleFormSubmit}>Login</CustomButton>
            </form>
        </div>
    )
}

export default Login