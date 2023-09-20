// Footer.js
import React from 'react';
import './styles/Footer.css';

function Footer() {
    return (
        <div className="footer">
            {/* Footer content */}
            <p>&copy; {new Date().getFullYear()} Netflix Clone</p>
        </div>
    );
}

export default Footer;