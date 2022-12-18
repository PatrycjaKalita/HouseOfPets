import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Style.css';

import iconCat from "../../assets/nav-bar/cat.png"
import iconDog from "../../assets/nav-bar/dog.png"
import iconLittleAnimals from "../../assets/nav-bar/rabbit.png"
import iconBird from "../../assets/nav-bar/parrot.png"
import iconTurtle from "../../assets/nav-bar/turtle.png"

const Navlinks = () => {
    const links = [
        {
            key: 1,
            name: "KOTY",
            icon: iconCat,
            link: "/choose-option/koty",
        },
        {
            key: 2,
            name: "PSY",
            icon: iconDog,
            link: "/choose-option/psy",
        },
        {
            key: 3,
            name: "MAŁE ZWIERZĄTKA",
            icon: iconLittleAnimals,
            link: "/choose-option/male-zwierzatka",
        },
        {
            key: 4,
            name: "PTAKI",
            icon: iconBird,
            link: "/choose-option/ptaki",
        },
        {
            key: 5,
            name: "TERRARYSTYKA",
            icon: iconTurtle,
            link: "/choose-option/terrarystyka",
        }
    ]

    const [heading, setHeading] = useState("");

    return (
        <>
            {
                links.map((link) => (
                    <Link key={link.key} to={link.link} className="navlinks-container">
                        <img alt={link.name} src={link.icon} className="nav-icon"/>
                        <h1 className="navlinks-title"
                            onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                            }}>
                            {link.name}
                        </h1>
                    </Link>
                ))
            }
        </>
    );
};

export default Navlinks;
