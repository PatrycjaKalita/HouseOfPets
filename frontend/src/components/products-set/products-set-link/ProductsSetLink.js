import React from 'react';
import {Link, useParams} from "react-router-dom";

import './Style.css';
import {capitalizeFirstLetter} from '../../../utils/word'

const ProductLink = () => {
    let {animalType} = useParams();
    let {productName} = useParams();

    return (
        <div className="product-link-container">
            <Link to="/">
                <span className="product-link">House of pets</span>
            </Link>
            <span> > </span>

            <Link to="/choose-option/:animalType">
                <span className="product-link">{capitalizeFirstLetter(animalType)}</span>
            </Link>
            <span> > </span>

            <Link to="/shop-form/:animalType">
                <span className="product-link">Wybieranie</span>
            </Link>
            <span> > </span>

            <Link to="/shop/:animalType/products/:productCategory">
                <span className="product-link">Zestawy</span>
            </Link>
            <span> > </span>

            <span>{capitalizeFirstLetter(productName.replace(/-/g, ' '))}</span>
        </div>
    );
};

export default ProductLink;
