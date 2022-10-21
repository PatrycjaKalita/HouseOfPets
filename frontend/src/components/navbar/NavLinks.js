import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Style.css';

const Navlinks = () => {
    const links = [
        {
            key: 1,
            name: "KOTY",
            link: "/adoption-or-shop/koty",
        },
        {
            key: 2,
            name: "PSY",
            link: "/adoption-or-shop/psy",
        },
        {
            key: 3,
            name: "MAŁE ZWIERZĄTKA",
            link: "/adoption-or-shop/male-zwierzatka",
        },
        {
            key: 4,
            name: "PTAKI",
            link: "/adoption-or-shop/ptaki",
        },
        {
            key: 5,
            name: "TERRARYSTYKA",
            link: "/adoption-or-shop/terrarystyka",
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
                                    onClick={() => {heading !== link.name ? setHeading(link.name) : setHeading("");}}>
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
