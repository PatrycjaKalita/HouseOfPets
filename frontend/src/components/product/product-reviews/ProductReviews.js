import React from 'react';
import {Rating} from "@mui/material";

import "./Style.css";
import {productReviews} from "../productData";

const ProductReviews = (props) => {
    return (
        <div id="Opinie" className="product-reviews-main-container">
            <h2 className="product-reviews-title">Opinie</h2>

            <div className="product-reviews-header-container">
                <div>
                    <h1 className="product-reviews-header-average-rating">{props.averageRating.toString().replace('.', ',')}</h1>
                    <h1 className="product-reviews-header-five">/5</h1>
                </div>

                <Rating value={props.averageRating} className="starBorderOutlined" readOnly precision={0.5} max={5}
                        size="large"/>

                <h2 className="product-reviews-header-number-opinion">({productReviews.length} opinie)</h2>
            </div>
        </div>
    );
};

export default ProductReviews;
