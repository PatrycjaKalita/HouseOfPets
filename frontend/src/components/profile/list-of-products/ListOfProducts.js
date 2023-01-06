import React from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link} from "react-router-dom";

import './Style.css'


const ListOfProducts = (props) => {
    return (
        <div className="main-LOP-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOP-container">
                <div className="LOP-top-part">
                    <div>
                        <h1 className="LOP-title">Wszystkie konta</h1>
                    </div>


                    <div className="LOP-top-part-icons">
                        <Link to="/profil/pracownik/produkty/dodanie-nowego-produktu">
                            <span className="LOP-option-icon">
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                        </Link>

                        <span className="LOP-option-icon">
                            <ion-icon name="funnel-outline"></ion-icon>
                        </span>
                    </div>
                </div>

                <div>
                    Lista produktów
                </div>

            </div>
        </div>
    );
};

export default ListOfProducts;
