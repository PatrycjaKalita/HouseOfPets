import React, {useState, useEffect} from 'react';
import './Style.css';
import ProfileNavigation from "./profile-navigation/ProfileNavigation";
import {ordersData} from "./ordersData";
import {Link} from "react-router-dom";
import More from "./more/More";
import {Pagination} from "@mui/material";
import {isAuth} from "../../auth/Helpers";

const Profile = (props) => {
    const logIn = isAuth().role
    const options = 2;

    let [page, setPage] = useState(1);
    const LIMIT_FOR_PAGE = 5;

    const [noOfPages, setNoOfPages] = React.useState(
        Math.ceil(ordersData.length / LIMIT_FOR_PAGE)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };


    useEffect(() => {
        setNoOfPages(Math.ceil(ordersData.length / LIMIT_FOR_PAGE));
        //setPage(1);
        // eslint-disable-next-line
    }, [ordersData])

    return (
        <div className="main-profile-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="profile-container">
                <h1 className="profile-title">Wszystkie zamówienia</h1>

                <div className="">
                    {
                        ordersData.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((order, index) =>
                            <div key={index} className="order-container">
                                {order.images.map((image, index) => {
                                    return (<img key={index} src={image} alt="product" className="order-image"/>);
                                })}

                                <div className={logIn === "klient" ? "order-details-client" : "order-details-employee"}>
                                    <h1 className="order-data">Data zamówienia: {order.orderData} r.</h1>

                                    <div className={logIn === "klient" ? "client-order-details" : "hidden"}>
                                        <h1 className="c-o-price">{order.price} zł</h1>

                                        <Link to="/profil/zamowienie/id">
                                            <h1 className="link-to-order-details">Szczegóły zamówienia</h1>
                                        </Link>
                                    </div>

                                    <div className={logIn === "pracownik" ? "employee-order-details" : "hidden"}>
                                        <More options={options}/>

                                        <h1 className="e-o-status">{order.status}</h1>
                                        <h1 className="e-o-price">{order.price} zł</h1>
                                        <h1 className="e-o-client">{order.client}</h1>
                                    </div>
                                </div>
                            </div>
                        )}
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
