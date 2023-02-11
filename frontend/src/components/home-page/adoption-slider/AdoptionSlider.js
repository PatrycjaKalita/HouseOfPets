import React, {useEffect, useState} from 'react';
import './Style.css'
import {Link, useHistory} from "react-router-dom";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";
import {CircularProgress} from "@mui/material";

const AdoptionSlider = () => {
    const sliderClick = () => {
        return 0;
    }

    const slideLeft = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const history = useHistory()
    useEffect(() => {
        loadAnimalsList();
    }, []);
    const token = getCookie('token');

    const [availableAnimalsList, setAvailableAnimalsList] = useState(false);
    const loadAnimalsList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/animals-in-slider`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAnimalsList(response.data.availableAnimalsList);
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
        <div className="adoption-slider">
            <h1 className="slider-title">Zwierzęta do adopcji</h1>

            <div className="relative">
                <span className="slider-icon left">
                    <ion-icon name="chevron-back" onClick={slideRight}></ion-icon>
                </span>

                <div className="main-slider-container">
                    <div id="slider">
                        {
                            availableAnimalsList.hasOwnProperty('animal') === false ?
                                <div className="circular-progress-container">
                                    <CircularProgress color="inherit"/>
                                </div>
                                :
                                availableAnimalsList.animal.map((slide, index) => {
                                    return (
                                        <Link to={slide.link}>
                                            <div className="slider-card" key={index} onClick={() => sliderClick}>
                                                <div className="slider-card-image"
                                                     style={{
                                                         backgroundImage: `url(${slide.image})`,
                                                         backgroundSize: 'cover',
                                                         backgroundRepeat: 'no-repeat',
                                                         backgroundPosition: 'center'
                                                     }}></div>
                                                <p className="slider-pet-name">{slide.name}</p>
                                                <p className="slider-pet-breed">{slide.breeds[0].name}</p>
                                            </div>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                </div>

                <span className="slider-icon right">
                    <ion-icon name="chevron-forward" onClick={slideLeft}></ion-icon>
                </span>
            </div>
        </div>
    )
};

export default AdoptionSlider;
