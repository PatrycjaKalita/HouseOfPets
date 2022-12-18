import React from 'react';

import './Style.css'
import NavLinks from "./NavLinks";
import {Link} from "react-router-dom";

import iconSale from "../../assets/nav-bar/sale.png"


const Navbar = () => {
    return (
        <nav className="main-nav">
            <div className="nav-container">
                <ul className="navbar-container">
                    <NavLinks/>
                </ul>

            </div>

            <Link to="/promocje" className="navlink-sale-container">
                <img alt="sale" src={iconSale} className="nav-icon"/>
                <h1 className="navlink-SALE">
                    WYPRZEDAŻ
                </h1>
            </Link>
        </nav>
    );
};

export default Navbar;
