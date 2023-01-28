import React, {useEffect, useState} from 'react';
import './Style.css'
import ShoppingCart from "./shopping-cart/ShoppingCart";
import {Link, useHistory} from "react-router-dom";
import {getCookie, isAuth, signOut} from "../../auth/Helpers";
import axios from "axios";
import dpd from "../../assets/deliveryMethod/dpd.png";
import inpost from "../../assets/deliveryMethod/inpost.png";
import osobisty from "../../assets/deliveryMethod/osobisty.png";
import payPal from "../../assets/paymentMethod/payPal.png";
import przyOdbiorze from "../../assets/paymentMethod/przyOdbiorze.png";
import tradycyjny from "../../assets/paymentMethod/tradycyjny.png";
import ShoppingCartSets from "./shopping-cart-sets/ShoppingCartSets";
import {toast} from "react-toastify";

const Cart = () => {
    useEffect(() => {
        loadUserCart();
    }, []);

    /*DOSTAWA*/
    const [delivery1, setDelivery1] = useState('radio-button-off-outline');
    const [delivery2, setDelivery2] = useState('radio-button-off-outline');
    const [delivery3, setDelivery3] = useState('radio-button-off-outline');

    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(0);

    function onClickHandlerDelivery(number, newDeliveryCost, newDeliveryMethod) {
        setDelivery1('radio-button-off-outline');
        setDelivery2('radio-button-off-outline');
        setDelivery3('radio-button-off-outline');
        number('radio-button-on-outline');
        setDeliveryCost(newDeliveryCost);
        setDeliveryMethod(newDeliveryMethod);
    }

    /*PŁATNOŚĆ*/
    const [payment1, setPayment1] = useState('radio-button-off-outline');
    const [payment2, setPayment2] = useState('radio-button-off-outline');
    const [payment3, setPayment3] = useState('radio-button-off-outline');

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentCost, setPaymentCost] = useState(0);

    function onClickHandlerPayment(number, newPaymentCost, newPaymentMethod) {
        setPayment1('radio-button-off-outline');
        setPayment2('radio-button-off-outline');
        setPayment3('radio-button-off-outline');
        number('radio-button-on-outline');
        setPaymentCost(newPaymentCost);
        setPaymentMethod(newPaymentMethod);
    }

    const token = getCookie('token');
    const history = useHistory()

    const [availableItemsInCart, setAvailableItemsInCart] = useState(false);
    const [numberOfProduct, setNumberOfProduct] = useState(0);
    const [costOfCart, setCostOfCart] = useState(0);

    const loadUserCart = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/get-cart/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                /*console.log('CART ', response.data);*/
                setAvailableItemsInCart(response.data.availableItemsInCart)

                /* Ilość elementów w koszyku*/
                setNumberOfProduct(response.data.availableItemsInCart.products.length + response.data.availableItemsInCart.sets.length);

                setCostOfCart(response.data.availableItemsInCart.products.reduce((accumulator, product) => accumulator + (product.price * product.amount), 0)
                    + response.data.availableItemsInCart.sets.reduce((accumulator, set) => accumulator + (set.price * set.amount), 0))

            })
            .catch(error => {
                console.log('CART ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    });
                }
            });
    };

    let totalCost
    function totalCostOfOrder(cart, delivery, payment) {
        totalCost = delivery + payment + cart
        return totalCost.toFixed(2)
    }
    let status = "Zamówiono"

    /* użytkownik */
    let user = localStorage.getItem("user")
    user = JSON.parse(user)

    /* produkty */
    let cartProducts = localStorage.getItem("cartProducts")
    let products = JSON.parse(cartProducts);

    /* produkty */
    let cartSets = localStorage.getItem("cartSets")
    let sets = JSON.parse(cartSets);

    const clickSubmit = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/user/make-order`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                totalCost,
                status,
                deliveryMethod,
                deliveryCost,
                paymentMethod,
                paymentCost,
                user,
                products,
                sets,
            }
        }).then(response => {
            let orderID = response.data.message._id
            history.push(`/zamowienie/${orderID}`)
        }).catch(error => {
            toast.error(error.response.data.error)
        })

        removeProductsFromCart()

    }
    const removeProductsFromCart = () => {
        let cartProducts = []
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

        let cartSets = []
        localStorage.setItem("cartSets", JSON.stringify(cartSets))

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
    return (
        <div className="main-cart-container">
            <div className="cart-top-part">
                <div>
                    <div className="sc-title-container">
                        <h1 className="sc-title">Koszyk</h1>
                        <h1 className="sc-number-of-products">({numberOfProduct})</h1>
                    </div>

                    <div className="sc-column-container">
                        {
                            availableItemsInCart.hasOwnProperty('products') === false ?
                                <div></div>
                                :
                                availableItemsInCart.products.map((product) => {
                                    return <ShoppingCart productName={product.name} productPrice={product.price}
                                                         productImage={product.image} productAmount={product.amount}
                                                         productColor={product.color} productWeight={product.weight}
                                                         productId={product._id}/>
                                })
                        }

                        {
                            availableItemsInCart.hasOwnProperty('sets') === false ?
                                <div></div>
                                :
                                availableItemsInCart.sets.map((set) => {
                                    return <ShoppingCartSets setName={set.name} setPrice={set.price}
                                                             setImage={set.image} setAmount={set.amount}
                                                             setId={set._id}/>
                                })
                        }
                    </div>
                </div>

                <div className="cart-summary-container">
                    <h1 className="cart-summary-title">Podsumowanie</h1>

                    <div className="cart-summary">
                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Wartość koszyka:</h1>
                            <h1 className="cs-info-value">{costOfCart.toFixed(2)} zł</h1>
                        </div>

                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Koszt dostawy:</h1>
                            <h1 className="cs-info-value">{deliveryCost.toFixed(2)} zł</h1>
                        </div>

                        <div className="cs-info-row">
                            <h1 className="cs-info-title">Koszt płatności:</h1>
                            <h1 className="cs-info-value">{paymentCost.toFixed(2)} zł</h1>
                        </div>

                        <div className="cs-info-last-row">
                            <h1 className="cs-info-title">Łączny koszt:</h1>
                            <h1 className="cs-order-cost">{totalCostOfOrder(costOfCart, deliveryCost, paymentCost)} zł</h1>
                        </div>
                    </div>

                    <div className="cart-summary-btn-container">
                        {/* <Link to="/zamowienie">*/}
                        <button className="cart-summary-btn" onClick={clickSubmit}>ZAMÓW</button>
                        {/* </Link>*/}
                    </div>
                </div>
            </div>

            <div className="main-dm-container">
                <h1 className="dm-title">Dostawa</h1>

                <div className="dm-column-container">
                    <div className="dm-container">
                            <span
                                className={delivery1 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerDelivery(setDelivery1, 15, 'Kurier - DPD')}>
                                <ion-icon name={delivery1}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="dpd" src={dpd} className="dm-image"/>
                            <h1 className="dm-name">Kurier - DPD</h1>
                            <h1 className="dm-price">15 zł</h1>
                        </div>
                    </div>

                    <div className="dm-container">
                            <span
                                className={delivery2 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerDelivery(setDelivery2, 10, 'Paczkomaty INPOST')}>
                                <ion-icon name={delivery2}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="inpost" src={inpost} className="dm-image"/>
                            <h1 className="dm-name">Paczkomaty INPOST</h1>
                            <h1 className="dm-price">10 zł</h1>
                        </div>
                    </div>

                    <div className="dm-container">
                            <span
                                className={delivery3 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerDelivery(setDelivery3, 0, 'Odbiór osobisty')}>
                                <ion-icon name={delivery3}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="osobisty" src={osobisty} className="dm-image"/>
                            <h1 className="dm-name">Odbiór osobisty</h1>
                            <h1 className="dm-price">0 zł</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-dm-container">
                <h1 className="dm-title">Płatność</h1>

                <div className="dm-column-container">
                    <div className="dm-container">
                            <span
                                className={payment1 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerPayment(setPayment1, 0, 'Płatności online (PayPal)')}>
                                <ion-icon name={payment1}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="payPal" src={payPal} className="dm-image"/>
                            <h1 className="dm-name">Płatności online<br/>(PayPal)</h1>
                            <h1 className="dm-price">0 zł</h1>
                        </div>
                    </div>

                    <div className="dm-container">
                            <span
                                className={payment2 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerPayment(setPayment2, 10, 'Płatność przy odbiorze')}>
                                <ion-icon name={payment2}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="przyOdbiorze" src={przyOdbiorze} className="dm-image"/>
                            <h1 className="dm-name">Płatność przy odbiorze</h1>
                            <h1 className="dm-price">10 zł</h1>
                        </div>
                    </div>

                    <div className="dm-container">
                            <span
                                className={payment3 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"}
                                onClick={() => onClickHandlerPayment(setPayment3, 0, 'Przelew tradycyjny')}>
                                <ion-icon name={payment3}></ion-icon>
                            </span>
                        <div className="dm-detail-container">
                            <img alt="tradycyjny" src={tradycyjny} className="dm-image"/>
                            <h1 className="dm-name">Przelew tradycyjny</h1>
                            <h1 className="dm-price">0 zł</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
