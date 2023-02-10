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
    const animalID = props.animalID
    const productID = props.productID

    const clickSubmit = (orderID) => {
        history.push(`/profil/pracownik/zamowienie/${orderID}`)
    }

    const clickEditAnimalSubmit = (animalID) => {
        history.push(`/profil/pracownik/zwierzeta/edycja/${animalID}`)
    }

    const clickDeleteAnimalSubmit = (animalID) => {
        history.push(`/profil/pracownik/zwierzeta/usun/${animalID}`)
    }

    const clickEditProductSubmit = (productID) => {
        history.push(`/profil/pracownik/produkty/edycja/${productID}`)
    }

    const clickDeleteProductsSubmit = (productID) => {
        history.push(`/profil/pracownik/produkty/usun/${productID}`)
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
                    <button className="dropDown-first-option" onClick={() => clickSubmit(orderID)}>Szczegóły
                        zamówienia
                    </button>
                    <h1 className="dropDown-second-option">Anuluj</h1>
                </div>
            );
        }
        if (props.options === 3) {
            return (
                <div className={classToggle}>
                    <button className="dropDown-first-option" onClick={() => clickEditAnimalSubmit(animalID)}>Edytuj
                    </button>
                    <button className="dropDown-second-option" onClick={() => clickDeleteAnimalSubmit(animalID)}>Usuń
                    </button>
                </div>
            );
        }
        if (props.options === 4) {
            return (
                <div className={classToggle}>
                    <button className="dropDown-first-option" onClick={() => clickEditProductSubmit(productID)}>Edytuj
                    </button>
                    <button className="dropDown-second-option"
                            onClick={() => clickDeleteProductsSubmit(productID)}>Usuń
                    </button>
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
