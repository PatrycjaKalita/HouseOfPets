import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {useHistory} from "react-router-dom";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import {useStyles} from "../adding-product/MUIStyle";
import {getCookie, signOut} from "../../../auth/Helpers";

import './Style.css'
import axios from "axios";
import {toast} from "react-toastify";
import MenuItem from "@mui/material/MenuItem";

const AddingProductsSets = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const [picture, setPicture] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setPicture(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const [values, setValues] = useState({
        link: '',
        name: '',
        price: '',
        image: '',
        set_code: '',
        amount: '',
        sale: '',
    })

    const [valueSelect, setValueSelect] = useState({
        typeOfAnimal: '',
        breed: '',
        age: '',
        aWeight: '',
        product1: '',
        product2: '',
        product3: '',
        product4: '',
        product5: '',
        product6: ''
    });

    useEffect(() => {
        loadTypesOfAnimals();
        loadProductsList();
    }, []);

    const token = getCookie('token');

    const [availableProductsList, setAvailableProductsList] = useState(false);
    const loadProductsList = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/products-list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductsList(response.data.availableProductsList);
                console.log(response.data.availableProductsList)
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

    const [availableTypesOfAnimals, setAvailableTypesOfAnimals] = useState(false);
    const loadTypesOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product/animalType`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableTypesOfAnimals(response.data.availableAnimalTypes);
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

    let idTypeOfAnimalSelect;
    function handleBreedsChange(e) {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idTypeOfAnimalSelect = e.target.value
        if (availableTypesOfAnimals !== false) {
            loadBreedsOfAnimals()
        }
    }

    const [availableBreedsOfAnimals, setAvailableBreedsOfAnimals] = useState([]);
    const loadBreedsOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product/breed?id=${idTypeOfAnimalSelect}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableBreedsOfAnimals(response.data.availableAnimalBreeds.breeds);
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

    let idBreedOfAnimalSelect;
    function handleAgesChange(e) {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idBreedOfAnimalSelect = e.target.value
        if (availableBreedsOfAnimals !== 0) {
            loadAgesOfAnimals()
        }
    }

    const [availableAgesOfAnimals, setAvailableAgesOfAnimals] = useState([]);
    const loadAgesOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product/age?id=${idBreedOfAnimalSelect}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAgesOfAnimals(response.data.availableAnimalAges.ages);
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

    let idAgeOfAnimalSelect;
    function handleWeightsChange(e) {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idAgeOfAnimalSelect = e.target.value
        if (availableAgesOfAnimals !== 0) {
            loadWeightsOfAnimals()
        }
    }

    const [availableWeightsOfAnimals, setAvailableWeightsOfAnimals] = useState([]);
    const loadWeightsOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product/weight?id=${idAgeOfAnimalSelect}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableWeightsOfAnimals(response.data.availableAnimalWeights.weights);
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

    // eslint-disable-next-line no-unused-vars
    let idWeightOfAnimalSelect
    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idWeightOfAnimalSelect = e.target.value
    }

    const handleChangeProduct = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
    }

    let {
        link,
        name,
        price,
        image,
        set_code,
        amount,
        sale,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
        category_id,
        products_id
    } = values

    type_of_pets_id = valueSelect.typeOfAnimal
    breed_id = valueSelect.breed
    age_id = valueSelect.age
    weight_id = valueSelect.aWeight
    category_id = '63cc3e194c6402d09b507b67'

    const handleChangeText = (name) => (event) => {
        console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }

    function generateLink() {
        let typ;
        if (type_of_pets_id === '63bee7531312a763a0629bfb') {
            typ = 'koty'
        } else if (type_of_pets_id === '63bee7531312a763a0629bfc') {
            typ = 'psy'
        } else if (type_of_pets_id === '63bee7531312a763a0629bfd') {
            typ = 'male-zwierzatka'
        }
        let removeSpaceInName = name.replaceAll(" ", "-")
        let customLink = "/shop/" + typ + '/productsset/zestawy/' + lowerLetters(removeSpaceInName)
        link = customLink.replaceAll(",", "")
    }

    function lowerLetters(string) {
        return string.toLowerCase();
    }

    set_code = Math.floor(Math.random() * (999999999 - 100000)) + 100000
    image = picture
    sale = 0

    products_id = []

    if(valueSelect.product1 !== ''){
        products_id.push(valueSelect.product1)
    }
    if(valueSelect.product2 !== ''){
        products_id.push(valueSelect.product2)
    }
    if(valueSelect.product3 !== ''){
        products_id.push(valueSelect.product3)
    }
    if(valueSelect.product4 !== ''){
        products_id.push(valueSelect.product4)
    }
    if(valueSelect.product5 !== ''){
        products_id.push(valueSelect.product5)
    }
    if(valueSelect.product6 !== ''){
        products_id.push(valueSelect.product6)
    }

    const clickSubmit = event => {
        generateLink()
        event.preventDefault()
        setValues({...values})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/adding/products-set`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                link,
                name,
                set_code,
                price,
                amount,
                image,
                sale,
                category_id,
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id,
                products_id,
            }
        }).then(response => {
            history.push('/profil/pracownik/zestawy-produktow')

        }).catch(error => {
            setValues({...values})
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="main-LOPS-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOPS-container">
                <h1 className="APS-title">Dodanie nowego zestawu produktów</h1>

                <form>
                    <div className="AP-FORM-base-info">

                        <div className="AP-image-upload">
                            {!isUploaded ? (
                                <>
                                    <label htmlFor="upload-input">
                                    <span className="AP-camera-icon" onChange={handleImageChange}>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                        <p className="AP-upload-image-label">Dodaj zdjęcie zestawu</p>
                                    </label>

                                    <input
                                        id="upload-input"
                                        className="AP-add-image-input"
                                        type="file"
                                        accept=".jpg,.jpeg,.gif,.png,.svg"
                                        onChange={handleImageChange}
                                    />
                                </>
                            ) : (
                                <div className="AP-image-preview">
                                    <span className="AP-close-icon" onClick={() => {
                                        setIsUploaded(false);
                                        setPicture(null);
                                    }}>
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>

                                    <img
                                        className="AP-uploaded-image"
                                        src={picture}
                                        draggable={false}
                                        alt="uploaded-img"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="AP-base-info-part">
                            <div className="APS-first-row-base-info gap-x-12">
                                <TextField
                                    onChange={handleChangeText('name')}
                                    label="Nazwa zestawu"
                                    value={name}
                                    variant="outlined"
                                    className={classes.textFieldAP}
                                />

                                <TextField
                                    onChange={handleChangeText('price')}
                                    value={price}
                                    label="Cena"
                                    variant="outlined"
                                    className={classes.textFieldAP}
                                />
                            </div>
                            <div className="flex mt-15">
                                <TextField
                                onChange={handleChangeText('amount')}
                                label="Ilość zestawu"
                                variant="outlined"
                                value={amount}
                                className={classes.textFieldAP}
                            />
                            </div>

                            <div className="AP-base-info-second-part">
                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rodzaj zwierzęcia</InputLabel>
                                    <Select
                                        className={classes.selectStylesProducts}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.typeOfAnimal}
                                        label="Rodzaj zwierzęcia"
                                        name={"typeOfAnimal"}
                                        onChange={handleBreedsChange}
                                    >
                                        {
                                            availableTypesOfAnimals.hasOwnProperty('animalTypes') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableTypesOfAnimals.animalTypes.map((type) => {
                                                    return <MenuItem value={type._id}>{type.name}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rasa</InputLabel>
                                    <Select
                                        className={classes.selectStylesProducts}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.breed}
                                        label="Rasa"
                                        name={"breed"}
                                        onChange={handleAgesChange}
                                    >
                                        {
                                            availableBreedsOfAnimals.length === 0 ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableBreedsOfAnimals.map((breed) => {
                                                    return <MenuItem
                                                        value={breed._id}>{breed.name}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Wiek</InputLabel>
                                    <Select
                                        className={classes.selectStylesAW}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.age}
                                        label="Wiek"
                                        name={"age"}
                                        onChange={handleWeightsChange}
                                        >
                                        {
                                            availableAgesOfAnimals.length === 0 ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAgesOfAnimals.map((age) => {
                                                    return <MenuItem
                                                        value={age._id}>{age.number_with_name}</MenuItem>
                                                })
                                        }
                                </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                    <Select
                                        className={classes.selectStylesAW}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.aWeight}
                                        label="Waga"
                                        name={"aWeight"}
                                        onChange={handleChange}
                                    >
                                        {
                                            availableWeightsOfAnimals.length === 0 ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableWeightsOfAnimals.map((weight) => {
                                                    return <MenuItem
                                                        value={weight._id}>{weight.number}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="AP-dosage-container">
                        <h1 className="AP-title-of-section-ac">Dodaj produkty</h1>
                        <p className="AP-title-of-section-ac-desc">Zestaw musi zawierać minimum 2 produkty. Maksymalnie
                            może zawierać do 6 produktów. </p>

                        <div className="APS-products-in-set">
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr1</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr1"
                                    value={valueSelect.product1}
                                    name={"product1"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr2</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr2"
                                    value={valueSelect.product2}
                                    name={"product2"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr3</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr3"
                                    value={valueSelect.product3}
                                    name={"product3"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr4</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr4"
                                    value={valueSelect.product4}
                                    name={"product4"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr5</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr5"
                                    value={valueSelect.product5}
                                    name={"product5"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr6</InputLabel>
                                <Select
                                    className={classes.selectStyles300}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr6"
                                    value={valueSelect.product6}
                                    name={"product6"}
                                    onChange={handleChangeProduct}
                                >
                                    {
                                        availableProductsList.hasOwnProperty('product') === false ?
                                            <MenuItem value="all">Loading..</MenuItem>
                                            :
                                            availableProductsList.product.map((item) => {
                                                return <MenuItem
                                                    value={item._id}>{item.name}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>


                    <div className="APS-form-btn-container">
                        <button className="APS-form-btn" onClick={clickSubmit}>Dodaj zestaw</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddingProductsSets;
