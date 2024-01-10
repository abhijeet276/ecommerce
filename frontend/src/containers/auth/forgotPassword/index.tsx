import React, { useState } from 'react';
import './ForgotPassword.scss'
import { Link } from 'react-router-dom';
import TextField from '../../../components/Inputs';
import CustomButton from '../../../components/button';
import { useAppDispatch } from '../../../redux/hooks';
import { updatePassword } from '../../../redux/services/authService';

// type Props = {}

const ForgotPassword: React.FC = () => {
	const [fieldValue, setFieldValue] = useState(
		{ email: '' }
	);

	const dispatch = useAppDispatch();


	const handleChange = (e: any) => {
		setFieldValue(e.target.value)
	};

	const handleSubmit = () => {
		dispatch(updatePassword(fieldValue)).unwrap().then(data => (
			console.log(data)
		)).catch((error) => (
			console.log(error)
		))
	};
	return (
		<div className="form-container">
			<div className="logo-container">
				Forgot Password
			</div>
			<form className="form">
				<div className="form-group">
					<label>Email</label>
					<TextField
						type="text"
						id="email"
						name="email"
						label=""
						value={fieldValue.email}
						required
						onChange={handleChange}
						placeholder="Enter your email"
					/>
				</div>
				<CustomButton type="button" className="form-submit-btn" disabled={false} onCLick={handleSubmit}>Send Email</CustomButton>
			</form>
			<p className="signup-link">
				Don't have an account?
				<Link to="/signup" className="signup-link link"> Sign up now</Link>
			</p>
		</div>
	)
}

export default ForgotPassword