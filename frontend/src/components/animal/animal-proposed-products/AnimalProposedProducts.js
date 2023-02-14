import React, {useEffect, useState} from 'react';
import './Style.css'
import {productTitleShort, promotion} from "../../../utils/product";
import {Link, useHistory} from "react-router-dom";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";

const AnimalProposedProducts = (props) => {
    const typeOfPetID = props.typeOfPet

    const token = getCookie('token');
    const history = useHistory()

    useEffect(() => {
        loadProductsSetForAnimal();
        loadProductsForAnimal();
    }, []);

    /*ZESTAW*/
    const [availableAnimalProductsSet, setAvailableProductsSet] = useState(false);
    const [priceOfSet, setPriceOfSet] = useState(0);
    const loadProductsSetForAnimal = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-set-for-animal?type_of_pet_id=${typeOfPetID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsSet(response.data.availableProductsSet.productsSet);
                setPriceOfSet(response.data.availableProductsSet.productsSet.price)
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

    /*3 PRODUKTY */
    const [availableAnimalProducts, setAvailableProducts] = useState(false);
    const loadProductsForAnimal = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-for-animal?type_of_pet_id=${typeOfPetID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProducts(response.data.availableProducts)
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
        <div>
            <h1 className="animal-description-title">Proponowane produkty i zestawy</h1>
            <p className="animal-pp-description">Poniżej znajdują się produkty i zestawy, które zostały wybrane dla tego
                zwierzątka. Pomogą Ci one w codziennej pielęgnacji go. Jeśli to Twoje pierwsze zwierzątko mamy również w
                naszej ofercie zestaw “STARTER PACK”, który ma wszystko co potrzebujesz na start. </p>

            <div className="APP-product-list-container">

                <Link to={availableAnimalProductsSet.link}>
                    <div className={availableAnimalProductsSet._id === undefined ? "hidden" : "APP-product-container"}>
                        <img alt="" src={availableAnimalProductsSet.image} className="APP-product-list-img"/>
                        <h1 className="APP-product-list-title">{availableAnimalProductsSet.name}</h1>

                        <div className="APP-product-second-row">
                            <span className="APP-product-list-star">
                                <ion-icon name="star"></ion-icon>
                            </span>
                            <h1 className="APP-product-list-rating">0</h1>

                            <h1 className={availableAnimalProductsSet.sale === 0 ? "APP-product-list-price" : "hidden"}>{priceOfSet.toFixed(2)} zł</h1>

                            <h1 className={availableAnimalProductsSet.sale !== 0 ? "APP-price-old" : "hidden"}>{priceOfSet.toFixed(2)} zł</h1>
                            <h1 className={availableAnimalProductsSet.sale !== 0 ? "product-list-price-promotion" : "hidden"}>{promotion(priceOfSet, availableAnimalProductsSet.sale)} zł</h1>
                        </div>
                    </div>
                </Link>

                {
                    availableAnimalProducts.hasOwnProperty('products') === false ?
                        <div className="circular-progress-container">
                            <h1 className="font-light text-lg ">Brak proponowanych produktów</h1>
                        </div>
                        :
                        availableAnimalProducts.products.map((product) => {
                            return <>
                                <Link to={product.link}>
                                    <div className="APP-product-container">
                                        <img alt={product.name} src={product.image} className="APP-product-list-img"/>
                                        <h1 className="APP-product-list-title">{productTitleShort(product.name)}</h1>

                                        <div className="APP-product-second-row">
                                            <span className="APP-product-list-star">
                                                <ion-icon name="star"></ion-icon>
                                            </span>
                                            <h1 className="APP-product-list-rating">0</h1>

                                            <h1 className={product.sale === 0 ? "APP-product-list-price" : "hidden"}>{product.price.toFixed(2)} zł</h1>

                                            <h1 className={product.sale !== 0 ? "APP-price-old" : "hidden"}>{product.price.toFixed(2)} zł</h1>
                                            <h1 className={product.sale !== 0 ? "product-list-price-promotion" : "hidden"}>{promotion(product.price, product.sale)} zł</h1>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        })
                }
            </div>
        </div>
    );
};

export default AnimalProposedProducts;
