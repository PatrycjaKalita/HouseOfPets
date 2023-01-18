import React from 'react';
import {Link, useParams} from "react-router-dom";
import {capitalizeFirstLetter} from '../../../utils/word'

const AnimalLink = () => {
    let {animalType} = useParams();
    let {animalName} = useParams();

    return (
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

            <span className="product-list-link">Adopcje</span>

            <span> > </span>

            <span className="product-list-link">{animalName}</span>
        </div>
    );
};

export default AnimalLink;
