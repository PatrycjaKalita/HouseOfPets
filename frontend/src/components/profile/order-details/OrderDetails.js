import React, {useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";

import {isAuth} from "../../../auth/Helpers";
import './Style.css'
import {useStyles} from "../adding-product/MUIStyle";
import imageProduct from '../../../assets/royalCanin.jpg'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";

const OrderDetails = (props) => {
    const logIn = isAuth().role
    const classes = useStyles()

    const [valueSelect, setValueSelect] = useState({
        status: '1',
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
    }

    return (
        <div className="main-OD-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="OD-container">
                <h1 className={logIn === "klient" ? "OD-title" : "hidden"}>Zamówienie z dnia: 00.00.0000r.</h1>
                <h1 className={logIn === "pracownik" ? "OD-title" : "hidden"}>Zamówienie nr 4839hqfg98w4r z dnia:
                    00.00.0000r.</h1>

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
                            <h1 className="OD-order-data-value">Patrycja</h1>
                            <h1 className="OD-order-data-value">Kalita</h1>
                            <h1 className="OD-order-data-value">505-848-090</h1>
                            <h1 className="OD-order-data-value">pati.kalita@gmail.com</h1>
                        </div>

                        <FormControl>
                            <InputLabel className={classes.inputLabelStyle}>Status</InputLabel>
                            <Select
                                className={classes.selectStylesCategories}
                                IconComponent={ExpandMoreRoundedIcon}
                                value={valueSelect.status}
                                label="Status"
                                name={"status"}
                                onChange={handleChange}
                            >
                                <MenuItem value="all">Płatność online</MenuItem>
                                <MenuItem value="1">Płatność offline</MenuItem>
                                <MenuItem value="2">Zapłacono</MenuItem>
                                <MenuItem value="3">Wysłane</MenuItem>
                                <MenuItem value="4">Zakończone</MenuItem>
                                <MenuItem value="5">Anulowane</MenuItem>
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
                            <h1 className="OD-order-data-value">Kurier DPD</h1>
                            <h1 className="OD-order-data-value">ul. Leśna 12, 20-000 Kielce</h1>
                            <h1 className="OD-order-data-value">Paypal</h1>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h1 className={logIn === "klient" ? "OD-title-part" : "hidden"}>Informacje:</h1>
                    <h1 className={logIn === "pracownik" ? "OD-title-part" : "hidden"}>Podsumowanie koszyka:</h1>
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
                        <div className="OD-product-container">
                            <img src={imageProduct} alt="focia" className="OD-product-img"/>

                            <div className="OD-product-details-container">
                                <h1 className="OD-product-name">Nazwa produktu z zamówienia</h1>
                                <h1 className="OD-product-detail">waga/kolor</h1>
                            </div>

                            <h1 className="OD-product-amount">Ilość:</h1>
                            <h1 className="OD-product-amount-value">5</h1>

                            <h1 className="OD-product-price">89.90 zł</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
