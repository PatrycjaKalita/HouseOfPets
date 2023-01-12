import React, {useState, useEffect} from 'react';
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

    const [startDate, setStartDate] = useState(null);

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
        category: '',
        product_code: '',
        buttonText: 'Dodaj produkt'
    })

    /*link i product_code jakoś samo żeby się generowało i było by fajnie*/
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
        loadProduct();
    }, []);

    const token = getCookie('token');

    const [availableProductDetails, setAvailableProductDetails] = useState(false);

    const loadProduct = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/adding/product`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Wyswietlanie zwierzat i kategori', response.data.availableProductDetails);
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
        producer,
        price,
        amount,
        expiration_date,
        weight,
        color,
        image,
        category,
        product_code,
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
                category,
                product_code,
            }
        }).then(response => {
            console.log('Produkt dodany', response);
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
                category,
                product_code,
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
                                        onChange={handleChange}
                                    >
                                        {
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.categories.map((category, index) => {
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
                                        onChange={handleChange}
                                    >
                                        {
                                            availableProductDetails === false ?
                                                <MenuItem value="all">Loading..</MenuItem>
                                                :
                                                availableProductDetails.animals.map((animal) => {
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
                                fullWidth
                                rows={2}
                                className={classes.textFieldName}
                            />
                        </div>

                        <div className="AP-image-upload-desc">
                            {!isUploadedImage ? (
                                <>
                                    <label htmlFor="upload-input-desc">
                                    <span className="AP-camera-icon">
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
                                label="Białko surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Tłuszcze surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Popiół surowy"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
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
                                label="Białko surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Tłuszcze surowe"
                                variant="outlined"
                                className={classes.textFieldExtraInfo}
                            />

                            <TextField
                                label="Popiół surowy"
                                variant="outlined"
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
