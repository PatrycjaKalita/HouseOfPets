import React from 'react';
import "./Style.css";

const ProductDescription = (props) => {
    const productDescription = props.productDescription;
    const productExtraDescription = props.productExtraDescription;
    const productDescriptionImage = props.productDescriptionImage;
    return (
        <div id="Opis" className="product-description-main-container">
            <h1 className="product-description-title">Opis</h1>

            <h2 className="product-description-content">{productDescription}</h2>
            <h2 className={productExtraDescription.length === 0 ? "hidden" : "product-description-content"}>{productExtraDescription}</h2>
            <img className={productDescriptionImage.length === 0 ? "hidden" : "product-description-image"} src={productDescriptionImage} alt=""/>
        </div>
    );
};

export default ProductDescription;
