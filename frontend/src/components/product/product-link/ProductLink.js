import React from 'react';
import {Link, useHistory, useParams} from "react-router-dom";

import './Style.css';
import {capitalizeFirstLetter} from '../../../utils/word'

const ProductLink = () => {
    let {animalType} = useParams();
    let {productCategory} = useParams();
    let {productName} = useParams();
    const history = useHistory()

    const goChooseOption = event => {
        history.push({
            pathname: `/choose-option/${animalType}`
        })
    }

    const goShopForm = event => {
        history.push({
            pathname: `/shop-form/${animalType}`
        })
    }

    return (
        <div className="product-link-container">
            <Link to="/">
                <span className="product-link">House of pets</span>
            </Link>
            <span> > </span>

            <button onClick={goChooseOption}>
                <span className="product-link">{capitalizeFirstLetter(animalType)}</span>
            </button>
            <span> > </span>

            <button onClick={goShopForm}>
                <span className="product-link">Wybieranie</span>
            </button>
            <span> > </span>

            <Link to="/shop/:animalType/products/:productCategory">
                <span className="product-link">{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
            </Link>
            <span> > </span>

            <span>{capitalizeFirstLetter(productName.replace(/-/g, ' '))}</span>
        </div>
    );
};

export default ProductLink;
