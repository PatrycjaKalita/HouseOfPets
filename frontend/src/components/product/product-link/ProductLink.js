import React from 'react';
import {Link, useParams} from "react-router-dom";

import './Style.css';
import {capitalizeFirstLetter} from '../../../utils/word'

const ProductLink = () => {
    let {animalType} = useParams();
    let {productCategory} = useParams();
    let {productName} = useParams();

    return (
        <div className="product-link-container">
            <Link to="/">
                <span className="product-link">House of pets</span>
            </Link>
            <span> > </span>

            <Link to="/choose-option/koty">
                <span className="product-link">{capitalizeFirstLetter(animalType)}</span>
            </Link>
            <span> > </span>

            <Link to="/shop-form/koty">
                <span className="product-link">Wybieranie</span>
            </Link>
            <span> > </span>

            <Link to="/shop/koty/products/sucha-karma">
                <span className="product-link">{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
            </Link>
            <span> > </span>

            <span>{capitalizeFirstLetter(productName.replace(/-/g, ' '))}</span>
        </div>
    );
};

export default ProductLink;
