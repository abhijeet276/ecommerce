import React, { useState, useEffect } from 'react'
import TextField from '../../../components/Inputs';
import '../login/Login.scss'
import { useAppDispatch } from '../../../redux/hooks';
import { userSignup } from '../../../redux/services/authService';
import { useForm } from '../../../hooks/useForm';

interface User {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
    const { handleSubmit, handleChange, data: user, errors } = useForm<User>({
        validations: {
          name: {
            pattern: {
              value: '^[A-Za-z]*$',
              message:
                "You're not allowed to use special characters or numbers in your name.",
            },
            custom:{
                isValid:(value)=>value.length>9,
                message:"it can not be shorter "
            }
          },
          email: {
           pattern:{
            value:'/\S+@\S+\.\S+/',
            message:"email is not valid"
           }
          },
          password: {
            custom: {
              isValid: (value) => value.length > 6,
              message: 'The password needs to be at least 6 characters long.',
            },
          },
        },
        onSubmit: () => alert('User submitted!'),
      });
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

console.log(errors,user,"demo")
    const registerDataChange = () => {

    }
    return (
        <div className="auth-container">
            <div className="heading">Sign Up</div>
            <div className='paragraph'>Enter your detail for signup</div>
            <form className="form" action="" onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    name="name"
                    placeholder="enter your name"
                    required={false}
                    label="Name"
                    value={user.name}
                    onChange={handleChange("name")}
                    className='inputField'
                />
                <TextField
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    required={false}
                    label="Email"
                    value={user.email}
                    onChange={handleChange("email")}
                    className='inputField'
                />
                <TextField
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    required={false}
                    label="Password"
                    value={user.password}
                    onChange={handleChange("password")}
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
                <button type="submit" disabled={false} className='customButton'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup