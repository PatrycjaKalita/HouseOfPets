import React from 'react';

import './Style.css'
import image from '../../../assets/Logo.png';

const Donation = () => {
    return (
        <div className="">
            <div className="">
                <h1 className="">Chcesz nam pomóc?</h1>
                <div className="">
                    <span className="">Wpłać dowolną darowiznę:</span><br/>
                    <span className="">93 3888 3099 3322 0001 9320 0029</span><br/>
                    <span className="">Tytułem: Darowizna - House of pets</span>
                </div>
                <div className="">
                    <span className="">lub przy użyciu PayPal: informacja@hosueofpets.pl</span>
                    <div className="">
                        <img alt="cat" src={image} className=""/>
                        <img alt="dog" src={image} className=""/>
                        <img alt="bird" src={image} className=""/>
                        <img alt="rabbit" src={image} className=""/>
                        <img alt="turtle" src={image} className=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
