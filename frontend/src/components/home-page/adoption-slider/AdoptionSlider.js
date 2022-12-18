import React from 'react';
import './Style.css'

const AdoptionSlider = () => {
    const sliderClick = () => {
        return 0;
    }

    const slides = [
        {
            image: "https://cdn.pixabay.com/photo/2021/12/15/04/48/animal-6871771_1280.jpg",
            petName: "Bucks",
            breed: "domowy",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2022/09/06/07/49/cat-7436051_1280.jpg",
            petName: "Ryszard",
            breed: "syberyjski-domowy",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559__480.jpg",
            petName: "Azor",
            breed: "labrador retriver",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2017/02/01/09/48/jack-russell-2029214__480.jpg",
            petName: "Marcuś",
            breed: "russell retriver",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
            petName: "Kropka",
            breed: "domowy",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2014/04/05/11/40/dog-316598_1280.jpg",
            petName: "Max",
            breed: "kundel",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2014/08/06/16/52/terrapin-411853_1280.jpg",
            petName: "Kamyk",
            breed: "żółw piaskowy",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
            petName: "Missi",
            breed: "syberyjski-domowy",
            clickEvent: sliderClick
        },
        {
            image: "https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_1280.jpg",
            petName: "Mysza",
            breed: "domowy",
            clickEvent: sliderClick
        },
    ]

    const slideLeft = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

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
                            slides.map((slide, index) => {
                                return (
                                    <div className="slider-card" key={index} onClick={() => slide.clickEvent()}>
                                        <div className="slider-card-image"
                                             style={{
                                                 backgroundImage: `url(${slide.image})`,
                                                 backgroundSize: 'cover',
                                                 backgroundRepeat: 'no-repeat',
                                                 backgroundPosition: 'center'
                                             }}></div>
                                        <p className="slider-pet-name">{slide.petName}</p>
                                        <p className="slider-pet-breed">{slide.breed}</p>
                                    </div>
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
