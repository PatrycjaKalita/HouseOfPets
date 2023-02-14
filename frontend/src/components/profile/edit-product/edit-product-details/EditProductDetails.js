import React, {useEffect, useState} from 'react';
import {getCookie, signOut} from "../../../../auth/Helpers";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {CircularProgress} from "@mui/material";

const EditProductDetails = (props) => {
    let id = props.productId

    useEffect(() => {
        loadProduct();
    }, []);

    const token = getCookie('token');
    const history = useHistory()

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
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    function makeDate(date) {
        let shorterDate = date?.slice(0, 10)
        return shorterDate
    }

    return (
        <>
            {
                availableProduct.hasOwnProperty('productDetails') === false ?
                    <div className="circular-progress-container">
                        <CircularProgress color="inherit"/>
                    </div>
                    :
                    availableProduct.productDetails.map((product) => {
                        return <div className="mb-35">
                            <div className="flex mb-15">
                                <h1 className="font-medium">Nazwa:</h1>
                                <h1 className="ml-3">{product.name}</h1>
                            </div>
                            <div className="flex mb-5">
                                <img
                                    className="EA-image-upload"
                                    src={product.image}
                                    alt="uploaded-img"
                                />

                                <div className="grid grid-cols-4 ml-5">
                                    <h1 className="text-right font-medium">Producent:</h1>
                                    <h1 className="ml-3">{product.producer}</h1>

                                    <h1 className="text-right font-medium">Ilość:</h1>
                                    <h1 className="ml-3">{product.amount}</h1>

                                    <h1 className="text-right font-medium">Cena:</h1>
                                    <h1 className="ml-3">{product.price}</h1>

                                    <h1 className={product.expiration_date === null ? "hidden" : "text-right font-medium"}>Data
                                        ważności:</h1>
                                    <h1 className={product.expiration_date === null ? "hidden" : "ml-3"}>{makeDate(product.expiration_date)}</h1>

                                    <h1 className={product.color === "" ? "hidden" : "text-right font-medium"}>Color:</h1>
                                    <h1 className={product.color === "" ? "hidden" : "ml-3"}>{product.color}</h1>

                                    <h1 className={product.weight === null ? "hidden" : "text-right font-medium"}>Waga:</h1>
                                    <h1 className={product.weight === null ? "hidden" : "ml-3"}>{product.weight}</h1>
                                </div>
                            </div>

                            <h1 className="font-medium">Opis produktu:</h1>
                            <h1 className="mb-5">{product.description}</h1>

                            <h1 className={product.extra_description === "" ? "hidden" : "font-medium"}>Dodatkowy opis
                                produktu:</h1>
                            <h1 className={product.extra_description === "" ? "hidden" : "mb-5"}>{product.extra_description}</h1>

                            <h1 className={product.image_description === "" ? "hidden" : "font-medium"}>Zdjęcie
                                znajdujące się w opisie produktu:</h1>
                            <img
                                className={product.image_description === "" ? "hidden" : "EA-image-upload mb-5"}
                                src={product.image_description}
                                alt="uploaded-img"
                            />

                            <h1 className="font-medium">Skład produktu:</h1>
                            <h1 className="mb-5">{product.composition}</h1>

                            <h1 className={product.additives === "" ? "hidden" : "font-medium"}>Dodatki (na 1kg
                                karmy):</h1>
                            <h1 className={product.additives === "" ? "hidden" : "mb-5"}>{product.additives}</h1>

                            <h1 className={product.protein === null ? "hidden" : "font-medium"}>Składniki
                                analityczne:</h1>
                            <div className={product.protein === null ? "hidden" : "grid grid-cols-8 w-full mb-15"}>
                                <h1 className="font-medium">Białko surowe:</h1>
                                <h1 className="ml-3">{product.protein}</h1>

                                <h1 className="font-medium">Tłuszcz surowy:</h1>
                                <h1 className="ml-3">{product.fat}</h1>

                                <h1 className="font-medium">Popiół surowy:</h1>
                                <h1 className="ml-3 w-auto">{product.ash}</h1>

                                <h1 className="font-medium">Włókno surowe:</h1>
                                <h1 className="ml-3 w-auto">{product.fiber}</h1>
                            </div>

                            <h1 className={product.body_weight === null ? "hidden" : "font-medium"}>Dawkowanie
                                produktu:</h1>
                            <div className={product.body_weight === null ? "hidden" : "grid grid-cols-6 w-full mb-15"}>
                                <h1 className="font-medium">Masa ciała:</h1>
                                <h1 className="ml-3">{product.body_weight}</h1>

                                <h1 className="font-medium">Umiarkowane potrzeby:</h1>
                                <h1 className="ml-3">{product.moderate_needs}</h1>

                                <h1 className="font-medium">Niskie potrzeby:</h1>
                                <h1 className="ml-3 w-auto">{product.low_needs}</h1>
                            </div>
                        </div>
                    })
            }
        </>
    );
};

export default EditProductDetails;
