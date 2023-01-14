import React from 'react';
import {Link, useHistory} from "react-router-dom";

import {clientNavigation, employeeNavigation} from "./navigationData";
import "./Style.css"
import {isAuth, signOut} from "../../../auth/Helpers";

const ProfileNavigation = (props) => {
    const logInUser = isAuth().role

    let profileNavigation;

    if (logInUser === "klient") {
        profileNavigation = clientNavigation;
    } else {
        profileNavigation = employeeNavigation;
    }

    const history = useHistory();

    return (
        <div className="profile-nav-container">
            <div className="profile-nav-hello-msg">
                <h1 className="profile-nav-hello">Witaj,</h1>
                <h1 className="profile-nav-name">{isAuth().name}</h1>
            </div>

            <div className="profile-nav-options">
                {
                    profileNavigation.map((name) =>
                        <div
                             className={name.id === props.choose ? "profile-nav-option-choose" : "profile-nav-option"}>
                            <Link to={name.link}>
                                <h1 className={name.id === props.choose ? "profile-nav-option-name-choose" : "profile-nav-option-name"}>{name.name}</h1>
                            </Link>
                        </div>
                    )
                }
            </div>

            <div className="profile-nav-logout-container">
                <h1 onClick={() => {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }}
                    className="profile-nav-option-name">Wyloguj się</h1>
            </div>
        </div>
    );
};

export default ProfileNavigation;
