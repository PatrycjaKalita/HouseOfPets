import React from 'react';

import "./Style.css"
import wmImage from "../../../assets/main-page.png"

const WelcomeMessage = () => {
    return (
        <div className="container-wm">
            <div className="container-text">
                <h1 className="top-text-wm">Witaj w House of pets!</h1>
                <h1 className="second-text-wm">Znajdź z nami swoje idealne zwierzątko</h1>

                <p className="block-of-text-wm">
                    Bardzo się cieszymy, że jesteś tutaj z nami! Nasze zwierzątka
                    czekają na Ciebie.
                    Działamy na terenie całej Polski. Jeśli zwierzak ma do Ciebie
                    trafić to ograniemy to.
                </p>
            </div>

            <div>
                <img alt="wm" className="image-wm" src={wmImage}/>
            </div>
        </div>
    );
};

export default WelcomeMessage;
