import React, {useEffect, useState} from 'react';
import './Style.css'
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link, useHistory} from "react-router-dom";
import More from "../more/More";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";

const ListOfAnimal = (props) => {
    const history = useHistory()
    useEffect(() => {
        loadAnimalsList();
    }, []);
    const token = getCookie('token');

    const [availableAnimalsList, setAvailableAnimalsList] = useState(false);
    const loadAnimalsList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/animals-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAnimalsList(response.data.availableAnimalsList);
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
                    {
                        availableAnimalsList.hasOwnProperty('animal') === false ?
                            <h1>Loading..</h1>
                            :
                            availableAnimalsList.animal.map((animal) => {
                                return <div className="LOA-one-part-container">
                                    <More options={3} animalID={animal._id}/>

                                    <Link to={animal.link}>
                                    <img alt="animal" className="LOA-animal-image" src={animal.image}/>
                                    <div className="flex">
                                        <h1 className="LOA-name">{animal.name}</h1>
                                        <h1 className={animal.sex === "Samiec" ? "LOA-sex-M" : "LOA-sex"}>{animal.sex}</h1>
                                    </div>
                                    <h1 className="LOA-breed">{animal.breeds[0].name}</h1>
                                </Link>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default ListOfAnimal;
