import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Rating} from "@mui/material";

import './Style.css';
import {productReviews} from '../product/productData';
import {updatePrice, checkNumberOfOpinions, promotion} from '../../utils/product'
import ProductReviews from "../product/product-reviews/ProductReviews";
import {getCookie, isAuth, signOut} from "../../auth/Helpers";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {useStyles} from "../profile/adding-product/MUIStyle";
import InputAdornment from "@mui/material/InputAdornment";
import {toast} from "react-toastify";
import ProductsSetLink from "./products-set-link/ProductsSetLink";
import ProductsInSet from "./products-in-set/ProductsInSet";

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const token = getCookie('token');
    const history = useHistory()
    const classes = useStyles()
    let totalRatings = 0;
    productReviews.forEach(({numberOfStars}) => totalRatings += numberOfStars);
    let averageRating = totalRatings / productReviews.length;
    averageRating = averageRating.toFixed(1);

    useEffect(() => {
        loadProductsSet();
    }, []);

    const [availableProductsSet, setAvailableProductsSet] = useState(false);
    const loadProductsSet = () => {
        let newLink = window.location.href.replace('http://localhost:3000', '')
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-set?products_set_link=${newLink}`,
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
        sale: '',
    })

    let {
        sale
    } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
        sale = event.target.value
    }

    const clickSubmitSale = event => {
        let id = availableProductsSet.productsSet[0]._id
        event.preventDefault()
        setValues({...values})

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/product-sale`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                sale,
            }
        }).then(response => {
            console.log('UPDATE SUCCESS', sale);
            setValues({
                ...values,
                sale: '',
            })
        }).catch(error => {
            setValues({...values})
            toast.error(error.response.data.error)
        })
    }

    return (
        <>
            {
                availableProductsSet.hasOwnProperty('productsSet') === false ?
                    <h1>Loading..</h1>
                    :
                    availableProductsSet.productsSet.map((set) => {
                            return <>
                                <div className="main-product-container">
                                    <ProductsSetLink/>

                                    <div className="main-details-container">
                                        <div className="product-img-container">
                                            <img className="product-img" alt="" src={set.image}/>
                                        </div>

                                        <div className="product-vertical-line"></div>

                                        <div className="product-main-details-container">
                                            <h1 className="product-name">{set.name}</h1>

                                            <div className="product-rating-container">
                                                <Rating className="starBorderOutlined" value={averageRating} readOnly
                                                        precision={0.5} max={5} size="small"/>

                                                <h1 className="product-number-opinions">{checkNumberOfOpinions(5)}</h1>
                                            </div>

                                            <div className="product-code-container">
                                                <h1 className="product-variable-name">Kod zestawu:</h1>
                                                <h1 className="product-variable-value">{set.set_code}</h1>
                                            </div>

                                            <div className="product-delivery-container">
                                                <h1 className="product-variable-name">Dostawa:</h1>
                                                <h1 className="product-variable-value">1 dzień roboczy</h1>
                                            </div>

                                            <div className="product-quantity-price-container">
                                                <div className="product-quantity-container">
                                                    <h1 className="product-quantity-name">Ilość:</h1>
                                                    <div className="product-btn-quantity">
                                                        <button className="product-btn-minus"
                                                                onClick={() => {
                                                                    setQuantity(quantity - 1);
                                                                }}>
                                                            -
                                                        </button>

                                                        <h1 className="product-btn-quantity-number">{quantity}</h1>

                                                        <button className="product-btn-plus" onClick={() => {
                                                            setQuantity(quantity + 1);
                                                        }}>
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <h1 className={set.sale === 0 ? "product-main-price" : "hidden"}>{updatePrice(set.price, quantity)}</h1>

                                                <div className={set.sale !== 0 ? "flex" : "hidden"}>
                                                    <h1 className="product-base-price">{updatePrice(set.price, quantity)}</h1>

                                                    <h1 className="product-sale-price">{updatePrice(promotion(set.price, set.sale), quantity)}</h1>
                                                </div>
                                            </div>

                                            <div
                                                className={isAuth().role !== "pracownik" ? "product-btn-add-container" : "hidden"}>
                                                <button className="product-btn-add-to-card">Dodaj do koszyka</button>
                                            </div>

                                            <div
                                                className={isAuth().role === "pracownik" ? "product-btn-add-container" : "hidden"}>
                                                <TextField
                                                    label="Zniżka o"
                                                    variant="outlined"
                                                    value={sale}
                                                    onChange={handleChange('sale')}
                                                    className={classes.textFieldCareTaker}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                                    }}
                                                />

                                                <button className="product-btn-add-to-card" onClick={clickSubmitSale}>Dodaj
                                                    promocję
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="PS-main-container">
                                    <h1 className="PS-title">Lista produktów w zestawie</h1>
                                    <p className="PS-description">Poniższa lista produktów może zostać z edytowana. Jeśli
                                        dany produkt ma inne
                                        warianty wagowe lub kolorystyczne to może on zostać zmieniony. Należy kliknąć przy
                                        takim produkcie
                                        przycisk “Zmień”. Wyświetlą się inne warianty, które można wybrać.
                                        <br/>Zestaw jest tańszy o 10%, niż gdyby każdy produkt z listy został oddzielnie
                                        dodany do koszyka.
                                        Zachęcamy do zakupu.</p>

                                    {
                                        set.products.map((product) => {
                                                return <ProductsInSet productLink={product.link} productImage={product.image} productName={product.name} productWeight={product.weight}
                                                productColor={product.color} productPrice={product.price}/>
                                            }
                                        )

                                    }
                                </div>
                            </>
                        }
                    )
            }
            {/*<ProductReviews averageRating={averageRating}/>*/}
        </>
    );
};

export default Product;
