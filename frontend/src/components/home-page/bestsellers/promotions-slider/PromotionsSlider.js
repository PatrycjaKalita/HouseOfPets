import React, {useState} from 'react';

import './Style.css';
import dataSlider from "./data";

const PromotionsSlider = () => {
    const [slideIndex, setSlideIndex] = useState(1);

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="main-slider-promotion-container">
            <div className="slider-promotion-container">
                {dataSlider.map((obj, index) => {
                    return (
                        <div
                            key={obj.id}
                            className={slideIndex === index + 1 ? "opacity-100 " : "promotion-container"}
                        >
                            <img
                                className="promotion-image"
                                alt={obj.title}
                                src={process.env.PUBLIC_URL + `/assets/img/img${index + 1}.png`}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="xl:flex slider-paw-container">
                {Array.from({length: 3}).map((item, index) => (
                    <span key={index} className={slideIndex === index + 1 ? "paw-first" : "paw-second"}>
                        <ion-icon onClick={() => moveDot(index + 1)}
                                  name={slideIndex === index + 1 ? "paw" : "paw-outline"}
                        ></ion-icon>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PromotionsSlider;
