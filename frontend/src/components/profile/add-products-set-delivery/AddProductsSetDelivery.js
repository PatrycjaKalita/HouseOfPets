import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {CircularProgress} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getCookie, signOut} from "../../../auth/Helpers";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useStyles} from "../adding-product/MUIStyle";

const AddProductsSetDelivery = (props) => {
    let id = window.location.href.replace('http://localhost:3000/profil/pracownik/zestawy-produktow/dostawa/', '')
    useEffect(() => {
        loadProductsSet();
    }, []);
    const token = getCookie('token');
    const history = useHistory()

    const [availableProductsSet, setAvailableProductsSet] = useState(false);
    const loadProductsSet = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-set-update?products_set_id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsSet(response.data.availableProductsSet);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    const [values, setValues] = useState({
        quantity: '',
    })

    let {
        quantity
    } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
        quantity = event.target.value
    }

    const classes = useStyles()

    const clickSubmitDelivery = event => {
        event.preventDefault()
        setValues({...values})

        let amountFromDB = availableProductsSet.productsSet[0].amount
        let amount = Number(quantity) + amountFromDB

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/products-set-delivery`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                amount,
            }
        }).then(response => {
            history.push('/profil/pracownik/zestawy-produktow')
        }).catch(error => {
            console.log("Product promotion update error")
        })
    }
    return (
        <div className="w-4/5 mt-50 mb-100 mx-auto flex">
            <ProfileNavigation choose={props.choose}/>

            <div className="w-4/5">
                <h1 className="mb-35 mt-100 text-2xl font-semibold text-center">Czy chcesz dodać dostawę produktu?</h1>

                {
                    availableProductsSet.hasOwnProperty('productsSet') === false ?
                        <div className="circular-progress-container">
                            <CircularProgress color="inherit"/>
                        </div>
                        :
                        availableProductsSet.productsSet.map((set) => {
                            return <>
                                <div className="flex mb-35 mx-auto justify-center">
                                    <img
                                        className="EA-image-upload"
                                        src={set.image}
                                        alt="uploaded-img"
                                    />

                                    <div className="">
                                        <h1 className="font-medium">{set.name}</h1>

                                        <div className="flex">
                                            <h1 className="font-medium">Ilość:</h1>
                                            <h1 className="ml-3">{set.amount}</h1>
                                        </div>

                                        <div className="flex">
                                            <h1 className="font-medium">Cena:</h1>
                                            <h1 className="ml-3">{set.price}</h1>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex mx-auto w-full">
                                    <div className="mx-auto flex">
                                        <TextField
                                            label="Ilość produktu w dostawie "
                                            variant="outlined"
                                            value={quantity}
                                            onChange={handleChange('quantity')}
                                            className={classes.textFieldExtraInfo}
                                        />
                                        <button className="delivery-element-btn" onClick={clickSubmitDelivery}>Dodaj
                                            dostawę
                                        </button>
                                    </div>
                                </div>
                            </>
                        })
                }
            </div>
        </div>
    );
};

export default AddProductsSetDelivery;
