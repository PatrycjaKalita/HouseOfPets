import React from 'react';

import "./Style.css";
import {productDosage} from "../productData";

const ProductDosage = () => {
    return (
        <div id="Dawkowanie" className="product-dosage-main-container">
            <h2 className="product-dosage-title">Dawkowanie</h2>
            <div className="product-dosage-header-container">
                <h1 className="product-dosage-header">Masa ciała</h1>
                <h1 className="product-dosage-header">Umiarkowane</h1>
                <h1 className="product-dosage-header">Niskie</h1>
            </div>
            {
                productDosage.map((product) => (
                    <div className="product-dosage-container">
                        <h1 className="product-dosage-weight-content">{product.masaCiala} kg</h1>
                        <h1 className="product-dosage-content">{product.umiarkowane}</h1>
                        <h1 className="product-dosage-content">{product.niskie}</h1>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductDosage;
