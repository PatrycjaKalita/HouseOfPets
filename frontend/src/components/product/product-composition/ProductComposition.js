import React from 'react';

import "./Style.css";
import {productComposition} from "../productData";
import ProductAnalyticalIngredients from "../product-analytical-ingredients/ProductAnalyticalIngredients";

const ProductComposition = () => {
    return (
        <div id="Sklad" className="product-composition-main-container">
            <h1 className="product-composition-title">Skład</h1>
            {
                productComposition.map((productComposition) => (
                    <>
                        <h2 className="product-composition-content">{productComposition.composition}</h2>
                        <h2 className="product-composition-extra">Dodatki (na 1kg karmy):</h2>
                        <h2 className="product-composition-content">{productComposition.additives}</h2>
                    </>
                ))
            }
            <ProductAnalyticalIngredients/>
        </div>
    );
};

export default ProductComposition;
