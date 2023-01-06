import React from 'react';
import {Link} from "react-router-dom";

import './Style.css';
import HeaderIcons from "./header-icons/HeaderIcons";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="link-header">
                    <h1 className="title">House of pets</h1>
                </Link>

                <HeaderIcons/>
            </div>
        </header>
    );
};

export default Header;
