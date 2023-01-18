import React from 'react';
import './Style.css'
import searchAnimal from '../../../assets/listOfAnimalsToAdoption/search-animal.png'
import contact from '../../../assets/listOfAnimalsToAdoption/love-mail.png'
import meeting from '../../../assets/listOfAnimalsToAdoption/meeting.png'
import adoption from '../../../assets/listOfAnimalsToAdoption/heart.png'
import arrow from '../../../assets/listOfAnimalsToAdoption/arrow.png'
import {capitalizeFirstLetter, capitalizeWholeWorld} from '../../../utils/word'
import {Link, useParams} from "react-router-dom";

const TopAdoptionInformation = () => {
    let {animalType} = useParams();

    function changeLastLetter(string) {
        if (string === "koty") {
            let name = string.slice(0, -1);
            return name + "A"
        } else if (string === "psy") {
            let name = string.slice(0, -1);
            return name + "A"
        } else if (string === "male zwierzatka") {
            let name = string.slice(0, -1);
            return name + "O"
        }
    }

    return (
        <div className="main-container-top-informations">
            <div className="product-list-path-container">
                <Link to="/">
                    <span className="product-list-link">House of pets</span>
                </Link>
                <span> > </span>

                <Link to="/choose-option/koty">
                    <span className="product-list-link">{capitalizeFirstLetter(animalType)}</span>
                </Link>
                <span> > </span>

                <Link to="/shop-form/koty">
                    <span className="product-list-link">Wybieranie</span>
                </Link>
                <span> > </span>

                <span className="product-list-link">Adopcja</span>
            </div>

            <div className="TAI-title-container">
                <h1 className="TAI-title-list">ADOPTUJ {capitalizeWholeWorld(changeLastLetter(animalType))}</h1>
                <h1 className="TAI-title-question">Jak zaadoptować zwierzątko?</h1>
            </div>

            <div className="TAI-how-adopt-container">
                <div className="TAI-point-container">
                    <img alt="szukaj" src={searchAnimal} className="TAI-point-image"/>
                    <h1 className="TAI-point-title">Wybierz zwierzątko</h1>
                    <p className="TAI-point-description">Sprawdź naszą listę zwierzątek i podaruj jednemu z nich nowy dom.</p>
                </div>

                <img alt="strzalka" src={arrow} className="TAI-point-img-arrow"/>

                <div className="TAI-point-container">
                    <img alt="kontakt" src={contact} className="TAI-point-image"/>
                    <h1 className="TAI-point-title">Skontaktuj się z nami</h1>
                    <p className="TAI-point-description">W opisie każdego zwierzątka
                        znajduje się numer telefonu lub mail do jego opiekuna.</p>
                </div>

                <img alt="strzalka" src={arrow} className="TAI-point-img-arrow"/>

                <div className="TAI-point-container">
                    <img alt="spotkanie" src={meeting} className="TAI-point-image"/>
                    <h1 className="TAI-point-title">Spotkaj się ze zwierzątkiem</h1>
                    <p className="TAI-point-description">Zaaranżujemy Twoje spotkanie z
                        wybranym przez Ciebie zwierzątkiem i omówimy szczegóły adopcji.</p>
                </div>

                <img alt="strzalka" src={arrow} className="TAI-point-img-arrow"/>

                <div className="TAI-point-container">
                    <img alt="adopcja" src={adoption} className="TAI-point-image"/>
                    <h1 className="TAI-point-title">ADOPCJA!</h1>
                    <p className="TAI-point-description">Hurra! Nasz pupil, dzięki Tobie ma swój nowy dom!</p>
                </div>
            </div>
        </div>
    );
};

export default TopAdoptionInformation;
