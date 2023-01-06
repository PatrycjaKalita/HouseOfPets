import React, {useState} from 'react';

import './Style.css';
import {Link} from "react-router-dom";

const Searchbar = () => {

    const data = [
        {
            "title": "ROYAL CANIN Hair&Skin Care 4kg",
            "price": "78.01",
            "image": "https://zooart.com.pl/pol_pl_ROYAL-CANIN-Hair-Skin-Care-4kg-karma-sucha-dla-kotow-doroslych-lsniaca-siersc-i-zdrowa-skora-1784_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "Farmina N&D Ancestral Grain feline CHICKEN & POMEGRANATE 1,5kg",
            "price": "25.11",
            "image": "https://zooart.com.pl/pol_pl_Farmina-N-D-Ancestral-Grain-feline-CHICKEN-POMEGRANATE-300g-Data-waznosci-20-09-2022-60162_2.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "ROYAL CANIN Light Weight Care 1,5kg karma sucha dla kotów dorosłych",
            "price": "98.00",
            "image": "https://zooart.com.pl/pol_pl_ROYAL-CANIN-Light-Weight-Care-1-5kg-karma-sucha-dla-kotow-doroslych-utrzymanie-prawidlowej-masy-ciala-41915_3.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "ABENA Abri Cell Podkłady higieniczne 60x40cm",
            "price": "81.99",
            "image": "https://zooart.com.pl/pol_pl_ABENA-Abri-Cell-Podklady-higieniczne-60x40cm-6-warstwowe-25szt-62603_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "ZOLUX ANAH Obcinacz do pazurów dla szczeniąt",
            "price": "76.43",
            "image": "https://zooart.com.pl/pol_pl_ZOLUX-ANAH-Obcinacz-do-pazurow-dla-szczeniat-48023_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "ALEGIA Nasiona oleiste 100g",
            "price": "34.12",
            "image": "https://zooart.com.pl/pol_pl_ALEGIA-Nasiona-oleiste-100g-48736_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "Piłka rugby na smakołyki dla małego psa/kota",
            "price": "199.99",
            "image": "https://zooart.com.pl/pol_pl_Pilka-rugby-na-smakolyki-dla-malego-psa-kota-48824_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "KERBL Lizawka - Babeczka dla gryzoni z minerałami, 50g",
            "price": "32.54",
            "image": "https://zooart.com.pl/pol_pl_KERBL-Lizawka-Babeczka-dla-gryzoni-z-mineralami-50g-60285_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "Ham-Stake Duszek Okruszek dla gryzoni 150g",
            "price": "123.87",
            "image": "https://zooart.com.pl/pol_pl_Ham-Stake-Duszek-Okruszek-dla-gryzoni-150g-52113_1.jpg",
            "link": "/search-product-1"
        },
        {
            "title": "ALEGIA Liście Malin 90g",
            "price": "28.98",
            "image": "https://zooart.com.pl/pol_pl_ALEGIA-Liscie-Malin-90g-61680_1.jpg",
            "link": "/search-product-1"
        }
    ];
    const [showed, setShowed] = useState(false);

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }

    const productTitle = (title) => {
        if (title.length > 25) {
            const tmp = title.slice(0, 25);
            return tmp + "...";
        } else if (title.length <= 25)
            return title;
    }

    return (
        <div className="main-searchbar-container">

            <div className={showed ? "searchbar-container" : "hidden"}>
                <div className="searchbar-container-before">
                    <span className="search-icon-left">
                            <ion-icon name="search-outline"></ion-icon>
                    </span>

                    <input type="text" placeholder="Szukaj"
                           className="search-input"
                           value={wordEntered}
                           onChange={handleFilter}
                    />

                    {filteredData.length !== 0 ? (
                        <span className="search-icons">
                                <ion-icon name="close" onClick={clearInput}></ion-icon>
                            </span>
                    ) : (
                        <div></div>
                    )}
                </div>

                {filteredData.length !== 0 && (
                    <div className="filtered-search-container">
                        {filteredData.slice(0, 15).map((value, index) => {
                            return (
                                <Link to={value.link} key={index}>
                                    <div className="filtered-search">
                                        <img alt={value.title} src={value.image} className="search-image"/>
                                        <div className="pl-10">
                                            <h2 className="searchbar-title">{productTitle(value.title)}</h2>
                                            <h1 className="searchbar-price">{value.price} zł</h1>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) /*: (
                <div className="absolute">
                    <h2>Brak wyników wyszukiwania.</h2>
                </div>
                )*/
                }
            </div>

            <div className="header-search-icons">
                <span className={showed ? "hidden" : "header-search-icon"}
                      onClick={() => setShowed(true)}>
                    <ion-icon name="search-outline"></ion-icon>
                </span>
                <span className={showed ? "header-close-icon" : "hidden"}
                      onClick={() => setShowed(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </span>
            </div>
        </div>
    );
};

export default Searchbar;
