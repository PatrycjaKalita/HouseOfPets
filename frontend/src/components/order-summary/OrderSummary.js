import React from 'react';
import './Style.css'
const OrderSummary = () => {
    return (
        <div className="os-main-container">
            <h1 className="os-title">Podsumowanie zamówienia</h1>

            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Imię i nazwisko:</h1>
                    <h1 className="os-info-value">Patrycja Kalita</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Numer telefonu:</h1>
                    <h1 className="os-info-value">989090987</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Mail:</h1>
                    <h1 className="os-info-value">pati@gmail.com</h1>
                </div>
            </div>

            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Sposób dostawy:</h1>
                    <h1 className="os-info-value">Kurier - DPD</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Adres dostawy:</h1>
                    <h1 className="os-info-value">ul. Długa 2, 20-000 Kielce</h1>
                </div>
            </div>

            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Sposób płatności:</h1>
                    <h1 className="os-info-value">Płatności online (PayPal)</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Kwota do zapłaty:</h1>
                    <h1 className="os-info-value">230.99 zł</h1>
                </div>
            </div>

            <p className="os-description">Podsumowanie zamówienia zostało wysłane na powyższy adres mailowy. Szczegóły tego zamówienia można podejrzeć również w profilu użytkownika (zakładka “Historia
                zamówień”). W razie problemów prosimy o niezwłoczny kontakt z nami.</p>

            <div className="os-btn-container">
                <button className="os-btn">Zapłać</button>
            </div>
        </div>
    );
};

export default OrderSummary;
