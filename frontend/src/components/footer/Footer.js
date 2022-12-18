import React from 'react';
import FooterColumn from "./FooterColumn";

import './Style.css';
import {CustomerService, Help, HouseOfPets} from "./data.js";
import Paw from '../../assets/paw.png';
import Payments from '../../assets/payments.png';

const Footer = () => {
    return (
        <div className="footer-main-container">
            <div className="footer-container">
                <div className="footer-logo-container">
                    <img src={Paw} alt="logo" className="footer-logo-container-img"/>
                </div>

                <div className="footer-columns-container">
                    <FooterColumn links={CustomerService} title="Obsługa klienta"/>
                    <FooterColumn links={Help} title="Pomoc"/>
                    <FooterColumn links={HouseOfPets} title="House of pets"/>
                </div>

                <div className="footer-paypal-container">
                    <img src={Payments} alt="payments" className="footer-paypal-container-img"/>
                </div>
            </div>

            <div className="page-bottom-container">
                <h1 className="footer-page-title">House of pets</h1>
                <span className="page-bottom-text-left">House of pets Copyright © 2022 - 2023</span>
                <br/>
                <span className="page-bottom-text-right">Korzystanie z serwisu oznacza akceptację regulaminu.</span>
            </div>
        </div>
    );
};

export default Footer;
