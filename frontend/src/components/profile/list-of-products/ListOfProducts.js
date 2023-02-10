import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link, useHistory} from "react-router-dom";

import './Style.css'
import More from "../more/More";
import {productTitleShort, promotion} from '../../../utils/product'
import axios from "axios";
import {getCookie, signOut} from "../../../auth/Helpers";

const ListOfProducts = (props) => {
    const productRating = false;
    const token = getCookie('token');
    const history = useHistory()

    useEffect(() => {
        loadProductsList();
    }, []);

    const [availableProductsList, setAvailableProductsList] = useState(false);
    const loadProductsList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsList(response.data.availableProductsList);
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

    return (<div className="main-LOP-container">
        <ProfileNavigation choose={props.choose}/>

        <div className="LOP-container">
            <div className="LOP-top-part">
                <div>
                    <h1 className="LOP-title">Wszystkie produkty</h1>
                </div>

                <div className="LOP-top-part-icons">
                    <Link to="/profil/pracownik/produkty/dodanie-nowego-produktu">
                            <span className="LOP-option-icon">
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                    </Link>

                    <span className="LOP-option-icon">
                            <ion-icon name="funnel-outline"></ion-icon>
                        </span>
                </div>
            </div>

            <div className="LOP-list-container">
                {
                    availableProductsList.hasOwnProperty('product') === false ?
                        <h1>Loading..</h1>
                        :
                        availableProductsList.product.map((product) => {
                            return <div className="LOP-one-part-container">
                                <More options={4} productID={product._id}/>

                                <Link to={product.link}>
                                    <img alt="animal" className="LOP-animal-image" src={product.image}/>
                                    <h1 className="LOP-name">{productTitleShort(product.name)}</h1>

                                    <div className="LOP-product-info">
                                        <div className={productRating === false ? "hidden" : "product-list-rating-container"}>
                                                <span className="LOP-list-star">
                                                    <ion-icon name="star"></ion-icon>
                                                </span>
                                            <h1 className="LOP-list-rating">4.2</h1>
                                        </div>

                                        <div className="LOP-list-container-price flex">
                                            <h1 className={product.sale !== 0 ? "LOP-list-price-old": "hidden"}>{product.price.toFixed(2)} zł</h1>
                                            <h1 className={product.sale !== 0 ? "LOP-list-price-promotion" : "hidden"}>{promotion(product.price, product.sale)} zł</h1>

                                            <h1 className={product.sale === 0 ? "LOP-list-price" : "hidden"}>{product.price.toFixed(2)} zł</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })
                }
            </div>
        </div>
    </div>);
};

export default ListOfProducts;
