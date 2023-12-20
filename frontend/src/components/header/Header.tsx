
import React, { useState } from 'react';
import './Header.scss';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header-container">
            <h1 className="title">My App</h1>
            <div className="user-info" onClick={toggleDropdown}>
                <p className="user-name">CArt</p>
                <p className="user-name">John Doe</p>
                <img className="avatar" src="https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png" alt="User Avatar" />
                {isDropdownOpen && (
                    <div className="dropdown">
                        <p onClick={() => alert('Profile')}>Profile</p>
                        <p onClick={() => alert('Settings')}>Settings</p>
                        <p onClick={() => alert('Logout')}>Logout</p>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

