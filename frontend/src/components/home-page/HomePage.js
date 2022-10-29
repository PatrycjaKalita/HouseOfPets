import React from 'react';
import WelcomeMessage from "./welcome-message/WelcomeMessage";
import AdoptionSlider from "./adoption-slider/AdoptionSlider";
import Donation from "./donation/Donation";
import PointsAboutShop from "./points-about-shop/PointsAboutShop";
import Searchbar from "../header/searchbar/Searchbar";
import ShopDescription from "./shop-description/ShopDescription";
import Bestsellers from "./bestsellers/Bestsellers";

const HomePage = () => {
    return (
        <div>
            <WelcomeMessage/>
            <div className="nav-searchbar">
                <Searchbar/>
            </div>
            <AdoptionSlider/>
            <Donation/>
            <PointsAboutShop/>
            <ShopDescription/>
            <Bestsellers/>
        </div>
    );
};

export default HomePage;
