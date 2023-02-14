import React, {useEffect, useState} from 'react';
import './Style.css'
import {Link, useHistory, useParams} from "react-router-dom";
import {getCookie, signOut} from "../../auth/Helpers";
import axios from "axios";

const OrderSummary = () => {
    const {id} = useParams()
    const history = useHistory()
    const token = getCookie('token');

    useEffect(() => {
        loadNewOrder();
    }, []);

    const [orderDetails, setOrderDetails] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [totalCostOfOrder, setTotalCostOfOrder] = useState(0);
    const loadNewOrder = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/view-new-order/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setOrderDetails(response.data.availableNewOrder.order)
                setCustomerData(response.data.availableNewOrder.order.user)
                setTotalCostOfOrder(response.data.availableNewOrder.order.totalCost)
            })
            .catch(error => {
                console.log('ORDER ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    });
                }
            });
    };

    return (
        <div className="os-main-container">
            <h1 className="os-title">Podsumowanie zamówienia</h1>
            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Imię i nazwisko:</h1>
                    <h1 className="os-info-value">{customerData.name} {customerData.lastname}</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Numer telefonu:</h1>
                    <h1 className="os-info-value">{customerData.phone_number}</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Mail:</h1>
                    <h1 className="os-info-value">{customerData.email}</h1>
                </div>
            </div>

            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Sposób dostawy:</h1>
                    <h1 className="os-info-value">{orderDetails.deliveryMethod}</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Adres dostawy:</h1>
                    <h1 className="os-info-value">{customerData.street_and_number}, {customerData.postcode_and_city}</h1>
                </div>
            </div>

            <div className="os-container">
                <div className="os-info-row">
                    <h1 className="os-info-title">Sposób płatności:</h1>
                    <h1 className="os-info-value">{orderDetails.paymentMethod}</h1>
                </div>
                <div className="os-info-row">
                    <h1 className="os-info-title">Kwota do zapłaty:</h1>
                    <h1 className="os-info-value">{totalCostOfOrder.toFixed(2)} zł</h1>
                </div>
            </div>

            <p className="os-description">Podsumowanie zamówienia zostało wysłane na powyższy adres mailowy. Szczegóły
                tego zamówienia można podejrzeć również w profilu użytkownika (zakładka “Historia
                zamówień”). W razie problemów prosimy o niezwłoczny kontakt z nami.</p>
        </div>

    );
};

export default OrderSummary;
