import React from 'react';
import './Style.css'
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import imageCat from '../../../assets/cats-shop-form/img3.PNG'
import {Link} from "react-router-dom";
import More from "../more/More";

const ListOfAnimal = (props) => {
    return (
        <div className="main-LOA-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOA-container">
                <div className="LOA-top-part">
                    <div>
                        <h1 className="LOA-title">Wszystkie zwierzęta</h1>
                    </div>


                    <div className="LOA-top-part-icons">
                        <Link to="/profil/pracownik/produkty/dodanie-pupila-do-adopcji">
                            <span className="LOA-option-icon">
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                        </Link>

                        <span className="LOA-option-icon">
                            <ion-icon name="funnel-outline"></ion-icon>
                        </span>
                    </div>
                </div>

                <div className="LOA-list-container">
                    <div className="LOA-one-part-container">
                        <More options={3}/>

                        <img alt="animal" className="LOA-animal-image" src={imageCat}/>
                        <div className="flex">
                            <h1 className="LOA-name">Bucks</h1>
                            <h1 className="LOA-sex">Samica</h1>
                        </div>
                        <h1 className="LOA-breed">Europejski</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfAnimal;
