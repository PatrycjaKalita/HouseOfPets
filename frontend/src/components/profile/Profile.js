import React, {useState, useEffect} from 'react';
import './Style.css';
import ProfileNavigation from "./profile-navigation/ProfileNavigation";
import {useHistory} from "react-router-dom";
import More from "./more/More";
import {Pagination} from "@mui/material";
import {getCookie, isAuth, signOut} from "../../auth/Helpers";
import ClientProfile from "./client-profile/ClientProfile";
import axios from "axios";

const Profile = (props) => {
    const logIn = isAuth().role
    const options = 2;
    const history = useHistory()
    const token = getCookie('token');

    useEffect(() => {
        loadOrdersList();
    }, []);

    const [clientsOrdersList, setClientsOrdersList] = useState([]);
    const loadOrdersList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/employee/view-orders-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.availableOrdersList.ordersList)
                setClientsOrdersList(response.data.availableOrdersList.ordersList)
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
        Math.ceil(clientsOrdersList.length / LIMIT_FOR_PAGE)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setNoOfPages(Math.ceil(clientsOrdersList.length / LIMIT_FOR_PAGE));
        //setPage(1);
        // eslint-disable-next-line
    }, [clientsOrdersList])

    return (
        <div className="main-profile-container">
            <ProfileNavigation choose={props.choose}/>

            <div className={logIn === "klient" ? "profile-container" : "hidden"}>
                <ClientProfile/>
            </div>

            <div className={logIn === "pracownik" ? "profile-container" : "hidden"}>
                <h1 className="profile-title">Wszystkie zamówienia</h1>

                <div className="">
                    {
                        clientsOrdersList.length === 0 ?
                            <div className="non-client-orders">Brak zamówień</div>
                            :
                            clientsOrdersList.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((order) => {
                                return <div className="order-container">
                                    {order.products.map((product) => {
                                        return (<img src={product.image} alt="product" className="order-image"/>);
                                    })}
                                    {order.sets.map((set) => {
                                        return (<img src={set.image} alt="product" className="order-image"/>);
                                    })}
                                    <div className="order-details-employee">
                                        <h1 className="order-data">Data zamówienia: {order.createdAt.slice(0,10)} r.</h1>

                                        <div className="employee-order-details">
                                            <More options={options} orderID={order._id}/>

                                            <h1 className="e-o-status">{order.status}</h1>
                                            <h1 className="e-o-price">{order.totalCost.toFixed(2)} zł</h1>
                                            <h1 className="e-o-client">{order.user.name} {order.user.lastname}</h1>
                                        </div>
                                    </div>
                                </div>
                            })
                    }

                    <Pagination count={noOfPages} page={page} onChange={handleChange}
                                disabled={noOfPages === 0 || noOfPages === 1}
                                defaultPage={1} siblingCount={1}
                                variant="outlined" shape="rounded" className="float-right"/>
                </div>
            </div>
        </div>
    )
}


export default Profile;
