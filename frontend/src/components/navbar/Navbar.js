import React from 'react';

import './Style.css'
import NavLinks from "./NavLinks";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <ul className="navbar-container">
                    <NavLinks/>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
