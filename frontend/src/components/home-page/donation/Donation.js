import React from 'react';

import './Style.css'
import cat from '../../../assets/donation/cat.png';
import dog from '../../../assets/donation/dog.png';
import bird from '../../../assets/donation/bird.png';
import rabbit from '../../../assets/donation/rabbit.png';
import turtle from '../../../assets/donation/turtle.png';

const Donation = () => {
    return (
        <div className="mb-32 justify-center flex main-container">
            <div className="container">
                <h1 className="top-text">Chcesz nam pomóc?</h1>

                <div className="flex donation-container">
                <div className="left-container">
                    <span className="description-text">Wpłać dowolną darowiznę:</span>
                    <h1 className="number-text">93 3888 3099 3322 0001 9320 0029</h1>
                    <span className="description-text">Tytułem: Darowizna - House of pets</span>
                </div>

                <div className="right-container">
                    <span className="description-text">lub przy użyciu PayPal: informacja@hosueofpets.pl</span>
                    <div className="img-container">
                        <img alt="cat" src={cat} className="animal-img mr-5"/>
                        <img alt="dog" src={dog} className="animal-img mr-5"/>
                        <img alt="bird" src={bird} className="animal-img mr-5"/>
                        <img alt="rabbit" src={rabbit} className="animal-img mr-5"/>
                        <img alt="turtle" src={turtle} className="animal-img mr-5"/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
