import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Pagination} from "@mui/material";
import {getCookie, isAuth, signOut} from "../../../auth/Helpers";
import '../Style.css'
import axios from "axios";

const ClientProfile = () => {
    const history = useHistory()
    const token = getCookie('token');

    useEffect(() => {
        loadClientOrdersList();
    }, []);

    const [ordersList, setOrdersList] = useState(false);
    const loadClientOrdersList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/view-orders-list/${isAuth().email}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setOrdersList(response.data.availableOrdersList)
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

    let [page, setPage] = useState(1);
    const LIMIT_FOR_PAGE = 5;

    const [noOfPages, setNoOfPages] = React.useState(
        Math.ceil(ordersList.length / LIMIT_FOR_PAGE)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setNoOfPages(Math.ceil(ordersList.length / LIMIT_FOR_PAGE));
        // eslint-disable-next-line
    }, [ordersList])

    const clickSubmit = (orderID) => {
        history.push(`/profil/zamowienie/${orderID}`)
    }

    return (
        <>
            <h1 className="profile-title">Wszystkie zamówienia</h1>

            <div className="">
                {
                    ordersList.hasOwnProperty('orders') === false ?
                        <div className="non-client-orders">Brak zamówień</div>
                        :
                        ordersList.orders.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((order) => {
                            return<div className="order-container">
                                {order.products.map((product) => {
                                    return (<img src={product.image} alt="product" className="order-image"/>);
                                })}

                                <div className="order-details-client">
                                    <h1 className="order-data">Data zamówienia: {order.createdAt.slice(0,10)} r.</h1>

                                    <div className="client-order-details">
                                        <h1 className="c-o-price">{order.totalCost.toFixed(2)} zł</h1>

                                        <button className="link-to-order-details" onClick={() => clickSubmit(order._id)}>Szczegóły zamówienia</button>
                                    </div>

                                </div>
                            </div>
                        })}

                <Pagination count={noOfPages} page={page} onChange={handleChange}
                            disabled={noOfPages === 0 || noOfPages === 1}
                            defaultPage={1} siblingCount={1}
                            variant="outlined" shape="rounded" className="float-right"/>
            </div>
        </>
    );
};

export default ClientProfile;
