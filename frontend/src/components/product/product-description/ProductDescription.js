import React from 'react';

import "./Style.css";
import {productDescription} from "../productData";

const ProductDescription = () => {
    return (
        <div id="Opis" className="product-description-main-container">
            <h1 className="product-description-title">Opis</h1>
            {
                productDescription.map((productDescription) => (
                    <>
                        <h2 className="product-description-content">{productDescription.contentPartOne}</h2>
                        <h2 className="product-description-content">{productDescription.contentPartTwo}</h2>
                        <img className="product-description-image" src={productDescription.image} alt=""/>
                    </>
                ))
            }
        </div>
    );
};

export default ProductDescription;
