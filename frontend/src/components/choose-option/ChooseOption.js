import React from 'react';

import './Style.css';
import shopCat from '../../assets/choose-option/shop-cat.jpg';
import adoptionCat from '../../assets/choose-option/adoption-cat.jpg';

const ChooseOption = () => {
    return (
        <div className="choose-option-container">
            <div className="choose-option-adoption">
                <img src={adoptionCat} alt="Adoption cat" className="choose-option-img"/>
                    <div className="choose-option-container-btn-adoption">
                        <button className="choose-option-btn-adoption">ADOPTUJ</button>
                    </div>
            </div>

            <div className="choose-option-shop">
                <img src={shopCat} alt="Shop cat" className="choose-option-img"/>
                <div className="choose-option-container-btn-shop">
                    <button className="choose-option-btn-shop">ZRÓB ZAKUPY</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseOption;
