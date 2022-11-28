import React from 'react';

import "./Style.css";
import {analyticalIngredients} from "../productData";

const ProductAnalyticalIngredients = () => {
    return (
        <div className="product-analytical-ingredients-main-container">
            <h2 className="product-analytical-ingredients-title">Składniki analityczne</h2>
            {
                analyticalIngredients.map((product) => (
                    <div className="product-analytical-ingredients-container">
                        <h1 className="product-analytical-ingredients-header">{product.header}</h1>
                        <h1 className="product-analytical-ingredients-content">{product.content} %</h1>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductAnalyticalIngredients;
