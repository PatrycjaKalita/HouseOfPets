import React from 'react';
import "./Style.css";

const ProductNavigation = () => {
    return (
        <div className="product-navigation-main-container">
            <div className="product-navigation-container">
                <a href="#Opis"
                   className="product-navigation-link">Opis produktu
                </a>

                <a href="#Sklad"
                   className="product-navigation-link">Skład
                </a>

                <a href="#Dawkowanie"
                   className="product-navigation-link">Dawkowanie
                </a>

                <a href="#Opinie"
                   className="product-navigation-link">Opinie
                </a>
            </div>
        </div>
    );
};

export default ProductNavigation;
