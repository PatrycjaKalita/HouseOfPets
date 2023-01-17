import React, {useState} from 'react';
import './Style.css'
import dpd from '../../../assets/deliveryMethod/dpd.png'
import inpost from '../../../assets/deliveryMethod/inpost.png'
import osobisty from '../../../assets/deliveryMethod/osobisty.png'

const DeliveryMethod = () => {
    const [delivery1, setDelivery1] = useState('radio-button-off-outline');
    const [delivery2, setDelivery2] = useState('radio-button-off-outline');
    const [delivery3, setDelivery3] = useState('radio-button-off-outline');

    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [deliveryCost, setDeliveryPrice] = useState(0);

    function onClickHandlerDelivery(number, newDeliveryPrice, newDeliveryMethod) {
        setDelivery1('radio-button-off-outline');
        setDelivery2('radio-button-off-outline');
        setDelivery3('radio-button-off-outline');
        number('radio-button-on-outline');
        setDeliveryPrice(newDeliveryPrice);
        setDeliveryMethod(newDeliveryMethod);
    }
    return (
        <div className="main-dm-container">
            <h1 className="dm-title">Dostawa</h1>

            <div className="dm-column-container">
                <div  className="dm-container">
                            <span className={delivery1 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setDelivery1, 15, 'Kurier - DPD')}>
                                <ion-icon name={delivery1}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="dpd" src={dpd} className="dm-image"/>
                        <h1 className="dm-name">Kurier - DPD</h1>
                        <h1 className="dm-price">15.00 zł</h1>
                    </div>
                </div>

                <div  className="dm-container">
                            <span className={delivery2 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setDelivery2, 10, 'Paczkomaty INPOST')}>
                                <ion-icon name={delivery2}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="inpost" src={inpost} className="dm-image"/>
                        <h1 className="dm-name">Paczkomaty INPOST</h1>
                        <h1 className="dm-price">10 zł</h1>
                    </div>
                </div>

                <div  className="dm-container">
                            <span className={delivery3 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setDelivery3, 0, 'Odbiór osobisty')}>
                                <ion-icon name={delivery3}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="osobisty" src={osobisty} className="dm-image"/>
                        <h1 className="dm-name">Odbiór osobisty</h1>
                        <h1 className="dm-price">0 zł</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMethod;
