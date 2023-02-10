import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {getCookie, signOut} from "../../../auth/Helpers";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useStyles} from "../adding-product/MUIStyle";
import {CircularProgress} from "@mui/material";

const AddProductDelivery = (props) => {
    let id = window.location.href.replace('http://localhost:3000/profil/pracownik/produkty/dostawa/', '')
    useEffect(() => {
        loadProduct();
    }, []);

    const [availableProduct, setAvailableProduct] = useState(false);
    const loadProduct = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-edit?product_id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProduct(response.data.availableProduct);
            })
            .catch(error => {
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
    const token = getCookie('token');
    const history = useHistory()
    const classes = useStyles()

    const clickSubmitDelivery = event => {
        event.preventDefault()
        setValues({...values})

        let amountFromDB = availableProduct.productDetails[0].amount
        let amount = Number(quantity) + amountFromDB

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/product-delivery`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                amount,
            }
        }).then(response => {
            history.push('/profil/pracownik/produkty')
        }).catch(error => {
            setValues({...values})
            console.log("Product promotion update error")
        })
    }
    return (
        <div className="w-4/5 mt-50 mb-100 mx-auto flex">
            <ProfileNavigation choose={props.choose}/>

            <div className="w-4/5">
                <h1 className="mb-35 mt-100 text-2xl font-semibold text-center">Czy chcesz dodać dostawę produktu?</h1>

                {
                    availableProduct.hasOwnProperty('productDetails') === false ?
                        <div className="circular-progress-container">
                            <CircularProgress color="inherit"/>
                        </div>
                        :
                        availableProduct.productDetails.map((product) => {
                            return <>
                                <div className="flex mb-35 mx-auto justify-center">
                                    <img
                                        className="EA-image-upload"
                                        src={product.image}
                                        alt="uploaded-img"
                                    />

                                    <div className="">
                                        <h1 className="font-medium">{product.name}</h1>
                                        <h1 className="">{product.producer}</h1>

                                        <div className="flex">
                                            <h1 className="font-medium">Ilość:</h1>
                                            <h1 className="ml-3">{product.amount}</h1>
                                        </div>

                                        <div className="flex">
                                            <h1 className="font-medium">Cena:</h1>
                                            <h1 className="ml-3">{product.price}</h1>
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

export default AddProductDelivery;
