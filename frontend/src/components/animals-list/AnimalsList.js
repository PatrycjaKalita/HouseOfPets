import React, {useEffect, useState} from 'react';
import './Style.css'
import TopAdoptionInformation from "./TopAdoptionInformation/TopAdoptionInformation";
import AnimalFilters from "./AnimalFilters/AnimalFilters";
import AnimalInList from "./animal-in-list/AnimalInList";
import {Link, useHistory, useParams} from "react-router-dom";
import {getCookie, signOut} from "../../auth/Helpers";
import axios from "axios";

const AnimalsList = () => {
    const {animalType} = useParams();
    const token = getCookie('token');
    const history = useHistory()

    useEffect(() => {
        loadAnimalsForAdoptionList();
    }, []);

    const [availableAnimalsForAdoptionList, setAvailableAnimalsForAdoptionList] = useState(false);
    const loadAnimalsForAdoptionList = () => {
        let formattedAnimalType = ''

        if (animalType === 'koty') {
            formattedAnimalType = 'Kot'
        } else if (animalType === 'psy') {
            formattedAnimalType = 'Pies'
        } else if (animalType === 'małe-zwierzątka') {
            formattedAnimalType = 'Małe zwierzątko'
        }

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/animals-list-for-adoption?animal_type=${formattedAnimalType}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAnimalsForAdoptionList(response.data.availableAnimalsForAdoptionList);
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
        <div className="main-container-animals-list">
            <TopAdoptionInformation/>

            <div className="AL-title-container">
                <h1 className="AL-title-list">Lista pupili do adopcji</h1>
            </div>

            <div className="AL-container">
                <AnimalFilters/>

                <div className="AL-animal-list-container">
                    {
                        availableAnimalsForAdoptionList.hasOwnProperty('animalForAdoption') === false ?
                            <h1>Loading..</h1>
                            :
                            availableAnimalsForAdoptionList.animalForAdoption.map((animal) => {
                                return <Link to={animal.link}>
                                    <AnimalInList animalImage={animal.image}
                                                  animalName={animal.name} animalSex={animal.sex}
                                                  animalBreed={animal.breeds[0].name}/>
                                </Link>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default AnimalsList;
