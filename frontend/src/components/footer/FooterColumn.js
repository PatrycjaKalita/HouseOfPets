import React from 'react';
import './Style.css';

const FooterColumn = ({links, title}) => {
    return (
        <ul className="border-r-2 border-gray-300 pr-6">
            <h1 className="mb-1 font-bold">{title}</h1>
            {links.map((link) => (
                <li key={link.name}>
                    <a className="footer-column-link duration-300 leading-6"
                       href={link.link} >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default FooterColumn;
