import React, {useMemo} from 'react';
import {Link} from "react-router-dom";

import './Style.css';
import PromotionsSlider from "./promotions-slider/PromotionsSlider";

const Bestsellers = () => {
    const products = useMemo(() => [
        {
            image: "https://media.os.fressnapf.com/products-v2/9/9/3/f/993fc256d065386901445e1efba2e902759c381a_f055b4a127d413022c3bfb25494e304d5bf92c83.jpg?t=prod_m&f=webp",
            title: "AniOne Piłka z liną 5 cm",
            price: "9.99",

        },
        {
            image: "https://shop-cdn-m.mediazs.com/bilder/purina/pro/plan/fortiflora/feline/probiotic/1/800/257498_pla_nestle_purina_proplan_fortiflora_feline_probiotic_30x1g_hs_01_1.jpg",
            title: "Purina Pro Plan Fortiflora Feline Probiotic",
            price: "165.28",

        },
        {
            image: "https://media.os.fressnapf.com/products-v2/5/9/a/a/59aa20c0d5b797ee0768f5898f63ea563e6ce45a_cfb1468d08bb0bc43f67a83c3bc65be9698b4afe.jpg?t=prod_m&f=webp",
            title: "Royal Canin British Shorthair",
            price: "36.80",

        },
        {
            image: "https://media.os.fressnapf.com/products-v2/f/7/c/9/f7c91d5959f306b753cf23dbf09370b630710c90_aaf951dec05004e7683250323385c71c70b7afde.jpg?t=prod_m&f=webp",
            title: "AniOne Wędka - Krab",
            price: "29.80",

        },
        {
            image: "https://media.os.fressnapf.com/products-v2/b/3/6/3/b363cc1225025ea684587dbb19c096b58839e320_2f1834f64ba8dd6539e29c9ee528b86ed96b5c11.jpg?t=prod_m&f=webp",
            title: "Savic transporter dla ptaków",
            price: "178.90",

        },
        {
            image: "https://media.os.fressnapf.com/products-v2/e/4/a/7/e4a7cc8c30ec54463e4fdbfdc839f869af1a1bfb_f06fd80616132c0ecab1391718ffb87f3c65be7f.jpg?t=prod_m&f=webp",
            title: "MultiFit Granulat dla żółwi lądowych 1 l",
            price: "41.19",

        }
    ], []);

    const productTitle = (title) => {
        if (title.length > 25) {
            const tmp = title.slice(0, 25);
            return tmp + "...";
        } else if (title.length <= 25)
            return title;
    }

    return (
        <div className="main-bestseller-container">
            <div className="bestseller-container">
                <h1 className="bestseller-title">Najczęściej wybierane produkty</h1>
                <div className="bestseller-slider-container">
                    <div className="bestseller-products-container">
                        {
                            products.map((product, index) => (
                                <Link key={index} to={'/product'}>
                                    <div className="product-container">
                                        <img className="product-container-img" src={product.image} alt=""/>
                                        <h2 className="product-container-title">{productTitle(product.title)}</h2>
                                        <h1 className="product-container-price">{product.price} zł</h1>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                    <PromotionsSlider/>
                </div>
            </div>
        </div>
    );
};

export default Bestsellers;
