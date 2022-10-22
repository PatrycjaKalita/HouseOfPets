import React from 'react';

import './Style.css'

const PointsAboutShop = () => {

    const points = [
        {
            icon: 'place.png',
            title: "Wyjątkowe miejsce",
            description: "U nas znajdziesz wszystko, co niezbędne do prawidłowej opieki nad Twoim pupilem."
        },
        {
            icon: "medal.png",
            title: "Najwyższa jakość",
            description: "Nasze produkty są najwyższej jakości. Pomogą Ci w zaspokojeniu wszystkich indywidualnych potrzeb Twojego zwierzaka."
        },
        {
            icon: "best-price.png",
            title: "Konkurencyjne ceny",
            description: "Tym co nas wyróżnia, są nasze ceny. Konkurencyjne ceny  najlepszych marek weterynaryjnych oraz wysokiej jakości karmy i akcesoriów dla Twojego pupila."
        },
        {
            icon: "clock.png",
            title: "Oszczędność czasu",
            description: "Nasz sklep internetowy to przede wszystkim wygoda i oszczędność czasu. Za pomocą kilku kliknięć możesz zamówić wszystko, czego potrzebuje Twój zwierzak."
        },
        {
            icon: "cat-carrier.png",
            title: "Podróż to nie problem",
            description: "Dzięki dostępnym w naszym sklepie akcesoriom turystycznym, Twoja podróż z Twoim pupilem nie będzie wyzwaniem."
        },
        {
            icon: "door-to-door.png",
            title: "Do Twoich drzwi",
            description: "Oferujemy szeroki wybór produktów dla Twojego zwierzaka, a to wszystko dostarczamy wprost pod Twoje drzwi."
        },
    ]

    return (
        <div className="mb-28 justify-center flex">
            <div className="pas-container justify-center">
                <h1 className="pas-title">Czym wyróżnia się nasz sklep?</h1>

                <div className="pas-points-container justify-center">
                    <div className="grid grid-container grid-cols-3 pas-points-container-sec">
                        {
                            points.map((points, index) => (
                                <div className="col-span-1 row-span-1 pas-point" key={index}>
                                    <div className="pas-container-point-image">
                                        <img className="pas-point-image"
                                             src={process.env.PUBLIC_URL + `/assets/pointsIcons/${points.icon}`} alt=""/>
                                    </div>


                                    <h2 className="pas-point-title">{points.title}</h2>
                                    <h1 className="pas-point-description">{points.description}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsAboutShop;
