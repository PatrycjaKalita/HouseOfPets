import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Rating} from "@mui/material";

import './Style.css';
import {productReviews} from './productData';
import {updatePrice, checkNumberOfOpinions, checkProductAvailability, promotion} from '../../utils/product'
import ProductNavigation from "./product-navigation/ProductNavigation";
import ProductDescription from "./product-description/ProductDescription";
import ProductComposition from "./product-composition/ProductComposition";
import ProductDosage from "./product-dosage/ProductDosage";
import ProductReviews from "./product-reviews/ProductReviews";
import ProductLink from "./product-link/ProductLink";
import ProductAnalyticalIngredients from "./product-analytical-ingredients/ProductAnalyticalIngredients";
import {getCookie, isAuth, signOut} from "../../auth/Helpers";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {useStyles} from "../profile/adding-product/MUIStyle";
import InputAdornment from "@mui/material/InputAdornment";
import {toast} from "react-toastify";

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    let {productCategory} = useParams();

    const token = getCookie('token');
    const history = useHistory()
    const classes = useStyles()

    let totalRatings = 0;
    productReviews.forEach(({numberOfStars}) => totalRatings += numberOfStars);

    let averageRating = totalRatings / productReviews.length;
    averageRating = averageRating.toFixed(1);

    useEffect(() => {
        loadProduct();
    }, []);

    const [availableProduct, setAvailableProduct] = useState(false);
    const loadProduct = () => {
        let newLink = window.location.href.replace('http://localhost:3000', '')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products?product_link=${newLink}`,
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

    const addProductToCart = (productToCart) => {
        let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

        /*console.log(productToCart._id)
        console.log(cartProducts)*/

        const item = cartProducts?.find(product => {
            console.log(product.product_id)
            console.log(productToCart._id)
            return product.product_id === productToCart._id
        })
        //console.log(item) /*undefined*/

        if (item) {
            item.amount++
        } else {
            cartProducts.push({product_id: productToCart._id, 'amount': 1})
            console.log(cartProducts)
        }

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

        const cartSets = JSON.parse(localStorage.getItem("cartSets")) || [];

        const cart = {
            products: cartProducts,
            sets: cartSets
        }

        sendUserCart(cart)
    }

    const sendUserCart = (cart) => {
        axios({
            method: 'PATCH',
            url: `${process.env.REACT_APP_API}/user/update-cart`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                cart
            }
        })
            .then(response => {
                console.log(response.data)
                localStorage.setItem("user", JSON.stringify(response.data))
            })
            .catch(error => {
                console.log('Blad koszyk (update) ', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    const clickSubmitSale = event => {

    }

    return (
        <>
            {
                availableProduct.hasOwnProperty('productDetails') === false ?
                    <h1>Loading..</h1>
                    :
                    availableProduct.productDetails.map((product) => {
                            return <>
                                <div className="main-product-container">
                                    <ProductLink/>

                                    <div className="main-details-container">
                                        <div className="product-img-container">
                                            <img className="product-img" alt="" src={product.image}/>
                                        </div>

                                        <div className="product-vertical-line"></div>

                                        <div className="product-main-details-container">
                                            <h1 className="product-name">{product.name}</h1>

                                            <div className="product-rating-container">
                                                <Rating className="starBorderOutlined" value={averageRating} readOnly
                                                        precision={0.5} max={5} size="small"/>

                                                <h1 className="product-number-opinions">{checkNumberOfOpinions(5)}</h1>

                                                <h1 className={product.amount > 0 ? "product-availability" : "product-no-availability"}>{checkProductAvailability(product.amount)}</h1>
                                            </div>

                                            <div
                                                className={"product-producer-container"}>
                                                <h1 className="product-producer-name">Producent:</h1>
                                                <h1 className="product-producer-value">{product.producer}</h1>
                                            </div>

                                            <div className="product-code-container">
                                                <h1 className="product-variable-name">Kod produktu:</h1>
                                                <h1 className="product-variable-value">{product.product_code}</h1>
                                            </div>

                                            <div className="product-delivery-container">
                                                <h1 className="product-variable-name">Dostawa:</h1>
                                                <h1 className="product-variable-value">1 dzień roboczy</h1>
                                            </div>

                                            <div
                                                className={product.weight === null ? "hidden" : "product-weights-container"}>
                                                <h1 className="product-weight-name">Waga:</h1>
                                                <h1 className="product-variable-value"> {product.weight} g</h1>
                                            </div>

                                            <div
                                                className={product.color === "" ? "hidden" : "product-weights-container"}>
                                                <h1 className="product-weight-name">Kolor:</h1>
                                                <h1 className="product-variable-value"> {product.color}</h1>
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

                                                <h1 className={product.sale === 0 ? "product-main-price" : "hidden"}>{updatePrice(product.price, quantity)}</h1>

                                                <div className={product.sale !== 0 ? "flex" : "hidden"}>
                                                    <h1 className="product-base-price">{updatePrice(product.price, quantity)}</h1>

                                                    <h1 className="product-sale-price">{updatePrice(promotion(product.price, product.sale), quantity)}</h1>
                                                </div>
                                            </div>

                                            <div
                                                className={isAuth().role !== "pracownik" ? "product-btn-add-container" : "hidden"}>
                                                <button className="product-btn-add-to-card" onClick={() => addProductToCart(product)}>Dodaj do koszyka</button>
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
                                <ProductNavigation body_weight={product.body_weight}/>

                                <ProductDescription productDescription={product.description}
                                                    productExtraDescription={product.extra_description}
                                                    productDescriptionImage={product.image_description}/>

                                <ProductComposition productComposition={product.composition}
                                                    productAdditives={product.additives}/>

                                <div id="Sklad"
                                     className={product.protein !== null ? "product-composition-main-container" : "hidden"}>
                                    <ProductAnalyticalIngredients protein={product.protein} fat={product.fat}
                                                                  ash={product.ash} fiber={product.fiber}/>
                                </div>

                                <div className={product.body_weight !== null ? "" : "hidden"}>
                                    <ProductDosage body_weight={product.body_weight} low_needs={product.low_needs}
                                                   moderate_needs={product.moderate_needs}/>
                                </div>
                            </>
                        }
                    )
            }
            <ProductReviews averageRating={averageRating}/>
        </>
    );
};

export default Product;
