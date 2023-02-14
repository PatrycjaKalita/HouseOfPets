import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getCookie, signOut} from "../../../../auth/Helpers";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const EditProductSetDetails = (props) => {
    const id = props.setID
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
    return (
        <>
            {
                availableProductsSet.hasOwnProperty('productsSet') === false ?
                    <div className="circular-progress-container">
                        <CircularProgress color="inherit"/>
                    </div>
                    :
                    availableProductsSet.productsSet.map((set) => {
                        return <div className="mb-35">
                            <div className="flex mb-5">
                                <img
                                    className="EA-image-upload"
                                    src={set.image}
                                    alt="uploaded-img"
                                />

                                <div className="grid grid-cols-2 ml-5">
                                    <h1 className="text-right font-medium">Nazwa:</h1>
                                    <h1 className="ml-3">{set.name}</h1>

                                    <h1 className="text-right font-medium">Ilość:</h1>
                                    <h1 className="ml-3">{set.amount}</h1>

                                    <h1 className="text-right font-medium">Cena:</h1>
                                    <h1 className="ml-3">{set.price}</h1>

                                </div>
                            </div>
                            <h1 className="font-medium mb-15">Lista produktów</h1>
                            {
                                set.products.map((product) => {
                                        return <div>
                                            <div className="flex mb-5">
                                                <img
                                                    className="EA-image-upload"
                                                    src={product.image}
                                                    alt="uploaded-img"
                                                />
                                                <div className="mt-5">
                                                    <h1 className="ml-3">{product.name}</h1>

                                                    <div className="flex">
                                                        <h1 className="ml-3 font-medium">Cena:</h1>
                                                        <h1 className="ml-3">{product.price}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                )
                            }
                        </div>
                    })
            }
        </>
    );
};

export default EditProductSetDetails;
