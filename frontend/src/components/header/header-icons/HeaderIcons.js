import React from 'react';
import {Link} from "react-router-dom";

import './Style.css'
import HeaderIcon from "./HeaderIcon";
import Searchbar from "../searchbar/Searchbar";
import {isAuth} from '../../../auth/Helpers';

const HeaderIcons = () => {
    return (
        <div className="header-icons">
            <Searchbar/>

            {/*NIE ZALOGOWANY*/}
            {!isAuth() && (
                <Link to="/zaloguj-sie" className="header-icon-link">
                    <HeaderIcon iconName="person-outline" iconNameHover="person"/>
                </Link>
            )}

            {/*ZALOGOWANY*/}
            {isAuth() && isAuth().role === 'klient' && (
                <Link to="/profil" className="header-icon-link">
                    <HeaderIcon iconName="person-circle-outline" iconNameHover="person-circle"/>
                </Link>
            )}

            {isAuth() && isAuth().role === 'pracownik' && (
                <Link to="/profil/pracownik/zamowienia" className="header-icon-link">
                    <HeaderIcon iconName="person-circle-outline" iconNameHover="person-circle"/>
                </Link>
            )}

            <Link to="/koszyk" className="header-icon-link">
                <HeaderIcon iconName="cart-outline" iconNameHover="cart"/>
            </Link>
        </div>
    );
};

export default HeaderIcons;
