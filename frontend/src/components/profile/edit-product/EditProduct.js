import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {getCookie, signOut} from "../../../auth/Helpers";
import {useHistory} from "react-router-dom";
import {useStyles} from "../adding-product/MUIStyle";
import EditProductDetails from "./edit-product-details/EditProductDetails";
import axios from "axios";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";

const EditProduct = (props) => {
    const token = getCookie('token');
    const history = useHistory()
    const classes = useStyles()
    let id = window.location.href.replace('http://localhost:3000/profil/pracownik/produkty/edycja/', '')

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
        name: '',
        producer: '',
        price: '',
        amount: '',
        expiration_date: '',
        weight: '',
        color: '',
        image: '',
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

    // eslint-disable-next-line no-unused-vars
    let idWeightOfAnimalSelect
    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
        idWeightOfAnimalSelect = e.target.value
    }

    let {
        name,
        producer,
        price,
        amount,
        expiration_date,
        weight,
        color,
        image,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
        category_id,
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
    } = values

    const handleChangeText = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }
    const [startDate, setStartDate] = useState(null);
    expiration_date = startDate

    category_id = valueSelect.category
    type_of_pets_id = valueSelect.typeOfAnimal
    breed_id = valueSelect.breed
    age_id = valueSelect.age
    weight_id = valueSelect.aWeight
    image = picture

    const clickEditButton = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/product-detail`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                name,
                producer,
                price,
                amount,
                expiration_date,
                weight,
                color,
                image,
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
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id,
            }
        }).then(response => {
            history.push('/profil/pracownik/produkty')

        }).catch(error => {
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="w-4/5 mt-50 mb-100 mx-auto flex">
            <ProfileNavigation choose={props.choose}/>

            <div className="w-4/5">
                <h1 className="mb-35 font-semibold">Edycja produktu</h1>
                <EditProductDetails productId={id} />

                <h1 className="mb-15 font-semibold">Formularz</h1>

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
                                    className={classes.textFieldAP}
                                />

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Kategoria</InputLabel>
                                    <Select
                                        className={classes.selectStylesProducts}
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
                                className={classes.textFieldExtraInfoAP}
                            />

                            <TextField
                                value={fat}
                                onChange={handleChangeText('fat')}
                                label="Tłuszcze surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfoAP}
                            />

                            <TextField
                                value={ash}
                                onChange={handleChangeText('ash')}
                                label="Popiół surowy"
                                variant="outlined"
                                className={classes.textFieldExtraInfoAP}
                            />

                            <TextField
                                value={fiber}
                                onChange={handleChangeText('fiber')}
                                label="Włókno surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfoAP}
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
                        <button className="AP-form-btn" onClick={clickEditButton}>Aktualizuj produkt</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
