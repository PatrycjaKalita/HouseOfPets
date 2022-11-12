import React, {useState} from 'react';

import './Style.css';

const ProductInList = (props) => {
    const productImage = useState(props.productImage);
    const productTitle = useState(props.productTitle);
    const productRating = useState(props.productRating);
    const productPrice = useState(props.productPrice);

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
                    <h1 className="product-list-price">{productPrice}zł</h1>
                </div>
            </div>
        </div>
    );
};

export default ProductInList;
