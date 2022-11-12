import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";

import './Style.css';

const TopInformations = (props) => {
    let {animalType} = useParams();
    let {productCategory} = useParams();
    const productNumber = useState(props.productsNumber);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="main-container-top-informations">
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

                <span>{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
            </div>

            <div className="top-information-title-page">
                <h1 className="top-information-animal-type">{capitalizeFirstLetter(animalType)}</h1>
                <span
                    className="top-information-product-category">{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
                <span className="top-information-product-number">({productNumber})</span>
            </div>

            <h1 className="top-information-description-title">Sucha karma dla kotów - mit</h1>
            <p className="top-information-description">
                Jako posiadacz małego tygrysa, z pewnością znasz karmę mokrą i karmę suchą.
                Niestety wśród posiadaczy zwierząt nadal pokutuje mit, że sucha karma nie jest najlepszym rozwiązaniem.
                Czy to jednak prawda? <br/>
                Dobrze skomponowana sucha karma powinna w znacznym stopniu powinna składać się z produktów mięsnych,
                uzupełnionych innymi cennymi składnikami odżywczymi.
                Co więcej, twarde „chrupki” pomagają utrzymać zęby i dziąsła kota w dobrym stanie.
                Podczas jedzenia pomagają kotu usuwać osad i kamień nazębny.
            </p>
        </div>
    );
};

export default TopInformations;
