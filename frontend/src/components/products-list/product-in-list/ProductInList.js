import React from 'react';

import './Style.css';
import {promotion} from '../../../utils/product'

const ProductInList = (props) => {
    const productImage = props.productImage;
    const productTitle = props.productTitle;
    const productRating = false;

    let productPrice = props.productPrice;
    const productPromotion = props.productPromotion;

    return (
        <div className="product-inlist-container">
            <img className="product-list-img" src={productImage} alt=""/>
            <h1 className="product-list-title">{productTitle}</h1>

            <div className="product-list-sec-row">
                <div className={ productRating === true ? "product-list-rating-container" : "hidden"}>
                    <span className="product-list-star">
                        <ion-icon name="star"></ion-icon>
                    </span>

                    <h1 className="product-list-rating">3</h1>
                </div>

                <div className="product-list-container-price">
                    <h1 className={productPromotion === 0 ? "product-list-price" : "hidden"}>{productPrice.toFixed(2)} zł</h1>

                    <h1 className={productPromotion !== 0  ? "product-list-price-old" : "hidden"}>{productPrice.toFixed(2)} zł</h1>
                    <h1 className={productPromotion !== 0  ? "product-list-price-promotion" : "hidden"}>{promotion(productPrice, productPromotion)} zł</h1>
                </div>

            </div>
        </div>
    );
};

export default ProductInList;
