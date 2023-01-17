import React, {useState} from 'react';
import './Style.css'
import imageProduct from "../../../assets/royalCanin.jpg";


const ProductsSet = () => {
    const [showed, setShowed] = useState(false);
    return (
        <div className="PS-main-container">
            <h1 className="PS-title">Lista produktów w zestawie</h1>
            <p className="PS-description">Poniższa lista produktów może zostać z edytowana. Jeśli dany produkt ma inne
                warianty wagowe lub kolorystyczne to może on zostać zmieniony. Należy kliknąć przy takim produkcie
                przycisk “Zmień”. Wyświetlą się inne warianty, które można wybrać.
                <br/>Zestaw jest tańszy o 10%, niż gdyby każdy produkt z listy został oddzielnie dodany do koszyka.
                Zachęcamy do zakupu.</p>

            <div>
                <div className={showed ? "PS-product-container-open" : "PS-product-container"}>
                    <img src={imageProduct} alt="focia" className="PS-product-img"/>

                    <div className="OD-product-details-container">
                        <h1 className="OD-product-name">Nazwa produktu z zamówienia</h1>

                        <div className="PS-change-link-container">
                            <h1 className="OD-product-detail">waga/kolor</h1>

                            <h1 className="PS-product-change-link" onClick={() => setShowed(true)}>Zmień</h1>
                        </div>

                    </div>

                    <h1 className="OD-product-amount">Ilość:</h1>
                    <h1 className="OD-product-amount-value">1</h1>

                    <h1 className="OD-product-price">199.90 zł</h1>
                </div>

                <div className={showed ? "PS-product-change-container" : "hidden"}>
                    <div className="PS-changing-container">
                        <h1 className="PS-changing-title">Dostępne opcje:</h1>

                        <div className="PS-product-change">
                            <img alt="product" className="PS-product-change-img" src={imageProduct}/>

                            <h1 className="PS-product-detail">waga/kolor</h1>
                            <h1 className="PS-product-change-price">199.90 zł</h1>
                        </div>

                        <span className="PS-close-changing-container"
                              onClick={() => setShowed(false)}>
                                        <ion-icon name="close-outline"></ion-icon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsSet;
