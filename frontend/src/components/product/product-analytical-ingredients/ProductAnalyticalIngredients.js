import React from 'react';
import "./Style.css";

const ProductAnalyticalIngredients = (props) => {
    const protein = props.protein;
    const fat = props.fat;
    const ash = props.ash;
    const fiber = props.fiber;
    return (
        <div className="product-analytical-ingredients-main-container">
            <h2 className="product-analytical-ingredients-title">Składniki analityczne</h2>
            <div className="product-analytical-ingredients-container">
                <h1 className="product-analytical-ingredients-header">Białko surowe</h1>
                <h1 className="product-analytical-ingredients-content">{protein} %</h1>
            </div>
            <div className="product-analytical-ingredients-container">
                <h1 className="product-analytical-ingredients-header">Tłuszcz surowe</h1>
                <h1 className="product-analytical-ingredients-content">{fat} %</h1>
            </div>
            <div className="product-analytical-ingredients-container">
                <h1 className="product-analytical-ingredients-header">Popiół surowe</h1>
                <h1 className="product-analytical-ingredients-content">{ash} %</h1>
            </div>
            <div className="product-analytical-ingredients-container">
                <h1 className="product-analytical-ingredients-header">Włókno surowe</h1>
                <h1 className="product-analytical-ingredients-content">{fiber} %</h1>
            </div>
        </div>
    );
};

export default ProductAnalyticalIngredients;
