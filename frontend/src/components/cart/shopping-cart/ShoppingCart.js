import React, {useState} from 'react';
import './Style.css'
import productImg from "../../../assets/addingProduct/royalCanin.jpg";
import {updatePrice} from '../../../utils/product'

const ShoppingCart = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <div className="sc-title-container">
                <h1 className="sc-title">Koszyk</h1>
                <h1 className="sc-number-of-products">(5)</h1>
            </div>

            <div>
                <div className="sc-product-container">
                    <img src={productImg} alt="produkcik" className="sc-product-img" />

                    <div className="sc-product-title-container">
                        <h1 className="OD-product-name">Tytuł wyświetlanego produktu</h1>
                        <h1 className="OD-product-detail">opis</h1>
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

                    <h1 className="sc-product-price">{updatePrice(100.99, quantity)}</h1>

                    <span className="sc-delete-btn">
                        <ion-icon name="trash-outline"></ion-icon>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
