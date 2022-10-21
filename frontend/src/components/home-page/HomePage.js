import React from 'react';
import WelcomeMessage from "./welcome-message/WelcomeMessage";
import AdoptionSlider from "./adoption-slider/AdoptionSlider";
import Donation from "./donation/Donation";

const HomePage = () => {
    return (
        <div>
            <WelcomeMessage/>
            <AdoptionSlider/>
            <Donation/>
        </div>
    );
};

export default HomePage;
