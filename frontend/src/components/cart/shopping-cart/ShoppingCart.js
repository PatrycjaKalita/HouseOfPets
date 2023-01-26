import React, {useState} from 'react';
import './Style.css'
import {updatePriceInCart} from '../../../utils/product'

const ShoppingCart = (props) => {
    const [quantity, setQuantity] = useState(props.productAmount);

    const name = props.productName
    const price = props.productPrice
    const image = props.productImage
    const color = props.productColor
    const weight = props.productWeight

    return (
        <div className="sc-product-container">
            <img src={image} alt="produkcik" className="sc-product-img"/>

            <div className="sc-product-title-container">
                <h1 className="OD-product-name">{name}</h1>
                <h1 className={color === "" ? "hidden" : "OD-product-detail"}>{color}</h1>
                <h1 className={weight === null ? "hidden" : "OD-product-detail"}>{weight} g</h1>
            </div>

            <h1 className="sc-product-amount">Ilość:</h1>
            <div className="sc-btn-quantity">
                <button className="sc-btn-minus"
                        onClick={() => {
                            setQuantity(quantity - 1);
                        }}>
                    -
                </button>

                <h1 className="sc-btn-quantity-number">{quantity}</h1>

                <button className="sc-btn-plus" onClick={() => {
                    setQuantity(quantity + 1);
                }}>
                    +
                </button>
            </div>

            <div className="sc-product-price-container">
                <h1 className="sc-product-price">{updatePriceInCart(price, quantity)}</h1>
            </div>

            <span className="sc-delete-btn">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
        </div>
    );
};

export default ShoppingCart;
