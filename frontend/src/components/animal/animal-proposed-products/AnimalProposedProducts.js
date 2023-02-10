import React from 'react';
import './Style.css'
import {proposedProducts} from "./proposedProducts";
import {productTitleShort} from "../../../utils/product";
import {Link} from "react-router-dom";

const AnimalProposedProducts = () => {
    return (
        <div>
            <h1 className="animal-description-title">Proponowane produkty i zestawy</h1>
            <p className="animal-pp-description">Poniżej znajdują się produkty i zestawy, które zostały wybrane dla tego
                zwierzątka. Pomogą Ci one w codziennej pielęgnacji go. Jeśli to Twoje pierwsze zwierzątko mamy również w
                naszej ofercie zestaw “STARTER PACK”, który ma wszystko co potrzebujesz na start. </p>

            <div className="APP-product-list-container">
                {
                    proposedProducts.map((product) => (
                        <Link to="/shop/koty/productsset/zestawy/koci-starter-pack">
                            <div className="APP-product-container">
                                <img alt={product.name} src={product.image} className="APP-product-list-img"/>
                                <h1 className="APP-product-list-title">{productTitleShort(product.name)}</h1>

                                <div className="APP-product-second-row">
                                    <span className="APP-product-list-star">
                                        <ion-icon name="star"></ion-icon>
                                    </span>
                                    <h1 className="APP-product-list-rating">{product.rating}</h1>

                                    <h1 className="APP-product-list-price">{product.price.toFixed(2)} zł</h1>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default AnimalProposedProducts;
