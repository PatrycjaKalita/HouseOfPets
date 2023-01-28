import React, {useState} from 'react';
import '../shopping-cart/Style.css'
import {updatePriceInCart} from '../../../utils/product'
import axios from "axios";
import {getCookie, signOut} from "../../../auth/Helpers";
import {useHistory} from "react-router-dom";

const ShoppingCartSets = (props) => {
    const [amount, setAmount] = useState(props.setAmount);

    const name = props.setName
    const price = props.setPrice
    const image = props.setImage
    const setId = props.setId

    function changeAmountOfSet(id, newAmount){
        setAmount(newAmount)
        let cartSets = localStorage.getItem("cartSets")
        cartSets = JSON.parse(cartSets);

        cartSets = cartSets.map(function (item) {
            if(item.set_id === id){
                item.amount = newAmount
            }
            return item
        })

        localStorage.setItem("cartSets", JSON.stringify(cartSets))
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

        const cart = {
            products: cartProducts,
            sets: cartSets
        }

        sendUserCart(cart)
    }

    function removeSetFromCart(id){
        let cartSets = localStorage.getItem("cartSets")
        cartSets = JSON.parse(cartSets);

        cartSets = cartSets.filter(function (item) {
            return item.set_id !== id
        })

        localStorage.setItem("cartSets", JSON.stringify(cartSets))
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

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
                <h1 className="SCS-set-name">{name}</h1>
            </div>

            <h1 className="sc-product-amount">Ilość:</h1>
            <div className="sc-btn-quantity">
                <button className="sc-btn-minus"
                        onClick={() => {
                            changeAmountOfSet(setId,amount - 1);
                        }}>
                    -
                </button>

                <h1 className="sc-btn-quantity-number">{amount}</h1>

                <button className="sc-btn-plus" onClick={() => {
                    changeAmountOfSet(setId,amount + 1);
                }}>
                    +
                </button>
            </div>

            <div className="sc-product-price-container">
                <h1 className="sc-product-price">{updatePriceInCart(price, amount)}</h1>
            </div>

            <span className="sc-delete-btn" onClick={() => {
                removeSetFromCart(setId)
            }}>
                <ion-icon name="trash-outline"></ion-icon>
            </span>
        </div>
    );
};

export default ShoppingCartSets;
