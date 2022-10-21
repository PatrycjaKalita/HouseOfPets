import React, {useState} from 'react';

import './Style.css';

const HeaderIcon = (props) => {
    const [icon, setIcon] = useState(props.iconName);

    return (
        <span className="header-icon"
              onMouseEnter={() => setIcon(props.iconNameHover)}
              onMouseLeave={() => setIcon(props.iconName)}>

            <ion-icon name={icon}></ion-icon>
        </span>
    );
};

export default HeaderIcon;
