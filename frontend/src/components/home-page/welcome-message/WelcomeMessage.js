import React from 'react';

import "./Style.css"
import backgroundDog from '../../../assets/dog-bg-transparent.png';
import backgroundCat from '../../../assets/cat-bg-transparent.png';

const WelcomeMessage = () => {
    return (
        <div className="container-wm">
            <div className="container-text">
                <h1 className="top-text-wm">Znajdź swoje</h1>
                <h1 className="second-text-wm">idealne zwierzątko</h1>

                <p className="block-of-text-wm">
                    Nasze zwierzaki czekają na Ciebie.<br/>
                    Działamy na terenie całej Polski.<br/>
                    Jeśli zwierzak ma do Ciebie trafić <br/> to ogarniemy to.
                    Wyślij nam ankietę. <br/>Zwierzątka czekają na adopcję.
                </p>

                <button className="adoption-btn">
                    ADOPTUJ
                </button>
            </div>

            <div className="container-img-cat">
                <img alt="Background cat" src={backgroundCat} className="cat-image"/>
            </div>

            <div className="container-img">
                <img alt="Background dog" src={backgroundDog} className="dog-image"/>
            </div>
        </div>
    );
};

export default WelcomeMessage;
