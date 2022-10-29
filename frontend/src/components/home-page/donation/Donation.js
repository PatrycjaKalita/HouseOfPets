import React from 'react';

import './Style.css'
import cat from '../../../assets/donation/cat.png';
import dog from '../../../assets/donation/dog.png';
import bird from '../../../assets/donation/bird.png';
import rabbit from '../../../assets/donation/rabbit.png';
import turtle from '../../../assets/donation/turtle.png';

const Donation = () => {
    return (
        <div className="main-container">
            <div className="container">
                <h1 className="top-text-donation">Chcesz nam pomóc?</h1>

                <div className="donation-container">
                    <div className="left-container">
                        <span className="description-text">Wpłać dowolną darowiznę:</span>
                        <h1 className="number-text">93 3888 3099 3322 0001 9320 0029</h1>
                        <span className="description-text">Tytułem: Darowizna - House of pets</span>
                    </div>

                    <div className="right-container">
                        <span className="description-text">lub przy użyciu PayPal: informacja@hosueofpets.pl</span>
                     <div className="img-container mt-2">
                            <img alt="cat" src={cat} className="animal-img"/>
                            <img alt="dog" src={dog} className="animal-img"/>
                            <img alt="bird" src={bird} className="animal-img"/>
                            <img alt="rabbit" src={rabbit} className="animal-img"/>
                            <img alt="turtle" src={turtle} className="animal-img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
