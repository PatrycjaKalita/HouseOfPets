import React from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";

import {isAuth} from "../../../auth/Helpers";
import './Style.css'

const OrderDetails = (props) => {
    const logIn = isAuth().role
    const options = 2;

    return (
        <div className="main-OD-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="OD-container">
                <h1 className={logIn === "klient" ? "OD-title" : "hidden"}>Zamówienie z dnia: 00.00.0000r.</h1>
                <h1 className={logIn === "pracownik" ? "OD-title" : "hidden"}>Zamówienie nr 4839hqfg98w4r z dnia:
                    00.00.0000r.</h1>

                <div className="">
                    <h1 className="OD-title-part">Informacje:</h1>
                    <div className="OD-info-container">
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Wartość koszyka:</h1>
                            <h1 className="OD-info-value">350.99 zł</h1>
                        </div>
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Koszt dostawy:</h1>
                            <h1 className="OD-info-value">0 zł</h1>
                        </div>
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Koszt płatności:</h1>
                            <h1 className="OD-info-value">0 zł</h1>
                        </div>
                        <div className="OD-info-last-row">
                            <h1 className="OD-info-title">Łączny koszt:</h1>
                            <h1 className="OD-order-cost">350.99 zł</h1>
                        </div>
                    </div>

                    <h1 className="OD-title-part">Produkty:</h1>
                    <div>
                        <div>
                            <img alt="focia"/>

                            <div>
                                <h1>Nazwa produktu z zamówienia</h1>
                                <h1>waga/kolor</h1>
                            </div>

                            <h1>Ilość:</h1>
                            <h1>5</h1>

                            <h1>89.90 zł</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
