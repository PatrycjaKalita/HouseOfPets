import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {Link, useHistory} from "react-router-dom";
import './Style.css'
import More from "../more/More";
import {productTitleShort} from '../../../utils/product'
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";

const ListOfProductSets = (props) => {
    const token = getCookie('token');
    const history = useHistory()
    const rating = false;

    useEffect(() => {
        loadProductsList();
    }, []);

    const [availableProductsSetList, setAvailableProductsSetList] = useState(false);
    const loadProductsList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-set-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsSetList(response.data.availableProductsSetList);
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
                    {
                        availableProductsSetList.hasOwnProperty('productsSet') === false ?
                            <h1>Loading..</h1>
                            :
                            availableProductsSetList.productsSet.map((set) => {
                                return <div className="LOPS-one-part-container">
                                    <More options={3}/>

                                    <Link to={set.link}>
                                        <img alt="animal" className="LOPS-animal-image" src={set.image}/>
                                        <h1 className="LOPS-name">{productTitleShort(set.name)}</h1>

                                        <div className="LOPS-product-info">
                                            <div
                                                className={rating === false ? "product-list-rating-container" : 'hidden'}>
                                                    <span className="LOPS-list-star">
                                                        <ion-icon name="star"></ion-icon>
                                                    </span>
                                                <h1 className="LOPS-list-rating">4.2</h1>
                                            </div>

                                            <div className="LOPS-list-container-price">
                                                <h1 className="LOPS-list-price">{set.price.toFixed(2)} zł</h1>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default ListOfProductSets;
