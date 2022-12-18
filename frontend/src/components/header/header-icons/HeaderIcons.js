import React from 'react';
import {Link} from "react-router-dom";

import './Style.css'
import HeaderIcon from "./HeaderIcon";
import Searchbar from "../searchbar/Searchbar";

const HeaderIcons = () => {
    return (
        <div>
            <div className="header-icons-monitors">
                <div className="header-icon-link">
                <Searchbar/>
                </div>
                <Link to="" className="header-icon-link">
                    <HeaderIcon iconName="person-outline" iconNameHover="person"/>
                </Link>

                <Link to="/koszyk" className="header-icon-link">
                    <HeaderIcon iconName="cart-outline" iconNameHover="cart"/>
                </Link>
            </div>
        </div>
    );
};

export default HeaderIcons;
