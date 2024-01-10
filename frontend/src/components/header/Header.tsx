
import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/services/authService';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../search';
import './Header.scss';

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	// const token = localStorage.getItem('token')
	let token = true
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const toggleDropdown = () => {
		if (token) setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = () => {
		dispatch(logoutUser()).unwrap().then((data) => (
			console.log(data)
		)).catch((error) => (
			console.log(error)
		))
	};


	const handleProfile = () => {
		navigate('/profile')
	}

	return (
		<header className="header-container">
			<h1 className="title">My App</h1>
			<div className="user-info">
				<SearchBar />
				<p className="user-name">
					<Badge color="secondary" badgeContent={10} max={10}>
						<ShoppingCartOutlinedIcon />
					</Badge>
				</p>
				<p className="user-name">John Doe</p>
				<img
					className="avatar"
					src="https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png"
					alt="User Avatar"
					onClick={toggleDropdown}
				/>
				{isDropdownOpen && (
					<div className="dropdown">
						<p onClick={handleProfile}>Profile</p>
						<p onClick={() => alert('Settings')}>Settings</p>
						<p onClick={() => handleLogout()}>Logout</p>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

