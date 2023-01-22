import React from 'react';
import "./Style.css";

const ProductDosage = (props) => {
    const low_needs = props.low_needs;
    const body_weight = props.body_weight;
    const moderate_needs = props.moderate_needs;

    return (
        <div id="Dawkowanie" className="product-dosage-main-container">
            <h2 className="product-dosage-title">Dawkowanie</h2>
            <div className="product-dosage-header-container">
                <h1 className="product-dosage-header">Masa ciała</h1>
                <h1 className="product-dosage-header">Umiarkowane</h1>
                <h1 className="product-dosage-header">Niskie</h1>
            </div>

            <div className="product-dosage-container">
                <h1 className="product-dosage-weight-content">{body_weight} kg</h1>
                <h1 className="product-dosage-content">{moderate_needs} g</h1>
                <h1 className="product-dosage-content">{low_needs} g</h1>
            </div>
        </div>
    );
};

export default ProductDosage;
