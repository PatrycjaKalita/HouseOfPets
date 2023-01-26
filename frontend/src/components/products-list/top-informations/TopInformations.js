import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {capitalizeFirstLetter} from '../../../utils/word'
import './Style.css';
import axios from "axios";
import {getCookie, signOut} from "../../../auth/Helpers";

const TopInformations = (props) => {
    let {animalType} = useParams();
    let {productCategory} = useParams();
    const productNumber = props.productsNumber;
    const history = useHistory()
    const token = getCookie('token');

    useEffect(() => {
        loadCategoryDetails();
    }, []);

    const [availableCategoryDetails, setAvailableCategoryDetails] = useState(false);
    const loadCategoryDetails = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/categories-details`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableCategoryDetails(response.data.availableCategoriesDetails);
                console.log(response.data.availableCategoriesDetails)
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
        <div className="main-container-top-informations">
            <div className="product-list-path-container">
                <Link to="/">
                    <span className="product-list-link">House of pets</span>
                </Link>
                <span> > </span>

                <button onClick={goChooseOption}>
                    <span className="product-list-link">{capitalizeFirstLetter(animalType)}</span>
                </button>
                <span> > </span>

                <button onClick={goShopForm}>
                    <span className="product-list-link">Wybieranie</span>
                </button>
                <span> > </span>

                <span>{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
            </div>

            <div className="top-information-title-page">
                <h1 className="top-information-animal-type">{capitalizeFirstLetter(animalType)}</h1>
                <span
                    className="top-information-product-category">{capitalizeFirstLetter(productCategory.replace(/-/g, ' '))}</span>
                <span className="top-information-product-number"> ({productNumber})</span>
            </div>

            {
                availableCategoryDetails.hasOwnProperty('details') === false ?
                    <p className="top-information-description"></p>
                    :
                    availableCategoryDetails.details.map((detail) => {
                        return <p
                            className={detail.link === productCategory ? "top-information-description" : "hidden"}>{detail.description}</p>
                    })
            }

        </div>
    );
};

export default TopInformations;
