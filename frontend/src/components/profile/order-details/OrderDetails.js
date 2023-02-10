import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";

import {getCookie, isAuth, signOut} from "../../../auth/Helpers";
import './Style.css'
import {useStyles} from "../adding-product/MUIStyle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

const OrderDetails = (props) => {
    const logIn = isAuth().role
    const classes = useStyles()
    const history = useHistory()
    const token = getCookie('token');

    const {id} = useParams()

    useEffect(() => {
        loadClientOrder();
    }, []);

    const [orderDetails, setOrderDetails] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [productsList, setProductsList] = useState([]);

    const loadClientOrder = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/view-order/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                /*console.log(response.data)*/
                setOrderDetails(response.data.availableOrder.order)
                setCustomerData(response.data.availableOrder.order.user)
                setProductsList(response.data.availableOrder.order.products)
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

    function costOfCart(totalCost, deliveryCost, paymentCost) {
        let price = totalCost - (deliveryCost - paymentCost)
        let fixedPrice = price.toFixed(2)
        return fixedPrice
    }

    function makeDate(date) {
        let shorterDate = date?.slice(0, 10)
        return shorterDate
    }


    const handleChange = (status, id) => {
        console.log(status, id)

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/order-status`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                status,
            }
        }).then(response => {
            console.log(response.data)

        }).catch(error => {
            console.log("Order status update - error ", error)
        })
    }


    return (
        <div className="main-OD-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="OD-container">
                <h1 className={logIn === "klient" ? "OD-title" : "hidden"}>Zamówienie z
                    dnia: {makeDate(orderDetails.createdAt)}r.</h1>
                <h1 className={logIn === "pracownik" ? "OD-title" : "hidden"}>Zamówienie nr {orderDetails._id} z dnia:
                    {makeDate(orderDetails.createdAt)}r.</h1>

                <div className={logIn === "pracownik" ? "" : "hidden"}>
                    <h1 className="OD-title-part">Dane klienta:</h1>

                    <div className="OD-order-data-container">
                        <div className="OD-order-data-column1">
                            <h1 className="OD-order-data-title">Imię:</h1>
                            <h1 className="OD-order-data-title">Nazwisko:</h1>
                            <h1 className="OD-order-data-title">Numer telefonu:</h1>
                            <h1 className="OD-order-data-title">Mail:</h1>
                        </div>

                        <div className="OD-order-data-column2">
                            <h1 className="OD-order-data-value">{customerData.name}</h1>
                            <h1 className="OD-order-data-value">{customerData.lastname}</h1>
                            <h1 className="OD-order-data-value">{customerData.phone_number}</h1>
                            <h1 className="OD-order-data-value">{customerData.email}</h1>
                        </div>

                        <FormControl>
                            <InputLabel className={classes.inputLabelStyle}>Status</InputLabel>
                            <Select
                                className={classes.selectStylesCategories}
                                IconComponent={ExpandMoreRoundedIcon}
                                value={orderDetails?.status || ""}
                                label="Status"
                                onChange={(e) => handleChange(e.target.value, orderDetails._id)}
                            >
                                    <MenuItem value="Zamówiono">Zamówiono</MenuItem>
                                <MenuItem value="Zapłacono">Zapłacono</MenuItem>
                                <MenuItem value="Wysłane">Wysłane</MenuItem>
                                <MenuItem value="Zakończone">Zakończone</MenuItem>
                                <MenuItem value="Anulowane">Anulowane</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={logIn === "pracownik" ? "" : "hidden"}>
                    <h1 className="OD-title-part">Dane zamówienia:</h1>
                    <div className="OD-order-data-container">
                        <div className="OD-order-data-column1">
                            <h1 className="OD-order-data-title">Metoda dostawy:</h1>
                            <h1 className="OD-order-data-title">Adres dostawy:</h1>
                            <h1 className="OD-order-data-title">Metoda płatności:</h1>
                        </div>
                        <div className="">
                            <h1 className="OD-order-data-value">{orderDetails.deliveryMethod}</h1>
                            <h1 className="OD-order-data-value">{customerData.street_and_number}, {customerData.postcode_and_city}</h1>
                            <h1 className="OD-order-data-value">{orderDetails.paymentMethod}</h1>
                        </div>
                    </div>
                </div>

                <div className={logIn === "klient" ? "mb-35 flex" : "hidden"}>
                    <h1 className="OD-title-part">Status: </h1>
                    <h1 className="text-black text-lg font-medium ml-3 mt-px">{orderDetails.status}</h1>

                </div>


                <div className="">
                    <h1 className={logIn === "klient" ? "OD-title-part" : "hidden"}>Informacje:</h1>
                    <h1 className={logIn === "pracownik" ? "OD-title-part" : "hidden"}>Podsumowanie koszyka:</h1>
                    <div className="OD-info-container">
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Wartość koszyka:</h1>
                            <h1 className="OD-info-value">{costOfCart(orderDetails.totalCost, orderDetails.deliveryCost, orderDetails.paymentCost)} zł</h1>
                        </div>
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Koszt dostawy:</h1>
                            <h1 className="OD-info-value">{orderDetails.deliveryCost}.00 zł</h1>
                        </div>
                        <div className="OD-info-row">
                            <h1 className="OD-info-title">Koszt płatności:</h1>
                            <h1 className="OD-info-value">{orderDetails.paymentCost}.00 zł</h1>
                        </div>
                        <div className="OD-info-last-row">
                            <h1 className="OD-info-title">Łączny koszt:</h1>
                            <h1 className="OD-order-cost">{orderDetails.totalCost} zł</h1>
                        </div>
                    </div>

                    <h1 className="OD-title-part">Produkty:</h1>
                    {
                        productsList.length === 0 ?
                            <div className="non-client-orders">Brak zamówień</div>
                            :
                            productsList.map((product) => {
                                return <div>
                                    <div className="OD-product-container">
                                        <img src={product.image} alt="focia" className="OD-product-img"/>

                                        <div className="OD-product-details-container">
                                            <h1 className="OD-product-name">{product.name}</h1>
                                            <h1 className={product.color === "" ? "hidden" : "OD-product-detail"}>{product.color}</h1>
                                            <h1 className={product.weight === null ? "hidden" : "OD-product-detail"}>{product.weight} g</h1>
                                        </div>


                                        <h1 className="OD-product-amount">Ilość:</h1>
                                        <h1 className="OD-product-amount-value">{product.amount}</h1>


                                        <div className="OD-product-price-container">
                                            <h1 className="OD-product-price">{product.price.toFixed(2)} zł</h1>
                                        </div>

                                    </div>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
