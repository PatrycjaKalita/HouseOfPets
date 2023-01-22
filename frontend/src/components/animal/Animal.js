import React, {useEffect, useState} from 'react';
import './Style.css'
import AnimalLink from "./animal-link/AnimalLink";
import AnimalProposedProducts from "./animal-proposed-products/AnimalProposedProducts";
import {useHistory, useParams} from "react-router-dom";
import {getCookie, signOut} from "../../auth/Helpers";
import axios from "axios";

const Animal = () => {
    const {animalId} = useParams();
    const token = getCookie('token');
    const history = useHistory()

    useEffect(() => {
        loadAnimalForAdoption();
    }, []);

    const [availableAnimalForAdoption, setAvailableAnimalForAdoption] = useState(false);
    const loadAnimalForAdoption = () => {
        /*21*/
        let newLink = window.location.href.replace('http://localhost:3000','')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/animal-for-adoption?animal_link=${newLink}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAnimalForAdoption(response.data.availableAnimalForAdoption);
                console.log(response.data)
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };
    return (
        <div className="main-animal-container">
            <AnimalLink/>
            {
                availableAnimalForAdoption.hasOwnProperty('animalForAdoption') === false ?
                    <h1>Loading..</h1>
                    :
                    availableAnimalForAdoption.animalForAdoption.map((animal) => {
                        return <>
                            <div className="animal-container">
                                <div className="animal-img-container">
                                    <img className="animal-img" alt="" src={animal.image}/>
                                </div>

                                <div className="animal-vertical-line"></div>

                                <div className="animal-details-container">
                                    <h1 className="animal-name">{animal.name}</h1>

                                    <div className="animal-detail-row">
                                        <h1 className="animal-detail-name">Rasa:</h1>
                                        <h1 className="animal-detail-value">{animal.breeds[0].name}</h1>
                                    </div>

                                    <div className="animal-detail-row">
                                        <h1 className="animal-detail-name">Płeć:</h1>
                                        <h1 className={animal.sex === "Samiec" ? "animal-sex-M" : "animal-sex-K"}>{animal.sex}</h1>
                                    </div>

                                    <div className="animal-detail-row">
                                        <h1 className="animal-detail-name">Wiek:</h1>
                                        <h1 className="animal-detail-value">{animal.ages[0].number_with_name}</h1>
                                    </div>

                                    <div className="animal-detail-row">
                                        <h1 className="animal-detail-name">Waga:</h1>
                                        <h1 className="animal-detail-value">{animal.weights[0].number}</h1>
                                    </div>

                                    <div className="animal-caretaker-container">
                                        <div className="animal-caretaker-phone-info">
                                            <div className="animal-caretaker-info-title">
                                        <span className="animal-caretaker-info-icon">
                                            <ion-icon name="call"></ion-icon>
                                        </span>
                                                <h1 className="animal-caretaker-info-name">Telefon</h1>
                                            </div>
                                            <h1 className="animal-detail-value">{animal.phone_number}</h1>
                                        </div>

                                        <div className="animal-caretaker-mail-info">
                                            <div className="animal-caretaker-info-title">
                                        <span className="animal-caretaker-info-icon">
                                            <ion-icon name="mail"></ion-icon>
                                        </span>
                                                <h1 className="animal-caretaker-info-name">Mail</h1>
                                            </div>
                                            <h1 className="animal-detail-value">{animal.email}</h1>
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

                            <div className="animal-description-container">
                                <h1 className="animal-description-title">O zwierzątku</h1>
                                <p className="animal-description-value">{animal.short_description}</p>
                            </div>
                        </>
                    })
            }
            <AnimalProposedProducts/>
        </div>
    );
};

export default Animal;
