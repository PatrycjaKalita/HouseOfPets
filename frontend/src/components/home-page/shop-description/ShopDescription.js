import React from 'react';

import './Style.css'
import shopCat from "../../../assets/shop-cat.jpg"
import {Link} from "react-router-dom";

const ShopDescription = () => {
    return (
        <div className="main-shop-description-container">
            <div className="shop-description-container">
                <img alt="pets" src={shopCat} className="shop-description-img"/>

                <blockquote className="shop-description-blockquote">
                    <h1 className="shop-description-top-text">Internetowy sklep</h1>
                    <h1 className="shop-description-second-text">zoologiczny "House of pets"</h1>

                    <p className="shop-description-block-of-text">
                        Nieważne czy to pies, kot, świnka morska, papuga, czy żółw
                        – jedno jest pewne: potrzeby naszych pupili to <b>PODSTAWA </b>
                        ich codziennej pielęgnacji. Odkryj ponad 9,000 akcesoriów
                        oraz karm w naszym sklepie zoologicznym online.
                    </p>

                    <Link to="/promocje">
                        <button className="shop-description-button">ZRÓB ZAKUPY</button>
                    </Link>
                </blockquote>
            </div>
        </div>
    );
};

export default ShopDescription;
