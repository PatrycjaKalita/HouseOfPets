import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Style.css';

const Navlinks = () => {
    const links = [
        {
            key: 1,
            name: "KOTY",
            link: "/choose-option/koty",
        },
        {
            key: 2,
            name: "PSY",
            link: "/choose-option/psy",
        },
        {
            key: 3,
            name: "MAŁE ZWIERZĄTKA",
            link: "/choose-option/male-zwierzatka",
        },
        {
            key: 4,
            name: "PTAKI",
            link: "/choose-option/ptaki",
        },
        {
            key: 5,
            name: "TERRARYSTYKA",
            link: "/choose-option/terrarystyka",
        }
    ]

    const [heading, setHeading] = useState("");

    return (
        <>
            {
                links.map((link) => (
                    <div key={link.key}>
                        <div className="navlinks-container">
                            <Link to={link.link}>
                                <h1 className="navlinks-title"
                                    onClick={() => {
                                        heading !== link.name ? setHeading(link.name) : setHeading("");
                                    }}>
                                    {link.name}
                                </h1>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default Navlinks;
