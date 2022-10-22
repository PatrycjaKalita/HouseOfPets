import React from 'react';
import FooterColumn from "./FooterColumn";

import './Style.css';
import {CustomerService, Help, HouseOfPets} from "./data.js";
import Paw from '../../assets/paw.png';
import Payments from '../../assets/payments.png';

const Footer = () => {
    return (
        <div className="footer-main-container">
            <div className="xl:flex footer-container">
                <div className="grid grid-cols-1 mr-28">
                    <img src={Paw} alt="logo" className="h-24"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:px-20 py-16">
                    <FooterColumn links={CustomerService} title="Obsługa klienta"/>
                    <FooterColumn links={Help} title="Pomoc"/>
                    <FooterColumn links={HouseOfPets} title="House of pets"/>
                </div>
                <div className="grid grid-cols-1 ml-28 mb-28">
                    <img src={Payments} alt="payments" className="w-32"/>
                </div>
            </div>
            <div
                className="flex bg-white w-full justify-center font-light text-black text-xs py-3">
                <span className="w-4/12 flex justify-start">House of pets Copyright © 2022 - 2023</span>
                <span className="w-5/12 flex pl-16 justify-end">Korzystanie z serwisu oznacza akceptację regulaminu.</span>
            </div>
        </div>
    );
};

export default Footer;
