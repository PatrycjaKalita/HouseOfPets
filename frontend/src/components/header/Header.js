import React from 'react';
import {Link} from "react-router-dom";

import './Style.css';
import logo from "../../assets/Logo.png"
import Searchbar from "./searchbar/Searchbar";
import HeaderIcons from "./header-icons/HeaderIcons";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="link-header">
{/*
                    <img src={logo} alt="Website logo" className="logo"/>
*/}
                    <h1 className="title">House of pets</h1>
                </Link>

                <div className="header-searchbar">
                    <Searchbar/>
                </div>

                <div className="header-icons">
                    <HeaderIcons/>
                </div>
            </div>
        </header>
    );
};

export default Header;
