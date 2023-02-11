import React, {useEffect, useMemo, useState} from 'react';
import {Link, useHistory} from "react-router-dom";

import './Style.css';
import PromotionsSlider from "./promotions-slider/PromotionsSlider";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {promotion} from "../../../utils/product";

const Bestsellers = () => {
    const history = useHistory()
    useEffect(() => {
        loadBestsellers();
    }, []);
    const token = getCookie('token');

    const [availableBestsellers, setAvailableBestsellers] = useState(false);
    const loadBestsellers = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/home-page/bestsellers`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableBestsellers(response.data.availableProductsList);
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

    const productTitle = (title) => {
        if (title.length > 22) {
            const tmp = title.slice(0, 22);
            return tmp + "..";
        } else if (title.length <= 22)
            return title;
    }

    return (
        <div className="main-bestseller-container">
            <div className="bestseller-container">
                <h1 className="bestseller-title">Najczęściej wybierane produkty</h1>
                <div className="bestseller-slider-container">
                    <div className="bestseller-products-container">
                        {
                            availableBestsellers.hasOwnProperty('product') === false ?
                                <div className="circular-progress-container">
                                    <CircularProgress color="inherit"/>
                                </div>
                                :
                                availableBestsellers.product.map((bestseller) => {
                                    return<Link to={bestseller.link}>
                                        <div className="product-container">
                                            <img className="product-container-img" src={bestseller.image} alt=""/>
                                            <h2 className="product-container-title">{productTitle(bestseller.name)}</h2>

                                            <h1 className={bestseller.sale === 0 ? "product-container-price" : "hidden"}>{bestseller.price.toFixed(2)} zł</h1>

                                            <div className="flex">
                                                <h1 className={bestseller.sale !== 0 ? "product-container-price-old" : "hidden"}>{bestseller.price.toFixed(2)} zł</h1>
                                                <h1 className={bestseller.sale !== 0 ? "product-container-price-promotion" : "hidden"}>{promotion(bestseller.price, bestseller.sale)} zł</h1>
                                            </div>
                                        </div>
                                    </Link>
                                })
                        }
                    </div>

                    <PromotionsSlider/>
                </div>
            </div>
        </div>
    );
};

export default Bestsellers;
