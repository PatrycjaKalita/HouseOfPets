import React from 'react';
import {Link} from "react-router-dom";
import HeaderIcon from "./HeaderIcon";
import './Style.css'
const HeaderIcons = () => {
    return (
        <div className="flex justify-end">
            <Link to="/ulubione">
                <HeaderIcon iconName="heart-outline" iconNameHover="heart"/>
            </Link>

            <Link to="/koszyk">
                <HeaderIcon iconName="basket-outline" iconNameHover="basket"/>
            </Link>

            <Link to="">
                <HeaderIcon iconName="person-outline" iconNameHover="person"/>
            </Link>
        </div>
    );
};

export default HeaderIcons;
