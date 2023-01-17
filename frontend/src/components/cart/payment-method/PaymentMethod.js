import React, {useState} from 'react';
import '../delivery-method/Style.css'
import payPal from '../../../assets/paymentMethod/payPal.png'
import przyOdbiorze from '../../../assets/paymentMethod/przyOdbiorze.png'
import tradycyjny from '../../../assets/paymentMethod/tradycyjny.png'

const PaymentMethod = () => {
    const [payment1, setPayment1] = useState('radio-button-off-outline');
    const [payment2, setPayment2] = useState('radio-button-off-outline');
    const [payment3, setPayment3] = useState('radio-button-off-outline');

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentCost, setPaymentCost] = useState(0);

    function onClickHandlerDelivery(number, newPaymentCost, newPaymentMethod) {
        setPayment1('radio-button-off-outline');
        setPayment2('radio-button-off-outline');
        setPayment3('radio-button-off-outline');
        number('radio-button-on-outline');
        setPaymentCost(newPaymentCost);
        setPaymentMethod(newPaymentMethod);
    }
    return (
        <div className="main-dm-container">
            <h1 className="dm-title">Płatność</h1>

            <div className="dm-column-container">
                <div  className="dm-container">
                            <span className={payment1 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setPayment1, 0, 'Płatności online (PayPal)')}>
                                <ion-icon name={payment1}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="payPal" src={payPal} className="dm-image"/>
                        <h1 className="dm-name">Płatności online<br/>(PayPal)</h1>
                        <h1 className="dm-price">0 zł</h1>
                    </div>
                </div>

                <div  className="dm-container">
                            <span className={payment2 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setPayment2, 10, 'Płatność przy odbiorze')}>
                                <ion-icon name={payment2}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="przyOdbiorze" src={przyOdbiorze} className="dm-image"/>
                        <h1 className="dm-name">Płatność przy odbiorze</h1>
                        <h1 className="dm-price">10 zł</h1>
                    </div>
                </div>

                <div  className="dm-container">
                            <span className={payment3 === 'radio-button-off-outline' ? "dm-choose-button" : "dm-choose-button-choose"} onClick={() => onClickHandlerDelivery(setPayment3, 0, 'Przelew tradycyjny')}>
                                <ion-icon name={payment3}></ion-icon>
                            </span>
                    <div className="dm-detail-container">
                        <img alt="tradycyjny" src={tradycyjny} className="dm-image"/>
                        <h1 className="dm-name">Przelew tradycyjny</h1>
                        <h1 className="dm-price">0 zł</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
