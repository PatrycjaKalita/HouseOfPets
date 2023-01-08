import React, {useState, useEffect} from 'react';

import './Style.css';

const ProductInList = (props) => {
    const productImage = props.productImage;
    const productTitle = props.productTitle;
    const productRating = props.productRating;

    let productPrice = props.productPrice;
    const productPromotion = props.productPromotion;

    const [productPricePromotion, setProductPricePromotion] = useState(0);
    const [showed, setShowed] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        if (productPromotion === true) {
            let promotion = (productPrice / 100) * 10
            setProductPricePromotion(productPrice - promotion)
            console.log(productPricePromotion)
            setShowed(true)
        }

    });

    return (
        <div className="product-list-container">
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
                    <h1 className={showed ? "hidden" : "product-list-price"}>{productPrice.toFixed(2)} zł</h1>
                    <h1 className={showed ? "product-list-price-promotion" : "hidden"}>{productPricePromotion.toFixed(2)} zł</h1>
                </div>

                <div className={showed ? "product-list-container-price-old" : "hidden"}>
                    <h1 className="product-list-price-old">{productPrice.toFixed(2)} zł</h1>
                </div>
            </div>
        </div>
    );
};

export default ProductInList;
