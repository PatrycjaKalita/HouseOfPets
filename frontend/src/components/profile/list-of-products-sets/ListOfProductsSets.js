import React from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link} from "react-router-dom";
import './Style.css'
import More from "../more/More";
import imageProduct from "../../../assets/royalCanin.jpg";
import {productTitleShort} from '../../../utils/product'

const ListOfProductSets = (props) => {
    const productPrice = 712.89;

    return (
        <div className="main-LOPS-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOPS-container">
                <div className="LOPS-top-part">
                    <div>
                        <h1 className="LOPS-title">Wszystkie zestawy produktów</h1>
                    </div>


                    <div className="LOPS-top-part-icons">
                        <Link to="/profil/pracownik/produkty/dodanie-nowego-zestawu">
                            <span className="LOPS-option-icon">
                                <ion-icon name="add-outline"></ion-icon>
                            </span>
                        </Link>

                        <span className="LOPS-option-icon">
                            <ion-icon name="funnel-outline"></ion-icon>
                        </span>
                    </div>
                </div>

                <div className="LOPS-list-container">
                    <div className="LOPS-one-part-container">
                        <More options={3}/>

                        <img alt="animal" className="LOPS-animal-image" src={imageProduct}/>
                        <h1 className="LOPS-name">{productTitleShort('Zestaw "Starter Pack"')}</h1>

                        <div className="LOPS-product-info">
                            <div className="product-list-rating-container">
                                <span className="LOPS-list-star">
                                    <ion-icon name="star"></ion-icon>
                                </span>
                                <h1 className="LOPS-list-rating">4.2</h1>
                            </div>

                            <div className="LOPS-list-container-price">
                                <h1 className="LOPS-list-price">{productPrice.toFixed(2)} zł</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfProductSets;
