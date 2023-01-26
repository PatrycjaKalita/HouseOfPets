import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import './Style.css';
import {animalsShop} from './shopFormData'
import {useStylesShopForm} from "./styleShopForm";
import {useHistory} from "react-router-dom";
import {getCookie, signOut} from "../../auth/Helpers";
import axios from "axios";
import {toast} from "react-toastify";

const ShopForm = () => {
    const classes = useStylesShopForm();
    const history = useHistory()
    let urlLink = window.location.href.replace('http://localhost:3000/shop-form/', '')
    let filterResults = [];

    const token = getCookie('token');
    const [values, setValues] = useState({
        categoryProduct: '',
        typeOfAnimal: '',
        animalBreed: '',
        animalAge: '',
        animalWeight: '',
    });

    useEffect(() => {
        loadProductCategories();
        loadBreedsOfAnimals()
    }, []);

    const [availableProductDetails, setAvailableProductDetails] = useState(false);
    const loadProductCategories = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/categories`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductDetails(response.data.availableCategories);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    const handleCategoryChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    let idTypeOfAnimal;
    if (urlLink === 'koty') {
        idTypeOfAnimal = '63bee7531312a763a0629bfb'
    } else if (urlLink === 'psy') {
        idTypeOfAnimal = '63bee7531312a763a0629bfc'
    } else if (urlLink === 'małe-zwierzątka') {
        idTypeOfAnimal = '63bee7531312a763a0629bfd'
    }

    const [availableBreeds, setAvailableBreeds] = useState([]);
    const loadBreedsOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view-shop-form/breed?id=${idTypeOfAnimal}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableBreeds(response.data.availableBreeds.breeds);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    let idBreed;

    function handleAgesChange(e) {
        const {name, value} = e.target
        setValues({...values, [name]: value})
        idBreed = e.target.value
        if (availableBreeds !== 0) {
            loadAges()
        }
    }

    const [availableAges, setAvailableAges] = useState([]);
    const loadAges = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view-shop-form/age?id=${idBreed}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAges(response.data.availableAges.ages);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    let idAge;

    function handleWeightsChange(e) {
        const {name, value} = e.target
        setValues({...values, [name]: value})
        idAge = e.target.value
        if (availableAges !== 0) {
            loadWeights()
        }
    }

    const [availableWeights, setAvailableWeights] = useState([]);
    const loadWeights = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view-shop-form/weight?id=${idAge}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableWeights(response.data.availableWeights.weights);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const [valuesIds, setValuesIds] = useState({
        categoryProduct: '',
        typeOfAnimal: '',
        animalBreed: '',
        animalAge: '',
        animalWeight: '',
    });

    let {
        category_id,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id
    } = valuesIds

    category_id = values.categoryProduct
    type_of_pets_id = idTypeOfAnimal
    breed_id = values.animalBreed
    age_id = values.animalAge
    weight_id = values.animalWeight

    const handleSubmit = event => {
        event.preventDefault()
        setValuesIds({...valuesIds, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/view-shop-form/post`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                category_id,
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id
            }
        }).then(response => {
            console.log(response.data)

            filterResults = response.data.availableProducts.products;
            localStorage.setItem("filterResults", JSON.stringify(filterResults))

            if (filterResults.length > 0 && category_id !== '') {
                let selectedCategory = availableProductDetails.categories.filter(category => category._id === String(values.categoryProduct));

                history.push({
                    pathname: `/shop/${urlLink}/products/${selectedCategory[0].link}`,
                    filterResults: filterResults
                })
            }
            if (filterResults.length > 0 && category_id === '') {
                history.push({
                    pathname: `/shop/${urlLink}/products/wszystkie-kategorie`,
                    filterResults: filterResults
                })
            }
            if (filterResults.length > 0 && category_id === '63cc3e194c6402d09b507b67') {
                history.push({
                    pathname: `/shop/${urlLink}/products/zestawy`,
                    filterResults: filterResults
                })
            }
        }).catch(error => {
            setValues({...valuesIds})
            toast.error(error.response.data.error)
        })
    }

    return (<>
            {
                animalsShop.map((animal) => {
                        if (animal.id === urlLink) {
                            return (
                                <div className="shop-form-container">
                                    <h1 className="shop-form-title">Witaj w naszym sklepie "House of pets"!</h1>
                                    <h1 className="shop-form-text">Powiedz nam czego szukasz</h1>
                                    <h1 className="shop-form-description-one">Proszę powiedz nam czego poszukujesz i dla
                                        kogo,
                                        wtedy będziemy mogli spersonalizować Twoje poszukiwania.</h1>
                                    <h1 className="shop-form-description">Jeżeli chcesz zobaczyć wszystkie produkty dostępne
                                        dla danego typu zwierzątka to kliknij przycisk "SZUKAJ".
                                        Jeżeli interesuje Cię konkretna kategoria dla dlanego typu zwierzątka to wybierz
                                        kategorię i kliknij przycisk "SZUKAJ". Natomiast jeżeli szukasz prduktów dla
                                        konkretnego zwierzątka to wybierz odpowiednie opcje i kliknij przycisk
                                        "SZUKAJ". Możesz również dla konkretnego zwierzątka szukać w konkretnej kategorii. W
                                        takim przypadku wybierz wszystkie opcje i kliknij przycisk "SZUKAJ".</h1>

                                    <form onSubmit={handleSubmit} className="shop-form">
                                        <div className="shop-form-first-row">
                                            {/*Lewa strona*/}
                                            <div className="shop-form-first-row-left">
                                                <h1 className="shop-form-first-row-title">Jakiego produktu szukasz?</h1>
                                                <FormControl>
                                                    <InputLabel className={classes.inputLabelStyle}>Kategoria</InputLabel>
                                                    <Select
                                                        className={classes.selectStyles}
                                                        IconComponent={ExpandMoreRoundedIcon}
                                                        value={values.categoryProduct}
                                                        label="Kategoria"
                                                        name={"categoryProduct"}
                                                        onChange={handleCategoryChange}
                                                    >
                                                        {
                                                            availableProductDetails.hasOwnProperty('categories') === false ?
                                                                <MenuItem value="all">Loading..</MenuItem>
                                                                :
                                                                availableProductDetails.categories.map((category) => {
                                                                    return <MenuItem
                                                                        value={category._id}>{category.name}</MenuItem>
                                                                })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="shop-form-first-row-right">
                                                {/*Prawa strona*/}
                                                <img alt="cat 1" src={animal.imageTop}
                                                     className="shop-form-first-row-right-img"/>
                                            </div>
                                        </div>


                                        <div className="shop-form-second-row">
                                            <h1 className="shop-form-second-row-title">Dla kogo szukasz produktu?</h1>

                                            <div className="options-container">
                                                <div className="breed-container">
                                                    <FormControl>
                                                        <InputLabel className={classes.inputLabelStyle}>Rasa</InputLabel>
                                                        <Select
                                                            className={classes.selectStyles}
                                                            IconComponent={ExpandMoreRoundedIcon}
                                                            value={values.animalBreed}
                                                            name={"animalBreed"}
                                                            label="Rasa"
                                                            onChange={handleAgesChange}
                                                        >
                                                            {
                                                                availableBreeds.length === 0 ?
                                                                    <MenuItem value="all">Loading..</MenuItem>
                                                                    :
                                                                    availableBreeds.map((breed) => {
                                                                        return <MenuItem
                                                                            value={breed._id}>{breed.name}</MenuItem>
                                                                    })}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className="age-container">
                                                    <FormControl>
                                                        <InputLabel className={classes.inputLabelStyle}>Wiek</InputLabel>
                                                        <Select
                                                            className={classes.selectStylesAge}
                                                            IconComponent={ExpandMoreRoundedIcon}
                                                            value={values.animalAge}
                                                            label="Wiek"
                                                            name={"animalAge"}
                                                            onChange={handleWeightsChange}
                                                        >
                                                            {
                                                                availableAges.length === 0 ?
                                                                    <MenuItem value="all">Loading..</MenuItem>
                                                                    :
                                                                    availableAges.map((age) => {
                                                                        return <MenuItem
                                                                            value={age._id}>{age.number_with_name}</MenuItem>
                                                                    })}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className="weight-container">
                                                    <FormControl>
                                                        <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                                        <Select
                                                            className={classes.selectStylesAge}
                                                            IconComponent={ExpandMoreRoundedIcon}
                                                            value={values.animalWeight}
                                                            label="Waga"
                                                            name={"animalWeight"}
                                                            onChange={handleChange}
                                                        >
                                                            {
                                                                availableWeights.length === 0 ?
                                                                    <MenuItem value="all">Loading..</MenuItem>
                                                                    :
                                                                    availableWeights.map((weight) => {
                                                                        return <MenuItem
                                                                            value={weight._id}>{weight.number}</MenuItem>
                                                                    })}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>

                                            <div className="shop-form-third-row">
                                                <button className="btn-search-shop-form">
                                                    SZUKAJ
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="shop-form-fourth-row">
                                        <img alt="cat 2" src={animal.firstBottom}
                                             className="shop-form-fourth-row-left-img"/>
                                        <img alt="cat 3" src={animal.secondBottom}
                                             className="shop-form-fourth-row-right-img"/>
                                    </div>
                                </div>
                            )
                        }
                    }
                )
            }
        </>
    );
};

export default ShopForm;
