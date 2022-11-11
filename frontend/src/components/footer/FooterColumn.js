import React from 'react';
import './Style.css';

const FooterColumn = ({links, title}) => {
    return (
        <ul className="footer-column-container">
            <h1 className="footer-column-title">{title}</h1>
            {links.map((link) => (
                <li key={link.name}>
                    <a className="footer-column-link"
                       href={link.link}>
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default FooterColumn;
