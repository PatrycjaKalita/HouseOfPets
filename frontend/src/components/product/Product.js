import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Rating} from "@mui/material";

import './Style.css';
import {set, productInfo, productReviews, productWeight} from './productData';
import {updatePrice} from '../../utils/product'
import ProductNavigation from "./product-navigation/ProductNavigation";
import ProductDescription from "./product-description/ProductDescription";
import ProductComposition from "./product-composition/ProductComposition";
import ProductDosage from "./product-dosage/ProductDosage";
import ProductReviews from "./product-reviews/ProductReviews";
import ProductLink from "./product-link/ProductLink";
import ProductsSet from "./products-set/ProductsSet";

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    let {productCategory} = useParams();
    let totalRatings = 0;
    productReviews.forEach(({numberOfStars}) => totalRatings += numberOfStars);

    let averageRating = totalRatings / productReviews.length;
    averageRating = averageRating.toFixed(1);

    function checkNumberOfOpinions(number) {
        if (number <= 0) {
            return "(0 opinii)";
        } else if (number === 1) {
            return "(" + number + " opinia)";
        } else if (number === 2 || number === 3 || number === 4) {
            return "(" + number + " opinie)";
        } else if (number >= 5) {
            return "(" + number + " opinii)";
        }
    }

    function checkProductAvailability(number) {
        if (number <= 0) {
            return "Nie dostępny";
        } else
            return "Dostępny";
    }

    let product;
    if(productCategory === "zestawy"){
        product = set;
    }else{
        product = productInfo;
    }

    return (
        <>
            <div className="main-product-container">
                <ProductLink/>

                {
                    product.map((product) => (
                        <div className="main-details-container">
                            <div className="product-img-container">
                                <img className="product-img" alt="" src={product.image}/>
                            </div>

                            <div className="product-vertical-line"></div>

                            <div className="product-main-details-container">
                                <h1 className="product-name">{product.title}</h1>

                                <div className="product-rating-container">
                                    <Rating className="starBorderOutlined" value={averageRating} readOnly
                                            precision={0.5} max={5} size="small"/>

                                    <h1 className="product-number-opinions">{checkNumberOfOpinions(productReviews.length)}</h1>

                                    <h1 className={product.quantity > 0 ? "product-availability" : "product-no-availability"}>{checkProductAvailability(product.quantity)}</h1>
                                </div>

                                <div className={productCategory === "zestawy" ? "hidden" : "product-producer-container"}>
                                    <h1 className="product-producer-name">Producent:</h1>
                                    <h1 className="product-producer-value">{product.producer}</h1>
                                </div>

                                <div className="product-code-container">
                                    <h1 className="product-variable-name">Kod produktu:</h1>
                                    <h1 className="product-variable-value">{product.code}</h1>
                                </div>

                                <div className="product-delivery-container">
                                    <h1 className="product-variable-name">Dostawa:</h1>
                                    <h1 className="product-variable-value">1 dzień roboczy</h1>
                                </div>

                                <div className={productCategory === "zestawy" ? "hidden" : "product-weights-container"}>
                                    <h1 className="product-weight-name">Waga:</h1>
                                    <div className="flex">
                                        {
                                            productWeight.map((weight) => (
                                                <Link to="/">
                                                    <button
                                                        className={weight.weight === product.weight ? "product-weight-view-btn" : "product-weight-btn"}>
                                                        {weight.weight} g
                                                    </button>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="product-quantity-price-container">
                                    <div className="product-quantity-container">
                                        <h1 className="product-quantity-name">Ilość:</h1>
                                        <div className="product-btn-quantity">
                                            <button className="product-btn-minus"
                                                    onClick={() => {
                                                        setQuantity(quantity - 1);
                                                    }}>
                                                -
                                            </button>

                                            <h1 className="product-btn-quantity-number">{quantity}</h1>

                                            <button className="product-btn-plus" onClick={() => {
                                                setQuantity(quantity + 1);
                                            }}>
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <h1 className="product-main-price">{updatePrice(product.price, quantity)}</h1>
                                </div>

                                <div className="product-btn-add-container">
                                    <button className="product-btn-add-to-card">Dodaj do koszyka</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={productCategory === "zestawy" ? "hidden" : ""}>
                <ProductNavigation/>
                <ProductDescription/>
                <ProductComposition/>
                <ProductDosage/>
            </div>
            <div className={productCategory === "zestawy" ? "" : "hidden"}>
                <ProductsSet/>
            </div>
            <ProductReviews averageRating={averageRating}/>
        </>
    );
};

export default Product;
