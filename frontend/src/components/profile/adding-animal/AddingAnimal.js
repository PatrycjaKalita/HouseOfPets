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
        email: '',
        phone_number: '',
        image: '',
        buttonText: 'Dodaj zwierzątko'
    })

    /*link jakoś samo żeby się generowało i było by fajnie*/
    const [valueSelect, setValueSelect] = useState({
        category: '',
        typeOfAnimal: '',
        breed: '',
        age: '',
        aWeight: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setValueSelect({...valueSelect, [name]: value})
    }

    useEffect(() => {
        loadAnimalDetils();
    }, []);

    const token = getCookie('token');

    const [availableAnimalDetails, setAvailableAnimalDetails] = useState(false);

    const loadAnimalDetils = () => {
        axios({
            method: 'GET',
            /*url: `${process.env.REACT_APP_API}/adding/product`,*/
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Wyswietlanie zwierzat i kategori', response.data.availableAnimalDetails);
                setAvailableAnimalDetails(response.data.availableAnimalDetails);

                const nazwa = response.data.availableAnimalDetails.animals.map((animal) => {
                    return animal?.typeofanimal[0].name
                });
                console.log([...new Set(nazwa)], "ciap ciap")
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/');
                    })
                }
            });
    };

    const {
        link,
        name,
        address,
        short_description,
        email,
        phone_number,
        image,
        buttonText
    } = values

    const handleChangeText = (name) => (event) => {
        console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }

    /*co z tym dalej?*/
    const createProductLink = () => {
        let tmp = lowerLetters(values.name)
        console.log(tmp.replace(' ', '-'))
        setValues({...values, [link]: tmp.replace(' ', '-')})
    }

    function lowerLetters(string) {
        return string.toLowerCase();
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            /* url: `${process.env.REACT_APP_API}/adding/product`,*/
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                link,
                name,
                address,
                short_description,
                email,
                phone_number,
                image,
            }
        }).then(response => {
            console.log('Produkt dodany', response);
            setValues({
                ...values,
                link,
                name,
                address,
                short_description,
                email,
                phone_number,
                image,
                buttonText: 'Dodano zwierzątko'
            })
            toast.success('Zwierzątko dodany');
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
                            <TextField
                                onChange={handleChangeText('name')}
                                value={name}
                                label="Imię"
                                variant="outlined"
                                className={classes.textFieldName}
                                fullWidth
                            />

                            <div className="AP-base-info-second-part">
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
                                            availableAnimalDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAnimalDetails.animals.map((animal) => {
                                                    /*console.log(animal?.typeofanimal[0]?.name);*/
                                                    return <MenuItem
                                                        value={animal?.typeofanimal[0]?._id}>{animal?.typeofanimal[0]?.name}</MenuItem>
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
                                            availableAnimalDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAnimalDetails.animals.map((animal) => {
                                                    return <MenuItem
                                                        value={animal?.breeds[0]?._id}>{animal?.breeds[0]?.name}</MenuItem>
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
                                            availableAnimalDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAnimalDetails.animals.map((animal) => {
                                                    return <MenuItem
                                                        value={animal?.age[0]?._id}>{animal?.age[0]?.number_with_name}</MenuItem>
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
                                            availableAnimalDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableAnimalDetails.animals.map((animal) => {
                                                    return <MenuItem
                                                        value={animal?.weight[0]?._id}>{animal?.weight[0]?.number}</MenuItem>
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
