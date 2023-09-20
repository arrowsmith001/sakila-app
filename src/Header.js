// Header.js
import React from 'react';
import './styles/Header.css';

function Header() {
    return (
        <div className="header">
            {/* Netflix logo */}
            <img
                className="header__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            {/* Navigation */}
            <div className="header__nav">
                <a href="/">Home</a>
                <a href="/movies">Movies</a>
                <a href="/my-list">My List</a>
            </div>
        </div>
    );
}

export default Header;