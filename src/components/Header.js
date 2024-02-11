import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css'; // Make sure to create or update Header.css for styling

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <NavLink to="/" className="menu-button" activeClassName="active">Recent Sustainability Data</NavLink>
                <NavLink to="/predictive-data" className="menu-button" activeClassName="active">Predictive Sustainability Data</NavLink>
            </nav>
        </header>
    );
};

export default Header;
