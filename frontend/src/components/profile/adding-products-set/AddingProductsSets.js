import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {useHistory} from "react-router-dom";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";

import {useStyles} from "../adding-product/MUIStyle";
import {getCookie, signOut} from "../../../auth/Helpers";
import axios from "axios";

import './Style.css'

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
        buttonText: 'Dodaj produkt'
    })

    const [valueSelect, setValueSelect] = useState({
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
        loadAnimalsDetails();
    }, []);

    const token = getCookie('token');

    const [availableProductDetails, setAvailableProductDetails] = useState(false);

    const loadAnimalsDetails = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Wyswietlanie zwierzat', response.data.availableProductDetails);
                setAvailableProductDetails(response.data.availableProductDetails);

                const nazwa = response.data.availableProductDetails.animals.map((animal) => {
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
        price,
        image,
        buttonText
    } = values

    const handleChangeText = (name) => (event) => {
        console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = event => {

    }

    return (
        <div className="main-LOPS-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOPS-container">
                <h1 className="APS-title">Dodanie nowego zestawu produktów</h1>
                <p className="APS-description">Podaj nazwę zestawu i rodzaj zwierzęcia dla którego jest
                    komponowany ten zestaw. Cena zestawu nalicza się automatycznie. Zestawy
                    są tańsze o 10%, niż gdyby te produkty miał zostać kupione oddzielnie. </p>

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
                            <div className="APS-first-row-base-info">
                                <TextField
                                    onChange={handleChangeText('name')}
                                    value={name}
                                    label="Nazwa zestawu"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <div className="APS-price-container">
                                    <h1 className="APS-price-title">Cena:</h1>
                                    <h1 className="APS-price-value">18.80 zł</h1>
                                </div>
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
                                        onChange={handleChange}
                                    >
                                        {
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.animals.map((animal) => {
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
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.animals.map((animal) => {
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
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.animals.map((animal) => {
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
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.animals.map((animal) => {
                                                    return <MenuItem
                                                        value={animal?.weight[0]?._id}>{animal?.weight[0]?.number}</MenuItem>
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
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr1"
                                >
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr2</InputLabel>
                                <Select
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr2"
                                >
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr3</InputLabel>
                                <Select
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr3"
                                >
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr4</InputLabel>
                                <Select
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr4"
                                >
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr5</InputLabel>
                                <Select
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr5"
                                >
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Produkt nr6</InputLabel>
                                <Select
                                    className={classes.selectStylesProducts}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    label="Produkt nr6"
                                >
                                </Select>
                            </FormControl>
                        </div>
                    </div>


                    <div className="APS-form-btn-container">
                        <button className="APS-form-btn" onClick={clickSubmit}>{buttonText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddingProductsSets;
