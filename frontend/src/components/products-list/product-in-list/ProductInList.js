import React from 'react';

import './Style.css';
import {countPromotion} from '../../../utils/product'

const ProductInList = (props) => {
    const productImage = props.productImage;
    const productTitle = props.productTitle;
    const productRating = props.productRating;

    let productPrice = props.productPrice;
    const productPromotion = props.productPromotion;

    return (
        <div className="product-inlist-container">
            <img className="product-list-img" src={productImage} alt=""/>
            <h1 className="product-list-title">{productTitle}</h1>

            <div className="product-list-sec-row">
                <div className="product-list-rating-container">
                    <span className="product-list-star">
                        <ion-icon name="star"></ion-icon>
                    </span>

                    <h1 className="product-list-rating">{productRating}</h1>
                </div>

                <div className="product-list-container-price">
                    <h1 className={productPromotion === false ? "product-list-price" : "hidden"}>{productPrice.toFixed(2)} zł</h1>
                    <h1 className={productPromotion === true  ? "product-list-price-promotion" : "hidden"}>{countPromotion(productPromotion, productPrice)} zł</h1>
                </div>

                <div className={productPromotion === true  ? "product-list-container-price-old" : "hidden"}>
                    <h1 className="product-list-price-old">{productPrice.toFixed(2)} zł</h1>
                </div>
            </div>
        </div>
    );
};

export default ProductInList;
