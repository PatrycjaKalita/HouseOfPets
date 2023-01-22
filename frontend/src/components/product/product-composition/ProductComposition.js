import React from 'react';
import "./Style.css";

const ProductComposition = (props) => {
    const productComposition = props.productComposition;
    const productAdditives = props.productAdditives;

    return (
        <div id="Sklad" className="product-composition-main-container">
            <h1 className="product-composition-title">Skład</h1>
                        <h2 className="product-composition-content">{productComposition}</h2>

            <div className={productAdditives.length === 0 ? "hidden" : ""}>
                        <h2 className="product-composition-extra">Dodatki (na 1kg karmy):</h2>
                        <h2 className="product-composition-content">{productAdditives}</h2>
            </div>
        </div>
    );
};

export default ProductComposition;
