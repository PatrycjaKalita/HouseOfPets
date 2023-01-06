import React, {useState} from 'react';

import './Style.css'
import {useStyles} from './MUIStyle'
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {ToastContainer} from "react-toastify";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
/*import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';*/


const AddingProduct = (props) => {
    const classes = useStyles();
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const [valueCategories, setValueCategories] = useState('');

    const handleChangeCategories = (e: SelectChangeEvent) => {
        setValueCategories(e.target.value);
    };

    const [valueTypesOfAnimals, setValueTypesOfAnimals] = useState('');

    const handleChangeTypesOfAnimals = (e: SelectChangeEvent) => {
        setValueTypesOfAnimals(e.target.value);
    };

    const [valueBreeds, setValueBreeds] = useState('');

    const handleChangeBreeds = (e: SelectChangeEvent) => {
        setValueBreeds(e.target.value);
    };

    const [valueAge, setValueAge] = useState('');

    const handleChangeAge = (e: SelectChangeEvent) => {
        setValueAge(e.target.value);
    };

    const [valueWeight, setValueWeight] = useState('');

    const handleChangeWeight = (e: SelectChangeEvent) => {
        setValueWeight(e.target.value);
    };

    /*const [dateValue, setDateValue] = useState<Date | null>(null);*/

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
                                        setImage(null);
                                    }}>
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>

                                    <img
                                        className="AP-uploaded-image"
                                        src={image}
                                        draggable={false}
                                        alt="uploaded-img"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="AP-base-info-part">
                            <TextField
                                label="Nazwa"
                                variant="outlined"
                                className={classes.textFieldName}
                                fullWidth
                            />

                            <div className="AP-base-info-second-part">
                                <TextField
                                    label="Producent"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Kategoria</InputLabel>
                                    <Select
                                        className={classes.selectStylesCategories}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueCategories}
                                        label="Kategoria"
                                        onChange={handleChangeCategories}
                                    >
                                        <MenuItem value="s_karma">Sucha karma</MenuItem>
                                        <MenuItem value="m_karma">Mokra karma</MenuItem>
                                        <MenuItem value="przysmaki">Przysmaki</MenuItem>
                                    </Select>
                                </FormControl>


                                <TextField
                                    label="Ilość"
                                    variant="outlined"
                                    className={classes.textField}
                                />

                                <TextField
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
                                        value={valueTypesOfAnimals}
                                        label="Rodzaj zwierzęcia"
                                        onChange={handleChangeTypesOfAnimals}
                                    >
                                        <MenuItem value="all">Pies</MenuItem>
                                        <MenuItem value="domowy">Kot</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Rasa</InputLabel>
                                    <Select
                                        className={classes.selectStylesCategories}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueBreeds}
                                        label="Rasa"
                                        onChange={handleChangeBreeds}
                                    >
                                        <MenuItem value="domowy">Domowy</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Wiek</InputLabel>
                                    <Select
                                        className={classes.selectStylesAW}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueAge}
                                        label="Wiek"
                                        onChange={handleChangeAge}
                                    >
                                        <MenuItem value="age1">1</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                    <Select
                                        className={classes.selectStylesAW}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueWeight}
                                        label="Waga"
                                        onChange={handleChangeWeight}
                                    >
                                        <MenuItem value="age1">1</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                     <div className="AP-extra-info-container">
                        <h1 className="AP-title-of-section">Dodatkowe informacje (wypełnić odpowiednie pola)</h1>

{/*                         <LocalizationProvider dateAdapter={AdapterDateFns}>
                         <DesktopDatePicker
                             label="Data ważności"
                             value={dateValue}
                             onChange={(newValue) => {
                                 setDateValue(newValue);
                             }}
                             renderInput={(params) => <TextField {...params} />}
\
                         />
                         </LocalizationProvider>*/}

                        <TextField
                            label="Waga"

                            variant="outlined"
                            className={classes.textFieldExtraInfo}
                        />

                        <TextField
                            label="Kolor"

                            variant="outlined"
                            className={classes.textFieldExtraInfo}
                        />
                    </div>
{/*
                    <div>
                        <h1>Opis produktu</h1>
                    </div>

                    <div>
                        <h1>Skład produktu</h1>
                    </div>

                    <div>
                        <h1>Składniki analityczne produktu</h1>
                    </div>

                    <div>
                        <h1>Dawkowanie produktu</h1>
                    </div>*/}

                    {/*<button className="" >Dodaj produkt</button>*/}
                </form>
            </div>
        </div>
    );
};

export default AddingProduct;
