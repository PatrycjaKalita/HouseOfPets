import React, {useMemo, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {InputAdornment} from "@mui/material";
import {Pagination} from "@mui/material";

import './Style.css';
import TopInformations from "./top-informations/TopInformations";

const useStyles = makeStyles({
    textFieldStyle: {
        width: 100,
        fontFamily: "Merriweather",
        "& label.Mui-focused": {
            color: '#464646',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        }
    },
    root: {}
});


const ProductsList = () => {
    const classes = useStyles();
    const products = useMemo(() => [
        {
            image: "https://zooart.com.pl/pol_pl_ROYAL-CANIN-Hair-Skin-Care-4kg-karma-sucha-dla-kotow-doroslych-lsniaca-siersc-i-zdrowa-skora-1784_1.jpg",
            title: "ROYAL CANIN Hair&Skin",
            price: "154.65",
            link: '/royal-canin-hair-&-skin',
            rating: '4.5',
            producer: 'Royal Canin',
            lifePhase: 'dorosły',
        },
        {
            image: "https://zooart.com.pl/pol_pl_ROYAL-CANIN-Kitten-Sterilised-2kg-karma-sucha-dla-kociat-od-6-do-12-miesiaca-zycia-sterylizowanych-23748_8.jpg",
            title: "ROYAL CANIN Kitten Sterilised 2kg",
            price: "83.95",
            link: '/royal-canin-kitten-sterilised-2-kg',
            rating: '4.2',
            producer: 'Royal Canin',
            lifePhase: 'junior',
        },
        {
            image: "https://media.os.fressnapf.com/products-v2/5/9/a/a/59aa20c0d5b797ee0768f5898f63ea563e6ce45a_cfb1468d08bb0bc43f67a83c3bc65be9698b4afe.jpg?t=prod_m&f=webp",
            title: "Royal Canin British Shorthair",
            price: "36.80",
            link: '/royal-canin-british-shorthair',
            rating: '3',
            producer: 'Royal Canin',
            lifePhase: 'dorosły',
        },
        {
            image: "https://zooart.com.pl/pol_pl_WHISKAS-Sterile-14kg-sucha-karma-dla-kotow-po-sterylizacji-z-kurczakiem-13276_7.jpg",
            title: "WHISKAS Sterile 14kg z kurczakiem",
            price: "115.80",
            link: '/whiskas-sterile-14-kg-z-kurczakiem',
            rating: '4.8',
            producer: 'Whiskas',
            lifePhase: 'senior',
        },
        {
            image: "https://image.ceneostatic.pl/data/products/92064026/i-almo-nature-holistic-adult-z-ryba-oleista-2kg.jpg",
            title: "ALMO NATURE Holistic Adult z rybą oleistą 2kg",
            price: "45.00",
            link: '/almo-nature-holistic-adult-z-ryba-oleista-2-kg',
            rating: '3.1',
            producer: 'Almo Nature',
            lifePhase: 'dorosły',
        },
        {
            image: "https://zooart.com.pl/pol_pl_-PERFECT-FIT-Sensitive-1-7kg-Bogaty-w-Indyka-sucha-karma-dla-doroslych-kotow-46221_1.png",
            title: "PERFECT FIT (Sensitive 1+) 7kg Bogaty w Indyka",
            price: "109.90",
            link: '/perfect-fit-7-kg-bogaty-w-indyka',
            rating: '5',
            producer: 'Perfect Fit',
            lifePhase: 'dorosły',
        },
    ], []);

    const productTitle = (title) => {
        if (title.length > 21) {
            const tmp = title.slice(0, 21);
            return tmp + "...";
        } else if (title.length <= 21)
            return title;
    }

    /*Producers*/
    let uniqueProducers = products.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.producer === value.producer
            ))
    )

    /*Life Phase*/
    let uniqueLifePhase = products.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.lifePhase === value.lifePhase
            ))
    )

    function sortAscending(a, b) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    function sortDescending(a, b) {
        if (a.price > b.price) {
            return -1;
        }
        if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    const [selectedSorting, setSelectedSorting] = useState('ascending');

    // filtering by producers checked in Filter checkboxes

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        handleFilters(newChecked);
    }

    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })


    const [filteredProducts, setFilteredProducts] = useState(products);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleFilters = (filters, producers, lifePhase) => {
        if (filters.length === 0) {
            setFilteredProducts(products);
            setNewFilteredProducts(products);

            return 0;
        }

        const newFilters = {...Filters};

        newFilters[producers] = filters;
        newFilters[lifePhase] = filters;

        let newProducts = [];

        /*Producer*/
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < filters.length; j++) {
                if (products[i].producer === filters[j]) {
                    newProducts.push(products[i]);
                }
            }
        }

        /*Life Phase*/
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < filters.length; j++) {
                if (products[i].lifePhase === filters[j]) {
                    newProducts.push(products[i]);
                }
            }
        }

        setFilters(newFilters);
        setFilteredProducts(newProducts);
        setNewFilteredProducts(newProducts);
    }

    const [newFilteredProducts, setNewFilteredProducts] = useState(filteredProducts);
    const [newProducerQuantityProducts, setNewProducerQuantityProducts] = useState(products);
    const [newLifePhaseQuantityProducts, setNewLifePhaseQuantityProducts] = useState(products);

    useEffect(() => {
        if (minPrice > 0 || maxPrice > 0) {

            if (minPrice > 0) {
                setMinPrice(minPrice);
            }
            if (maxPrice > 0) {
                setMaxPrice(maxPrice);
            }

            if (minPrice > 0 && maxPrice > minPrice) {
                let productsFilteredByPrice = [];
                let finalProductsFilteredByPrice = [];
                let producerQuantity = [];
                let finalProducerQuantity = [];

                let lifePhaseQuantity = [];
                let finalLifePhaseQuantity = [];

                for (let i = 0; i < filteredProducts.length; i++) {
                    if (filteredProducts[i].price >= minPrice) {
                        productsFilteredByPrice.push(filteredProducts[i]);
                    }
                }

                for (let i = 0; i < productsFilteredByPrice.length; i++) {
                    if (productsFilteredByPrice[i].price <= maxPrice) {
                        finalProductsFilteredByPrice.push(productsFilteredByPrice[i]);
                    }
                }

                for (let i = 0; i < products.length; i++) {
                    if (products[i].price >= minPrice) {
                        producerQuantity.push(products[i]);
                    }
                }

                for (let i = 0; i < producerQuantity.length; i++) {
                    if (producerQuantity[i].price <= maxPrice) {
                        finalProducerQuantity.push(producerQuantity[i]);
                    }
                }

                for (let i = 0; i < lifePhaseQuantity.length; i++) {
                    if (lifePhaseQuantity[i].price <= maxPrice) {
                        finalProducerQuantity.push(lifePhaseQuantity[i]);
                    }
                }

                setNewFilteredProducts(finalProductsFilteredByPrice);
                setNewProducerQuantityProducts(finalProducerQuantity);
                setNewLifePhaseQuantityProducts(finalLifePhaseQuantity);
            }

            if (minPrice > 0 && maxPrice <= 0) {
                let finalProductsFilteredByPrice = [];
                let finalProducerQuantity = [];
                let finalLifePhaseQuantity = [];

                for (let i = 0; i < filteredProducts.length; i++) {
                    if (filteredProducts[i].price >= minPrice) {
                        finalProductsFilteredByPrice.push(filteredProducts[i]);
                    }
                }

                for (let i = 0; i < products.length; i++) {
                    if (products[i].price >= minPrice) {
                        finalProducerQuantity.push(products[i]);
                    }
                }

                for (let i = 0; i < products.length; i++) {
                    if (products[i].price >= minPrice) {
                        finalLifePhaseQuantity.push(products[i]);
                    }
                }

                setNewFilteredProducts(finalProductsFilteredByPrice);
                setNewProducerQuantityProducts(finalProducerQuantity);
                setNewLifePhaseQuantityProducts(finalLifePhaseQuantity);
            }

            if (maxPrice >= minPrice && minPrice <= 0) {
                let finalProductsFilteredByPrice = [];
                let finalProducerQuantity = [];
                let finalLifePhaseQuantity = [];

                for (let i = 0; i < filteredProducts.length; i++) {
                    if (filteredProducts[i].price <= maxPrice) {
                        finalProductsFilteredByPrice.push(filteredProducts[i]);
                    }
                }

                for (let i = 0; i < products.length; i++) {
                    if (products[i].price <= maxPrice) {
                        finalProducerQuantity.push(products[i]);
                    }
                }

                for (let i = 0; i < products.length; i++) {
                    if (products[i].price <= maxPrice) {
                        finalLifePhaseQuantity.push(products[i]);
                    }
                }

                setNewFilteredProducts(finalProductsFilteredByPrice);
                setNewProducerQuantityProducts(finalProducerQuantity);
                setNewLifePhaseQuantityProducts(finalLifePhaseQuantity);
            }

            if (maxPrice <= minPrice && minPrice <= 0) {
                setNewFilteredProducts(filteredProducts);
                setNewProducerQuantityProducts(products)
                setNewLifePhaseQuantityProducts(products);
            }
        }
    }, [filteredProducts, minPrice, maxPrice, products])

    if (selectedSorting === 'ascending') {
        newFilteredProducts.sort(sortAscending);
    } else {
        newFilteredProducts.sort(sortDescending);
    }

    //The Pagination component enables the user to select a specific page from a range of pages.
    let [page, setPage] = useState(1);
    const LIMIT_FOR_PAGE = 16;

    const [noOfPages, setNoOfPages] = React.useState(
        Math.ceil(newFilteredProducts.length / LIMIT_FOR_PAGE)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setNoOfPages(Math.ceil(newFilteredProducts.length / LIMIT_FOR_PAGE));
        setPage(1);
    }, [newFilteredProducts])
    return (
        <div className="main-container-products-list">
            <TopInformations productsNumber={products.length}/>

            <div className="products-filters-list-container">
                {/*Filtry*/}
                <div className="filter-container">
                    <h1 className="filter-title">Filtry</h1>

                    <h1 className="filter-name">Producenci</h1>
                    {
                        uniqueProducers.map((producers, index) => (
                            <label key={index} className="checkbox-filters-container">{producers.producer}
                                <label
                                    className="checkbox-filters-number">({newProducerQuantityProducts.filter(({producer}) => producer === producers.producer).length})</label>

                                <input
                                    className="checkbox-filters"
                                    onChange={() => handleToggle(producers.producer)} type="checkbox"
                                    id={'checkbox' + producers.producer} value={producers.producer}
                                    checked={Checked.indexOf(producers.producer) !== -1}/>
                                <span className="custom-checkmark"></span>
                            </label>
                        ))
                    }

                    <h1 className="filter-name">Cena</h1>
                    <TextField
                        onChange={e => setMinPrice(parseInt(e.target.value, 10))}
                        label="od"
                        variant="outlined"
                        size="small"
                        className={classes.textFieldStyle}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                        }}
                    />
                    <div className="price-filter-line"></div>
                    <TextField
                        onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
                        label="do"
                        variant="outlined"
                        size="small"
                        className={classes.textFieldStyle}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                            classes: {
                                root: classes.root
                            }
                        }}
                    />

                    <h1 className="filter-name">Faza życia</h1>
                    {
                        uniqueLifePhase.map((lifephase, index) => (
                            <label key={index} className="checkbox-filters-container">{lifephase.lifePhase}
                                <label
                                    className="checkbox-filters-number">({newLifePhaseQuantityProducts.filter(({lifePhase}) => lifePhase === lifephase.lifePhase).length})</label>

                                <input
                                    className="checkbox-filters"
                                    onChange={() => handleToggle(lifephase.lifePhase)} type="checkbox"
                                    id={'checkbox' + lifephase.lifePhase} value={lifephase.lifePhase}
                                    checked={Checked.indexOf(lifephase.lifePhase) !== -1}/>
                                <span className="custom-checkmark"></span>
                            </label>
                        ))
                    }
                </div>


                <div>
                    {/*Prawa strona*/}
                    <div>
                        {/*Top prawej strony, sortowanko + zmiana kategori*/}

                        <div className="changing-searching-options-container">
                            <div className="changing-searching-options open">
                                <div className="changing-searching-options-top-part">
                                    <p className="top-part-options">OPCJE:</p>
                                    <p className="top-part-selected-options">Rasa: Wszystkie</p>
                                    <p className="top-part-selected-options">Wiek: Wszystkie</p>
                                    <p className="top-part-selected-options">Waga: Brak</p>
                                    <p className="top-part-selected-options">Kategoria: Sucha karma</p>
                                    <span className="">
                                    <ion-icon name="chevron-up-outline"></ion-icon>
                                </span>
                                </div>
                                <div className="hidden-box">
                                    <p>
                                        Formularz do zmiany kategorii wyboru.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Product */}
                    <div className="products-list-container">
                        {
                            newFilteredProducts.length > 0 ?
                                newFilteredProducts.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((product, index) => (
                                    <Link key={index} to={product.link}>
                                        <div className="product-list-container">
                                            <img className="product-list-img" src={product.image} alt=""/>
                                            <h1 className="product-list-title">{productTitle(product.title)}</h1>
                                            <div className="product-list-sec-row">
                                                <div className="product-list-rating-container">
                                                    <span className="product-list-star">
                                                        <ion-icon name="star"></ion-icon>
                                                    </span>
                                                    <h1 className="product-list-rating">{product.rating}</h1>
                                                </div>
                                                <div className="product-list-container-price">
                                                    <h1 className="product-list-price">{product.price}zł</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )) :
                                <div className="col-span-3 text-center">
                                    <h1>
                                        Żaden produkt nie spełnia podanych kryteriów.
                                    </h1>
                                </div>
                        }
                        <div className="col-span-4">
                            <Pagination count={noOfPages} page={page} onChange={handleChange}
                                        disabled={noOfPages === 0 || noOfPages === 1}
                                        defaultPage={1} siblingCount={1}
                                        variant="outlined" shape="rounded" className="float-right"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
