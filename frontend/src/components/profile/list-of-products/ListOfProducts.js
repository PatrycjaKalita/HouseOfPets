import React from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link} from "react-router-dom";

import './Style.css'
import More from "../more/More";
import imageProduct from "../../../assets/royalCanin.jpg";
import {countPromotion, productTitleShort} from '../../../utils/product'


const ListOfProducts = (props) => {
    const productPrice = 112.89;
    const productPromotion = true;

    return (<div className="main-LOP-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOP-container">
                <div className="LOP-top-part">
                    <div>
                        <h1 className="LOP-title">Wszystkie produkty</h1>
                    </div>


                    <div className="LOP-top-part-icons">
                        <Link to="/profil/pracownik/produkty/dodanie-nowego-produktu">
                            <span className="LOP-option-icon">
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                        </Link>

                        <span className="LOP-option-icon">
                            <ion-icon name="funnel-outline"></ion-icon>
                        </span>
                    </div>
                </div>

                <div className="LOP-list-container">
                    <div className="LOP-one-part-container">
                        <More options={3}/>

                        <img alt="animal" className="LOP-animal-image" src={imageProduct}/>
                        <h1 className="LOP-name">{productTitleShort('Royal Canin Hair ball')}</h1>

                        <div className="LOP-product-info">
                            <div className="product-list-rating-container">
                                <span className="LOP-list-star">
                                    <ion-icon name="star"></ion-icon>
                                </span>
                                <h1 className="LOP-list-rating">4.2</h1>
                            </div>

                            <div className="LOP-list-container-price">
                                <h1 className={productPromotion === true ? "LOP-list-price-promotion" : "hidden"}>{countPromotion(productPromotion,productPrice)}</h1>
                                <h1 className={productPromotion === false ? "LOP-list-price" : "hidden"}>{productPrice.toFixed(2)} zł</h1>
                            </div>

                            <div className={productPromotion === true ? "LOP-list-container-price-old" : "hidden"}>
                                <h1 className="LOP-list-price-old">112.89 zł</h1>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>);
};

export default ListOfProducts;
