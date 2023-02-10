import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {useHistory} from "react-router-dom";
import {useStyles} from "../adding-product/MUIStyle";
import {getCookie, signOut, updateUser} from "../../../auth/Helpers";
import axios from "axios";
import {toast} from "react-toastify";

const EditAnimal = (props) => {
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        loadAnimalForEditing();
        loadTypesOfAnimals();
        loadBreedsOfAnimals();
        loadAgesOfAnimals();
        loadWeightsOfAnimals();
    }, []);

    //WYŚWIETLENIE DANYCH WYBRANEGO ZWIERZĄTKA DO EDYCJI
    const [getAnimalForEdit, setGetAnimalForEdit] = useState([]);
    const [getAnimalAge, setGetAnimalAge] = useState('');
    const [getAnimalBreed, setGetAnimalBreed] = useState('');
    const [getAnimalType, setGetAnimalType] = useState('');
    const [getAnimalWeight, setGetAnimalWeight] = useState('');
    const loadAnimalForEditing = () => {
        let animalID = window.location.href.replace('http://localhost:3000/profil/pracownik/zwierzeta/edycja/', '')
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/view/animal-for-editing?animalId=${animalID}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setGetAnimalForEdit(response.data.availableAnimalForEditing.animalForEditing[0]);
                //console.log(response.data.availableAnimalForEditing.animalForEditing)
                setGetAnimalType(response.data.availableAnimalForEditing.animalForEditing[0].typeofanimals[0].name)
                setGetAnimalBreed(response.data.availableAnimalForEditing.animalForEditing[0].breeds[0].name)
                setGetAnimalAge(response.data.availableAnimalForEditing.animalForEditing[0].ages[0].number_with_name)
                setGetAnimalWeight(response.data.availableAnimalForEditing.animalForEditing[0].weights[0].number)
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

    //AKTUALZACJA
    const [values, setValues] = useState({
        name: '',
        address: '',
        short_description: '',
        sex: '',
        email: '',
        phone_number: '',
        image: '',
        buttonText: 'Aktualizuj zwierzątko'
    })

    const [isUploaded, setIsUploaded] = useState(false);
    const [picture, setPicture] = useState('');

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
        name,
        address,
        short_description,
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

    const clickEditSubmit = event => {
        event.preventDefault()
        let id = getAnimalForEdit._id
        setValues({...values, buttonText: 'Aktualizacja'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/update/animal-for-adoption`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                name,
                address,
                short_description,
                email,
                phone_number,
                image,
                sex,
                type_of_pets_id,
                breed_id,
                age_id,
                weight_id,
            }
        }).then(response => {
            history.push('/profil/pracownik/zwierzeta')
        }).catch(error => {
            //console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
            setValues({...values, buttonText: 'Aktualizuj zwierzątko'})
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="w-4/5 mt-50 mb-100 mx-auto flex">
            <ProfileNavigation choose={props.choose}/>

            <div className="w-4/5">
                <h1 className="mb-35 font-semibold">Edycja zwierzątka</h1>
                <div className="mb-35">
                    <div className="flex mb-5">
                        <img
                            className="EA-image-upload"
                            src={getAnimalForEdit.image}
                            alt="uploaded-img"
                        />

                        <div className="grid grid-cols-4 ml-5">
                            <h1 className="text-right font-medium">Imię:</h1>
                            <h1 className="ml-3">{getAnimalForEdit.name}</h1>

                            <h1 className="text-right font-medium">Płeć:</h1>
                            <h1 className="ml-3">{getAnimalForEdit.sex}</h1>

                            <h1 className="text-right font-medium">Typ zwierzęcia:</h1>
                            <h1 className="ml-3">{getAnimalType}</h1>

                            <h1 className="text-right font-medium">Rasa:</h1>
                            <h1 className="ml-3">{getAnimalBreed}</h1>

                            <h1 className="text-right font-medium">Wiek:</h1>
                            <h1 className="ml-3">{getAnimalAge}</h1>

                            <h1 className="text-right font-medium">Waga:</h1>
                            <h1 className="ml-3">{getAnimalWeight}</h1>
                        </div>
                    </div>

                    <h1 className="font-medium">Opis zwierzątka:</h1>
                    <h1 className="mb-5">{getAnimalForEdit.short_description}</h1>

                    <div className="grid grid-cols-2 w-2/3">
                        <h1 className="font-medium w-100px">Numer telefonu opiekuna:</h1>
                        <h1 className="ml-3">{getAnimalForEdit.phone_number}</h1>

                        <h1 className="font-medium">Mail opiekuna:</h1>
                        <h1 className="ml-3">{getAnimalForEdit.email}</h1>

                        <h1 className="font-medium">Adres pobytu zwierzątka:</h1>
                        <h1 className="ml-3 w-auto">{getAnimalForEdit.address}</h1>
                    </div>
                </div>

                <form>
                    <div className="AP-FORM-base-info">
                        <div className="AP-image-upload">
                            {!isUploaded ? (
                                <>
                                    <label htmlFor="upload-input">
                                    <span className="AP-camera-icon" onChange={handlePictureChange}>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                        <p className="AP-upload-image-label">Zaktualizuj zdjęcie zwierzaka</p>
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
                            <div className="grid grid-cols-2 gap-y-9">
                                <TextField
                                    onChange={handleChangeText('name')}
                                    value={name}
                                    label="Imię"
                                    variant="outlined"
                                    className={classes.textField300}
                                />
                                <TextField
                                    onChange={handleChangeText('sex')}
                                    value={sex}
                                    label="Płeć"
                                    variant="outlined"
                                    className={classes.textField300}
                                />

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rodzaj zwierzęcia</InputLabel>
                                    <Select
                                        className={classes.selectStyles300}
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
                                        className={classes.selectStyles300}
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
                                        className={classes.selectStyles200}
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
                                        className={classes.selectStyles200}
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

                    <div className="my-50">
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

                    <div className="my-50">
                        <h1 className="AP-title-of-section-ac">Dane opiekuna</h1>

                        <div className="grid grid-cols-3 gap-x-80 mb-35">
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
                        <button className="AP-form-btn" onClick={clickEditSubmit}>{buttonText}</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditAnimal;
