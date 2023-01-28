import * as React from 'react';
import {useState} from "react";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';
import './Style.css'
import {useHistory} from "react-router-dom";

const More = (props) => {
    const classToggle = useState('active');
    const history = useHistory()
    const orderID = props.orderID

    const clickSubmit = (orderID) => {
        history.push(`/profil/pracownik/zamowienie/${orderID}`)
    }

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
                    <button className="dropDown-first-option" onClick={() => clickSubmit(orderID)}>Szczegóły zamówienia</button>
                    <h1 className="dropDown-second-option">Anuluj</h1>
                </div>
            );
        }
        if (props.options === 3) {
            return (
                <div className={classToggle}>
                    <h1 className="dropDown-first-option">Edytuj</h1>
                    <h1 className="dropDown-second-option">Usuń</h1>
                </div>
            );
        }
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
