import * as React from 'react';
import {useState} from "react";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';
import './Style.css'

const More = (props) => {
    const classToggle = useState('active');

    function dropDown() {
        if (props.options === 1) {
            return (
                <div className={classToggle}>
                    <h1 className="dropDown-first-option">Zablokuj</h1>
                    <h1 className="dropDown-second-option">Usuń</h1>
                </div>
            );
        }
        if (props.options === 2) {
            return (
                <div className={classToggle}>
                    <h1 className="dropDown-first-option">Szczegóły zamówienia</h1>
                    <h1 className="dropDown-second-option">Anuluj</h1>
                </div>
            );
        }
        /*        if (props.options.length === 3) {
                    return (
                        <span className={classToggle}>
                            <h1 className="text-sm border-2 border-m_gray p-2">{props.options[0]}</h1>
                            <h1 className="text-sm border-x-2 border-b-2 border-m_gray p-2">{props.options[1]}</h1>
                             <h1 className="text-sm border-x-2 border-b-2 border-m_gray p-2">{props.options[2]}</h1>
                        </span>
                    );
                }*/
    }

    return (
        <PopupState variant="popover">
            {(popupState) => (
                <>
                    <span className="order-menu-more" {...bindTrigger(popupState)}>
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    </span>

                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        style={{boxShadow: "none"}}
                        elevation={2}
                    >
                        <Typography>{dropDown()}</Typography>
                    </Popover>
                </>
            )}
        </PopupState>

    );
};

export default More;
