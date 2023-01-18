import React from 'react';
import './Style.css'
import AnimalLink from "./animal-link/AnimalLink";
import {animal} from './animalData'
import AnimalProposedProducts from "./animal-proposed-products/AnimalProposedProducts";

const Animal = () => {

    return (
        <div className="main-animal-container">
            <AnimalLink/>

            {
                animal.map((animal) => (
                    <div className="animal-container">
                        <div className="animal-img-container">
                            <img className="animal-img" alt="" src={animal.image}/>
                        </div>

                        <div className="animal-vertical-line"></div>

                        <div className="animal-details-container">
                            <h1 className="animal-name">{animal.name}</h1>

                            <div className="animal-detail-row">
                                <h1 className="animal-detail-name">Rasa:</h1>
                                <h1 className="animal-detail-value">{animal.breed}</h1>
                            </div>

                            <div className="animal-detail-row">
                                <h1 className="animal-detail-name">Płeć:</h1>
                                <h1 className={animal.sex === "Samiec" ? "animal-sex-M" : "animal-sex-K"}>{animal.sex}</h1>
                            </div>

                            <div className="animal-detail-row">
                                <h1 className="animal-detail-name">Wiek:</h1>
                                <h1 className="animal-detail-value">{animal.age}</h1>
                            </div>

                            <div className="animal-detail-row">
                                <h1 className="animal-detail-name">Waga:</h1>
                                <h1 className="animal-detail-value">{animal.weight}</h1>
                            </div>

                            <div className="animal-caretaker-container">
                                <div className="animal-caretaker-phone-info">
                                    <div className="animal-caretaker-info-title">
                                        <span className="animal-caretaker-info-icon">
                                            <ion-icon name="call"></ion-icon>
                                        </span>
                                        <h1 className="animal-caretaker-info-name">Telefon</h1>
                                    </div>
                                    <h1 className="animal-detail-value">{animal.phoneNumber}</h1>
                                </div>

                                <div className="animal-caretaker-mail-info">
                                    <div className="animal-caretaker-info-title">
                                        <span className="animal-caretaker-info-icon">
                                            <ion-icon name="mail"></ion-icon>
                                        </span>
                                        <h1 className="animal-caretaker-info-name">Mail</h1>
                                    </div>
                                    <h1 className="animal-detail-value">{animal.mail}</h1>
                                </div>
                            </div>

                            <div className="animal-caretaker-address-info">
                                <div className="animal-caretaker-info-title">
                                        <span className="animal-caretaker-info-icon">
                                            <ion-icon name="home"></ion-icon>
                                        </span>
                                    <h1 className="animal-caretaker-info-name">Adres pobytu zwierzątka</h1>
                                </div>
                                <h1 className="animal-detail-value">{animal.address}</h1>
                            </div>
                        </div>
                    </div>

                ))
            }

            {
                animal.map((animal) => (
                    <div className="animal-description-container">
                        <h1 className="animal-description-title">O zwierzątku</h1>
                        <p className="animal-description-value">{animal.descriptionAboutAnimal}</p>
                    </div>
                ))
            }

            <AnimalProposedProducts/>
        </div>
    );
};

export default Animal;
