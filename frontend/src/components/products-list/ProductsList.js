import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {InputAdornment} from "@mui/material";
import {Pagination} from "@mui/material";

import './Style.css';
import {products} from './productsData';
import TopInformations from "./top-informations/TopInformations";
import ChangingSearchingOptions from "./changing-searching-options/ChangingSearchingOptions";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import ProductInList from "./product-in-list/ProductInList";

const useStyles = makeStyles({
    textFieldStyle: {
        width: 100,
        "& label.Mui-focused": {
            color: '#464646',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        }
    },
    selectStyles: {
        width: 200,
        color: '#464646',
        "&.MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D",
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    },
    inputLabelStyle: {
        '&.MuiInputLabel-root': {
            "&.Mui-focused": {
                color: '#464646',
            },
        },
    },
    root: {}
});


const ProductsList = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const productTitleShort = (title) => {
        if (title.length > 22) {
            const tmp = title.slice(0, 22);
            return tmp + "..";
        } else if (title.length <= 22)
            return title;
    }

    const productTitleShortMobile = (title) => {
        if (title.length > 27) {
            const tmp = title.slice(0, 27);
            return tmp + "..";
        } else if (title.length <= 27)
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
    }, [filteredProducts, minPrice, maxPrice])

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
                    <div className="right-side-csof-sorting-by-price">
                        {/*Top prawej strony, sortowanko + zmiana kategori*/}
                        <ChangingSearchingOptions/>

                        <div className="rs-sorting-by-price">
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Sortuj po</InputLabel>

                                <Select
                                    className={classes.selectStyles}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    /*value={valueBreeds}*/
                                    label="Sortuj po"
                                    onChange={e => setSelectedSorting(e.target.value)}
                                >

                                    <MenuItem value="ascending">Cena - rosnąco</MenuItem>
                                    <MenuItem value="descending">Cena - malejąco</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="products-list-container">
                        {
                            newFilteredProducts.length > 0 ?
                                newFilteredProducts.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((product, index) => (
                                    <Link key={index} to={product.link}>
                                        <ProductInList productImage={product.image}
                                                       productTitle={productTitleShort(product.title)}
                                                       productRating={product.rating} productPrice={product.price}/>
                                    </Link>
                                )) :
                                <div className="no-product-message">
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

            {/* For windows that are max 1024px width*/}
            <div className="products-filters-list-container-mobile">
                <div className="filter-searching-mobile">
                    <div className="right-side-csof-sorting-by-price">
                        <ChangingSearchingOptions/>
                    </div>

                    <span className="filter-icon-mobile" onClick={() => setOpen(!open)}>
                        <ion-icon name="funnel-outline"></ion-icon>
                    </span>
                </div>

                {/*Filtry*/}
                <div className={`filter-container-mobile ${open ? 'left-0' : 'left-[-100%]'}`}>
                    <div className="flex w-full">
                        <h1 className="filter-title">Filtry</h1>

                        <div className="filter-window-close">
                        <span className="header-icon-mobile" onClick={() => setOpen(!open)}>
                            <ion-icon name={`${open ? "close" : "close"}`}></ion-icon>
                        </span>
                        </div>
                    </div>
                    <div className="rs-sorting-by-price">
                        <FormControl>
                            <InputLabel className={classes.inputLabelStyle}>Sortuj po</InputLabel>

                            <Select
                                className={classes.selectStyles}
                                IconComponent={ExpandMoreRoundedIcon}
                                label="Sortuj po"
                                onChange={e => setSelectedSorting(e.target.value)}
                            >

                                <MenuItem value="ascending">Cena - rosnąco</MenuItem>
                                <MenuItem value="descending">Cena - malejąco</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

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
                    <div className="price-container-mobile">
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

                    </div>

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
                    {/* Product */}
                    <div className="products-list-container">
                        {
                            newFilteredProducts.length > 0 ?
                                newFilteredProducts.slice((page - 1) * LIMIT_FOR_PAGE, page * LIMIT_FOR_PAGE).map((product, index) => (
                                    <Link key={index} to={product.link}>
                                        <ProductInList productImage={product.image}
                                                       productTitle={productTitleShortMobile(product.title)}
                                                       productRating={product.rating} productPrice={product.price}/>
                                    </Link>
                                )) :
                                <div className="no-product-message">
                                    <h1>
                                        Żaden produkt nie spełnia podanych kryteriów.
                                    </h1>
                                </div>
                        }
                        <div className="pagination">
                            <Pagination count={noOfPages} page={page} onChange={handleChange}
                                        disabled={noOfPages === 0 || noOfPages === 1}
                                        defaultPage={1} siblingCount={1}
                                        variant="outlined" shape="rounded" className="m-auto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
