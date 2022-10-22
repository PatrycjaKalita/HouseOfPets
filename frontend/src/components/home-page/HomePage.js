import React from 'react';
import WelcomeMessage from "./welcome-message/WelcomeMessage";
import AdoptionSlider from "./adoption-slider/AdoptionSlider";
import Donation from "./donation/Donation";
import PointsAboutShop from "./points-about-shop/PointsAboutShop";
import ShopDescription from "./shop-description/ShopDescription";
import Bestsellers from "./bestsellers/Bestsellers";

const HomePage = () => {
    return (
        <div>
            <WelcomeMessage/>
            <AdoptionSlider/>
            <Donation/>
            <PointsAboutShop/>
            <ShopDescription/>
            <Bestsellers/>
        </div>
    );
};

export default HomePage;
