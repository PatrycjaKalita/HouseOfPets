import React, {useState} from 'react';
import './Style.css'
import {updatePriceInCart} from '../../../utils/product'
import axios from "axios";
import {getCookie, signOut} from "../../../auth/Helpers";
import {useHistory} from "react-router-dom";

const ShoppingCart = (props) => {
    const [amount, setAmount] = useState(props.productAmount);

    const name = props.productName
    const price = props.productPrice
    const image = props.productImage
    const color = props.productColor
    const weight = props.productWeight
    const productId = props.productId

    function changeAmountOfProduct(id, newAmount){
        setAmount(newAmount)
        let cartProducts = localStorage.getItem("cartProducts")
        cartProducts = JSON.parse(cartProducts);

        cartProducts = cartProducts.map(function (item) {
            if(item.product_id === id){
                item.amount = newAmount
            }
            return item
        })

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        const cartSets = JSON.parse(localStorage.getItem("cartSets")) || [];

        const cart = {
            products: cartProducts,
            sets: cartSets
        }

        sendUserCart(cart)
    }

    function removeProductFromCart(id){
        let cartProducts = localStorage.getItem("cartProducts")
        cartProducts = JSON.parse(cartProducts);

        cartProducts = cartProducts.filter(function (item) {
            return item.product_id !== id
        })

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        const cartSets = JSON.parse(localStorage.getItem("cartSets")) || [];

        const cart = {
            products: cartProducts,
            sets: cartSets
        }

        sendUserCart(cart)
    }

    const token = getCookie('token');
    const history = useHistory()

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

    return (
        <div className="sc-product-container">
            <img src={image} alt="produkcik" className="sc-product-img"/>

            <div className="sc-product-title-container">
                <h1 className="sc-product-name">{name}</h1>
                <h1 className={color === "" ? "hidden" : "sc-product-detail"}>{color}</h1>
                <h1 className={weight === null ? "hidden" : "sc-product-detail"}>{weight} g</h1>
            </div>

            <h1 className="sc-product-amount">Ilość:</h1>
            <div className="sc-btn-quantity">
                <button className="sc-btn-minus"
                        onClick={() => {
                            changeAmountOfProduct(productId,amount - 1);
                        }}>
                    -
                </button>

                <h1 className="sc-btn-quantity-number">{amount}</h1>

                <button className="sc-btn-plus" onClick={() => {
                    changeAmountOfProduct(productId,amount + 1);
                }}>
                    +
                </button>
            </div>

            <div className="sc-product-price-container">
                <h1 className="sc-product-price">{updatePriceInCart(price, amount)}</h1>
            </div>

            <span className="sc-delete-btn" onClick={() => {
                removeProductFromCart(productId)
            }}>
                <ion-icon name="trash-outline"></ion-icon>
            </span>
        </div>
    );
};

export default ShoppingCart;
