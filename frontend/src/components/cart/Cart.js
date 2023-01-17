import React from 'react';
import './Style.css'
import ShoppingCart from "./shopping-cart/ShoppingCart";
import DeliveryMethod from "./delivery-method/DeliveryMethod";
import PaymentMethod from "./payment-method/PaymentMethod";
import {Link} from "react-router-dom";

const Cart = () => {
    return (
        <div className="main-cart-container">
            <div className="cart-top-part">
                <ShoppingCart/>

                <div className="cart-summary-container">
                    <h1 className="cart-summary-title">Podsumowanie</h1>

                    <div className="cart-summary">
                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Wartość koszyka:</h1>
                            <h1 className="cs-info-value">350.99 zł</h1>
                        </div>

                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Koszt dostawy:</h1>
                            <h1 className="cs-info-value">0 zł</h1>
                        </div>

                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Koszt płatności:</h1>
                            <h1 className="cs-info-value">0 zł</h1>
                        </div>

                        <div className="cs-info-last-row">
                            <h1 className="cs-info-title">Łączny koszt:</h1>
                            <h1 className="cs-order-cost">350.99 zł</h1>
                        </div>
                    </div>

                    <div className="cart-summary-btn-container">
                        <Link to="/zamowienie">
                            <button className="cart-summary-btn">ZAMÓW</button>
                        </Link>
                    </div>
                </div>
            </div>

            <DeliveryMethod/>
            <PaymentMethod/>
        </div>
    );
};

export default Cart;
