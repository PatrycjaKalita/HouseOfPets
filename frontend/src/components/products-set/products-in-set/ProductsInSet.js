import React, {useState} from 'react';
import './Style.css'
import imageProduct from "../../../assets/addingProduct/royalCanin.jpg";
import {Link} from "react-router-dom";

const ProductsInSet = (props) => {
    const [showed, setShowed] = useState(false);
    const name = props.productName;
    const image = props.productImage;
    const link = props.productLink;
    const weight = props.productWeight;
    const color = props.productColor
    const price = props.productPrice;

    return (
        <div>
            <div className={showed ? "PS-product-container-open" : "PS-product-container"}>
                <img src={image} alt="focia" className="PS-product-img"/>

                <div className="PIS-product-details-container">
                    <Link to={link}>
                        <h1 className="PIS-product-name">{name}</h1>
                    </Link>
                    <div className="PS-change-link-container">
                        <h1 className={weight === null ? "OD-product-detail" : "hidden"}>{color}</h1>
                        <h1 className={weight === null ? "hidden" : "OD-product-detail"}>{weight} g</h1>
                        <h1 className="PS-product-change-link" onClick={() => setShowed(true)}>Zmień</h1>
                    </div>
                </div>

                <div className="PIS-product-amount-container">
                    <h1 className="PIS-product-amount">Ilość:</h1>
                    <h1 className="OD-product-amount-value">1</h1>
                </div>

                <div className="PIS-product-price-container">
                    <h1 className="PIS-product-price">{price.toFixed(2)} zł</h1>
                </div>
            </div>

            <div className={showed ? "PS-product-change-container" : "hidden"}>
                <div className="PS-changing-container">
                    <h1 className="PS-changing-title">Dostępne opcje:</h1>

                    <div className="PS-product-change">
                        <img alt="product" className="PS-product-change-img" src={imageProduct}/>

                        <h1 className="PS-product-detail">waga/kolor</h1>
                        <h1 className="PS-product-change-price">199.90 zł</h1>
                    </div>

                    <span className="PS-close-changing-container"
                          onClick={() => setShowed(false)}>
                                        <ion-icon name="close-outline"></ion-icon>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default ProductsInSet;
