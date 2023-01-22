import React, {useEffect, useState} from 'react';
import './Style.css'
import {useStyles} from "../adding-product/MUIStyle";

import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {useHistory} from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";
import {toast} from "react-toastify";

const AddingAnimal = (props) => {
    const history = useHistory()
    const classes = useStyles()

    const [isUploaded, setIsUploaded] = useState(false);
    const [picture, setPicture] = useState("");

    function handlePictureChange(e) {
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
        address: '',
        short_description: '',
        sex: '',
        email: '',
        phone_number: '',
        image: '',
        buttonText: 'Dodaj zwierzątko'
    })

    const [valueSelect, setValueSelect] = useState({
        typeOfAnimal: '',
        breed: '',
        age: '',
        weight: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
    }

    useEffect(() => {
        loadTypesOfAnimals();
        loadBreedsOfAnimals();
        loadAgesOfAnimals();
        loadWeightsOfAnimals();
    }, []);

    const token = getCookie('token');
    const [availableTypesOfAnimals, setAvailableTypesOfAnimals] = useState(false);
    const loadTypesOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/animalForAdoption/animalType`,
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

    const [availableBreedsOfAnimals, setAvailableBreedsOfAnimals] = useState(false);
    const loadBreedsOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/animalForAdoption/breed`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableBreedsOfAnimals(response.data.availableAnimalBreeds);
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

    const [availableAgesOfAnimals, setAvailableAgesOfAnimals] = useState(false);
    const loadAgesOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/animalForAdoption/age`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableAgesOfAnimals(response.data.availableAnimalAges);
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

    const [availableWeightsOfAnimals, setAvailableWeightsOfAnimals] = useState(false);
    const loadWeightsOfAnimals = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/animalForAdoption/weight`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableWeightsOfAnimals(response.data.availableAnimalWeights);
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

    let {
        link,
        name,
        address,
        short_description,
        added_to_adoption_date,
        email,
        phone_number,
        image,
        sex,
        type_of_pets_id,
        breed_id,
        age_id,
        weight_id,
        buttonText
    } = values

    const handleChangeText = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    image = picture
    type_of_pets_id = valueSelect.typeOfAnimal
    breed_id = valueSelect.breed
    age_id = valueSelect.age
    weight_id = valueSelect.weight

    function generateLinkForAnimal() {
        let typ;
        if (type_of_pets_id === '63bee7531312a763a0629bfb') {
            typ = 'koty'
        } else if (type_of_pets_id === '63bee7531312a763a0629bfc') {
            typ = 'psy'
        } else if (type_of_pets_id === '63bee7531312a763a0629bfd') {
            typ = 'male-zwierzatka'
        }
        link = "/adopcja/" + typ + "/" + name
    }

    /*Data dodania zwierzątka do adopcji*/
    let date = new Date().toJSON();
    added_to_adoption_date = date;

    const clickSubmit = event => {
        generateLinkForAnimal()
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/adding/animalForAdoption`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                link,
                name,
                address,
                short_description,
                added_to_adoption_date,
                email,
                phone_number,
                image,
                sex,
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id
            }
        }).then(response => {
            setValues({
                ...values,
                link,
                name,
                address,
                short_description,
                added_to_adoption_date,
                email,
                sex,
                phone_number,
                image,
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id,
                buttonText: 'Dodano zwierzątko'
            })
            history.push('/profil/pracownik/zwierzeta')
        }).catch(error => {
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="main-AA-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="AA-container">
                <h1 className="AA-title">Dodanie zwierzątka do adopcji</h1>

                <form>
                    <div className="AP-FORM-base-info">
                        <div className="AP-image-upload">
                            {!isUploaded ? (
                                <>
                                    <label htmlFor="upload-input">
                                    <span className="AP-camera-icon" onChange={handlePictureChange}>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                        <p className="AP-upload-image-label">Dodaj zdjęcie zwierzaka</p>
                                    </label>

                                    <input
                                        id="upload-input"
                                        className="AP-add-image-input"
                                        type="file"
                                        accept=".jpg,.jpeg,.gif,.png,.svg"
                                        onChange={handlePictureChange}
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
                            <div className="AA-base-info">
                                <TextField
                                    onChange={handleChangeText('name')}
                                    value={name}
                                    label="Imię"
                                    variant="outlined"
                                    className={classes.textField}
                                />
                                <TextField
                                    onChange={handleChangeText('sex')}
                                    value={sex}
                                    label="Płeć"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rodzaj zwierzęcia</InputLabel>
                                    <Select
                                        className={classes.selectStylesCategories}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.typeOfAnimal}
                                        label="Rodzaj zwierzęcia"
                                        name={"typeOfAnimal"}
                                        onChange={handleChange}
                                    >
                                        {
                                            availableTypesOfAnimals.hasOwnProperty('animalTypes') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableTypesOfAnimals.animalTypes.map((types) => {
                                                    return <MenuItem value={types._id}>{types.name}</MenuItem>
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
                                        onChange={handleChange}
                                    >
                                        {
                                            availableBreedsOfAnimals.hasOwnProperty('animalBreeds') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableBreedsOfAnimals.animalBreeds.map((breeds) => {
                                                    return <MenuItem
                                                        value={breeds._id}>{breeds.name}</MenuItem>
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
                                        onChange={handleChange}
                                    >
                                        {
                                            availableAgesOfAnimals.hasOwnProperty('animalAges') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAgesOfAnimals.animalAges.map((ages) => {
                                                    return <MenuItem
                                                        value={ages._id}>{ages.number_with_name}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                    <Select
                                        className={classes.selectStylesAW}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueSelect.weight}
                                        label="Waga"
                                        name={"weight"}
                                        onChange={handleChange}
                                    >
                                        {
                                            availableWeightsOfAnimals.hasOwnProperty('animalWeights') === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableWeightsOfAnimals.animalWeights.map((weights) => {
                                                    return <MenuItem
                                                        value={weights._id}>{weights.number}</MenuItem>
                                                })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="AA-info-container">
                        <TextField
                            onChange={handleChangeText('short_description')}
                            value={short_description}
                            label="Krótki opis zwierzęcia"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                            className={classes.textFieldName}
                        />
                    </div>

                    <div className="AA-caretaker-container">
                        <h1 className="AP-title-of-section-ac">Dane opiekuna</h1>

                        <div className="AA-dosage-inputs">
                            <TextField
                                label="Numer telefonu"
                                variant="outlined"
                                className={classes.textFieldCareTaker}
                                onChange={handleChangeText('phone_number')}
                                value={phone_number}
                            />
                            <TextField
                                label="Mail"
                                variant="outlined"
                                className={classes.textFieldCareTaker}
                                onChange={handleChangeText('email')}
                                value={email}
                            />
                        </div>
                        <TextField
                            label="Adres pobytu zwierzątka"
                            variant="outlined"
                            className={classes.textFieldAddress}
                            onChange={handleChangeText('address')}
                            value={address}
                        />
                    </div>
                    <div className="AP-form-btn-container">
                        <button className="AP-form-btn" onClick={clickSubmit}>{buttonText}</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddingAnimal;
