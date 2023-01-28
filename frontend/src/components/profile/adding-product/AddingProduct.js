import React, {useEffect, useState} from 'react';
import './Style.css'
import {useStyles} from './MUIStyle'

import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {toast, ToastContainer} from "react-toastify";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {getCookie, signOut} from "../../../auth/Helpers";
import {useHistory} from "react-router-dom";

const AddingProduct = (props) => {
    const history = useHistory()
    const classes = useStyles()

    /*Product Image*/
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

    /*Description Image*/
    const [imageDesc, setImageDesc] = useState("");
    const [isUploadedImage, setIsUploadedImage] = useState(false);

    function handleImageDescChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImageDesc(e.target.result);
                setIsUploadedImage(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const [values, setValues] = useState({
        link: '',
        name: '',
        producer: '',
        price: '',
        amount: '',
        expiration_date: '',
        weight: '',
        color: '',
        image: '',
        product_code: '',
        description: '',
        extra_description: '',
        image_description: '',
        composition: '',
        additives: '',
        protein: '',
        fat: '',
        ash: '',
        fiber: '',
        body_weight: '',
        moderate_needs: '',
        low_needs: '',
        buttonText: 'Dodaj produkt'
    })

    const [valueSelect, setValueSelect] = useState({
        category: '',
        typeOfAnimal: '',
        breed: '',
        age: '',
        aWeight: '',
    });

    useEffect(() => {
        loadProductDetails();
        loadTypesOfAnimals();
    }, []);

    const token = getCookie('token');
    const [availableProductDetails, setAvailableProductDetails] = useState(false);
    const loadProductDetails = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableProductDetails(response.data.availableProductDetails);
                /*console.log(response.data.availableProductDetails.animals)*/
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

    let idCategory
    const handleCategoryChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idCategory = e.target.value
    }

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
        /*console.log(availableProductDetails.animals.map((animal) => animal.type_of_pets_id === idTypeOfAnimalSelect))*/
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
        /*console.log(availableProductDetails.animals.map((animal) => animal.type_of_pets_id === idTypeOfAnimalSelect || animal.breed_id === idBreedOfAnimalSelect))*/
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
        /*console.log(availableProductDetails.animals.map((animal) => animal.type_of_pets_id === idTypeOfAnimalSelect || animal.breed_id === idBreedOfAnimalSelect || animal.age_id === idAgeOfAnimalSelect))*/
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

    let idWeightOfAnimalSelect

    let typeOfPetsId = valueSelect.typeOfAnimal
    let breedId = valueSelect.breed
    let ageId = valueSelect.age
    let weightId = valueSelect.aWeight

    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})

        idWeightOfAnimalSelect = e.target.value
    }

    let {
        link,
        name,
        producer,
        price,
        amount,
        expiration_date,
        weight,
        color,
        image,
        animal_id,
        category_id,
        product_code,
        description,
        extra_description,
        sale,
        image_description,
        composition,
        additives,
        protein,
        fat,
        ash,
        fiber,
        body_weight,
        moderate_needs,
        low_needs,
        type_of_animal_name,
        buttonText
    } = values

    const handleChangeText = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }
    category_id = valueSelect.category

    function generateLink(idCategory) {
        let typ;
        if (typeOfPetsId === '63bee7531312a763a0629bfb') {
            typ = 'koty'
        } else if (typeOfPetsId === '63bee7531312a763a0629bfc') {
            typ = 'psy'
        } else if (typeOfPetsId === '63bee7531312a763a0629bfd') {
            typ = 'male-zwierzatka'
        }
        let categoryNameArray = availableProductDetails.categories.map((category) => {
                return (category._id === idCategory) ? category.link : ''
            }
        )
        let removeSpaceInName = name.replaceAll(" ", "-")
        let customLink = "/shop/" + typ + "/products/" + categoryNameArray + '/' + lowerLetters(removeSpaceInName)

        link = customLink.replaceAll(",", "")
    }

    function lowerLetters(string) {
        return string.toLowerCase();
    }

    product_code = Math.floor(Math.random() * (999999999 - 100000) ) + 100000

    /*Dodawanie daty*/
    const [startDate, setStartDate] = useState(null);
    expiration_date = startDate

    /*Dodanie zdjęć*/
    image = picture

    /*Promocje*/
    sale = 0

    const clickSubmit = event => {
        generateLink(idCategory)
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/adding/product`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                link,
                name,
                producer,
                price,
                amount,
                expiration_date,
                weight,
                color,
                image,
                sale,
                product_code,
                description,
                extra_description,
                image_description,
                composition,
                additives,
                protein,
                fat,
                ash,
                fiber,
                body_weight,
                moderate_needs,
                low_needs,
                category_id,
                animal_id,
                type_of_animal_name,
            }
        }).then(response => {
            setValues({
                ...values,
                link,
                name,
                producer,
                price,
                amount,
                expiration_date,
                weight,
                color,
                image,
                animal_id,
                category_id,
                product_code,
                description,
                sale,
                extra_description,
                image_description,
                composition,
                additives,
                protein,
                fat,
                ash,
                fiber,
                body_weight,
                moderate_needs,
                low_needs,
                type_of_animal_name,
                buttonText: 'Dodano produkt'
            })
            toast.success('Produkt dodany');

        }).catch(error => {
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="main-AP-container">
            <ProfileNavigation choose={props.choose}/>
            <ToastContainer/>

            <div className="AP-container">
                <h1 className="AP-title">Dodanie nowego produktu</h1>

                <form>
                    <div className="AP-FORM-base-info">

                        <div className="AP-image-upload">
                            {!isUploaded ? (
                                <>
                                    <label htmlFor="upload-input">
                                    <span className="AP-camera-icon" onChange={handleImageChange}>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                        <p className="AP-upload-image-label">Dodaj zdjęcie produktu</p>
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
                            <TextField
                                onChange={handleChangeText('name')}
                                value={name}
                                label="Nazwa produktu"
                                variant="outlined"
                                className={classes.textFieldName}
                                fullWidth
                            />

                            <div className="AP-base-info-second-part">
                                <TextField
                                    onChange={handleChangeText('producer')}
                                    value={producer}
                                    label="Producent"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Kategoria</InputLabel>
                                    <Select
                                        className={classes.selectStylesCategories}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.category}
                                        label="Kategoria"
                                        name={"category"}
                                        onChange={handleCategoryChange}
                                    >
                                        {
                                            availableProductDetails.hasOwnProperty('categories') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.categories.map((category) => {
                                                    return <MenuItem value={category._id}>{category.name}</MenuItem>
                                                })}
                                    </Select>
                                </FormControl>


                                <TextField
                                    onChange={handleChangeText('amount')}
                                    value={amount}
                                    label="Ilość"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <TextField
                                    onChange={handleChangeText('price')}
                                    value={price}
                                    label="Cena"
                                    variant="outlined"
                                    className={classes.textField}
                                />
                            </div>


                            <div className="AP-base-info-second-part">
                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rodzaj zwierzęcia</InputLabel>
                                    <Select
                                        className={classes.selectStylesCategories}
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
                                        className={classes.selectStylesCategories}
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
                    <div className="AP-extra-info-container">
                        <h1 className="AP-title-of-section">Dodatkowe informacje (wypełnić odpowiednie pola)</h1>

                        <div className="AP-extra-info-inputs">
                            <DatePicker
                                onChange={(date: Date) => setStartDate(date)}
                                className="date-picker focus:ring-0 outline-[#8D451D]"
                                isClearable
                                dateFormat='dd/MM/yyyy'
                                selected={startDate}

                                placeholderText="Data ważności"
                            />

                            <div className="AP-extra-info-weight-info">
                                <TextField
                                    onChange={handleChangeText('weight')}
                                    value={weight}
                                    label="Waga"
                                    variant="outlined"
                                    className={classes.textFieldExtraInfo}
                                />
                            </div>

                            <TextField
                                onChange={handleChangeText('color')}
                                value={color}
                                label="Kolor"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="AP-title-of-section">Opis produktu</h1>

                        <TextField
                            label="Opis"
                            value={description}
                            onChange={handleChangeText('description')}
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                            className={classes.textFieldName}
                        />
                        <div className="AP-description-extra">
                            <TextField
                                label="Dodatkowy opis"
                                variant="outlined"
                                multiline
                                value={extra_description}
                                onChange={handleChangeText('extra_description')}
                                fullWidth
                                rows={2}
                                className={classes.textFieldName}
                            />
                        </div>

                        <div className="AP-image-upload-desc">
                            {!isUploadedImage ? (
                                <>
                                    <label htmlFor="upload-input-desc">
                                    <span className="AP-camera-icon" onChange={handleImageDescChange}>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                        <p className="AP-upload-image-label">Dodaj zdjęcie opisu</p>
                                    </label>

                                    <input
                                        id="upload-input-desc"
                                        className="AP-add-image-input"
                                        type="file"
                                        accept=".jpg,.jpeg,.gif,.png,.svg"
                                        onChange={handleImageDescChange}
                                    />
                                </>
                            ) : (
                                <div className="AP-image-preview">
                                    <span className="AP-close-icon" onClick={() => {
                                        setIsUploadedImage(false);
                                        setImageDesc(null);
                                    }}>
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>

                                    <img
                                        className="AP-uploaded-image"
                                        src={imageDesc}
                                        draggable={false}
                                        alt="uploaded-img"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="AP-composition-container">
                        <h1 className="AP-title-of-section">Skład produktu</h1>

                        <TextField
                            label="Skład"
                            variant="outlined"
                            multiline
                            value={composition}
                            onChange={handleChangeText('composition')}
                            fullWidth
                            rows={4}
                            className={classes.textFieldName}
                        />
                        <div className="AP-composition-extra">
                            <TextField
                                label="Dodatki (w składzie)"
                                variant="outlined"
                                multiline
                                fullWidth
                                value={additives}
                                onChange={handleChangeText('additives')}
                                rows={3}
                                className={classes.textFieldName}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="AP-title-of-section-ac">Składniki analityczne produktu</h1>
                        <p className="AP-title-of-section-ac-desc">Jeśli w produkcie występują składniki analityczne, to
                            należy uzupełnić znajdujące się poniżej pola. </p>

                        <div className="AP-AC-inputs">
                            <TextField
                                value={protein}
                                onChange={handleChangeText('protein')}
                                label="Białko surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                value={fat}
                                onChange={handleChangeText('fat')}
                                label="Tłuszcze surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                value={ash}
                                onChange={handleChangeText('ash')}
                                label="Popiół surowy"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                value={fiber}
                                onChange={handleChangeText('fiber')}
                                label="Włókno surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />
                        </div>
                    </div>

                    <div className="AP-dosage-container">
                        <h1 className="AP-title-of-section-ac">Dawkowanie produktu</h1>
                        <p className="AP-title-of-section-ac-desc">Jeśli w produkcie jest opisane dawkowanie, to należy
                            uzupełnić znajdujące się poniżej pola. </p>

                        <div className="AP-dosage-inputs">
                            <TextField
                                label="Masa ciała"
                                variant="outlined"
                                onChange={handleChangeText('body_weight')}
                                value={body_weight}
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Umiarkowane potrzeby"
                                variant="outlined"
                                onChange={handleChangeText('moderate_needs')}
                                value={moderate_needs}
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Niskie potrzeby"
                                variant="outlined"
                                onChange={handleChangeText('low_needs')}
                                value={low_needs}
                                className={classes.textFieldExtraInfo}
                            />
                        </div>
                    </div>
                    <div className="AP-form-btn-container">
                        <button className="AP-form-btn" onClick={clickSubmit}>{buttonText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddingProduct;
