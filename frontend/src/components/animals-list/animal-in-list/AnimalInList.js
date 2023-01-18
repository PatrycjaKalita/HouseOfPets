import React from 'react';
import './Style.css'

const AnimalInList = (props) => {
    const animalImage = props.animalImage;
    const animalName = props.animalName;
    const animalSex = props.animalSex;
    const animalBreed = props.animalBreed;

    return (
        <div className="AIL-container">
            <img className="AIL-image" src={animalImage} alt={animalName}/>

            <div className="AIL-first-row">
                <h1 className="AIL-name">{animalName}</h1>
                <h1 className={animalSex === "Samiec" ? "AIL-sex-M" : "AIL-sex-K"}>{animalSex}</h1>
            </div>


            <div className="">
                <h1 className="AIL-breed">{animalBreed}</h1>
            </div>
        </div>
    )
};

export default AnimalInList;
