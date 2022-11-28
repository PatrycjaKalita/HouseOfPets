import React, {useState} from 'react';
import {Link} from "react-router-dom";

import './Style.css'
import HeaderIcon from "./HeaderIcon";
import NavLinks from "../../navbar/NavLinks";

const HeaderIcons = () => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState("person-outline");
    return (
        <div>
            <div className="header-icons-monitors">
                <Link to="/ulubione" className="header-icon-link">
                    <HeaderIcon iconName="heart-outline" iconNameHover="heart"/>
                </Link>

                <Link to="/koszyk" className="header-icon-link">
                    <HeaderIcon iconName="basket-outline" iconNameHover="basket"/>
                </Link>

                <Link to="" className="header-icon-link">
                    <HeaderIcon iconName="person-outline" iconNameHover="person"/>
                </Link>
            </div>

            <div className="header-icons-mobile">
                <Link to="">
                    <span className="header-icon-mobile"
                          onMouseEnter={() => setProfile("person")}
                          onMouseLeave={() => setProfile("person-outline")}>
                        <ion-icon name={profile}></ion-icon>
                    </span>
                </Link>

                <div className="z-50">
                    <span className="header-icon-mobile" onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? "menu" : "menu"}`}></ion-icon>
                    </span>
                </div>
            </div>

            <ul className={`navbar-mobile-menu ${open ? 'left-0' : 'left-[-100%]'}`}>
                <div className="flex w-full">
                    <h1 className="title-mobile-menu">House of pets</h1>

                    <div className="close-icon-mobile">
                        <span className="header-icon-mobile" onClick={() => setOpen(!open)}>
                            <ion-icon name={`${open ? "close" : "close"}`}></ion-icon>
                        </span>
                    </div>
                </div>

                <NavLinks/>

                <div className="navbar-mobile-menu-links">
                    <Link to="/ulubione">
                        <HeaderIcon iconName="heart-outline" iconNameHover="heart"/>
                    </Link>

                    <Link to="/koszyk">
                        <HeaderIcon iconName="basket-outline" iconNameHover="basket"/>
                    </Link>
                </div>
            </ul>
        </div>
    );
};

export default HeaderIcons;
