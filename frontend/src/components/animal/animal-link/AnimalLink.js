import React from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {capitalizeFirstLetter} from '../../../utils/word'

const AnimalLink = () => {
    let {animalType} = useParams();
    let {animalId} = useParams();
    const history = useHistory()

    const goChooseOption = event => {
        history.push({
            pathname: `/choose-option/${animalType}`
        })
    }

    return (
        <div className="product-list-path-container">
            <Link to="/">
                <span className="product-list-link">House of pets</span>
            </Link>
            <span> > </span>

            <button onClick={goChooseOption}>
                <span className="product-list-link">{capitalizeFirstLetter(animalType)}</span>
            </button>
            <span> > </span>

            <span className="product-list-link">Adopcje</span>

            <span> > </span>

            <span className="product-list-link">{animalId}</span>
        </div>
    );
};

export default AnimalLink;
