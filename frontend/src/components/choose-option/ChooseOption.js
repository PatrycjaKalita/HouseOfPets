import React from 'react';
import {Link} from "react-router-dom";

import './Style.css';
import shop from '../../assets/choose-option/shop.png';
import {animals} from './chooseOptionData'

const ChooseOption = () => {
    return (
        <div className="main-choose-option-container">
            <h1 className="choose-option-title">Wybrano: <b>Koty</b></h1>
            <h1 className="choose-option-question">Co poszukujesz?</h1>

            <div className="choose-option-container">
                <Link to="" className="choose-option-adoption">
                    <img src={shop} alt="Adoption cat" className="choose-option-img"/>

                    <h1 className="choose-option-btn-adoption">ADOPCJE</h1>
                </Link>

                <Link to="/shop-form/koty" className="choose-option-shop">
                    <img src={shop} alt="Shop" className="choose-option-img"/>

                    <h1 className="choose-option-btn-shop">SKLEP</h1>
                </Link>
            </div>
        </div>

    );
};

export default ChooseOption;
