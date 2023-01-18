import React from 'react';
import './Style.css'
import {animalList} from './animalData'

import TopAdoptionInformation from "./TopAdoptionInformation/TopAdoptionInformation";
import AnimalFilters from "./AnimalFilters/AnimalFilters";
import AnimalInList from "./animal-in-list/AnimalInList";
import {Link} from "react-router-dom";


const AnimalsList = () => {
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
                        animalList.map((animal) => (
                            <Link to={animal.link}>
                                <AnimalInList animalImage={animal.image}
                                              animalName={animal.name} animalSex={animal.sex}
                                              animalBreed={animal.breed}/>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AnimalsList;
