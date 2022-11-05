import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import TextField from '@mui/material/TextField';

import './Style.css';
import catTop from '../../assets/cats-shop-form/img1.png';
import firstCatBottom from '../../assets/cats-shop-form/img2.png';
import secondCatBottom from '../../assets/cats-shop-form/img3.PNG';
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    selectStyles: {
        width: 250,
        fontFamily: "Merriweather",
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                fontFamily: "Merriweather",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D"
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    },
    selectStylesAge: {
        width: 130,
        fontFamily: "Merriweather",
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                fontFamily: "Merriweather",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
                color: "#8D451D"
            },
        },
        selectIcon: {
            position: "relative",
            fontSize: "20px",
            paddingRight: "10px",
        },
    },
    inputLabelStyle: {
        '&.MuiInputLabel-root': {
            "&.Mui-focused": {
                color: '#464646',
            },
        },
    },
    textFieldStyle: {
        width: 130,
        fontFamily: "Merriweather",
        "& label.Mui-focused": {
            color: '#464646',
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: "#8D451D",
        },
    },
});

const ShopForm = () => {
    const classes = useStyles();

    /*Settings for categories*/
    const [valueCategories, setValueCategories] = React.useState('');

    const handleChangeCategories = (event: SelectChangeEvent) => {
        setValueCategories(event.target.value);
    };

    /*Settings for breeds*/
    const [valueBreeds, setValueBreeds] = React.useState('');

    const handleChangeBreeds = (e: SelectChangeEvent) => {
        setValueBreeds(e.target.value);
    };

    /*Settings for age*/
    const [valueAges, setValueAges] = React.useState('');

    const handleChangeAges = (e: SelectChangeEvent) => {
        setValueAges(e.target.value);
    };

    /*Function for form*/
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="main-container-shop-form">
            <div className="shop-form-container">

                <h1 className="shop-form-title">Witaj w naszym sklepie "House of pets"!</h1>

                <div className="shop-form-img-others">
                    {/*Prawa strona*/}
                    <img alt="cat 1" src={catTop} className="shop-form-others-img"/>
                </div>

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
                                    value={valueCategories}
                                    label="Kategoria"
                                    onChange={handleChangeCategories}
                                >
                                    <MenuItem value="all"><em>Wszystkie</em></MenuItem>
                                    <MenuItem value="s_karma">Sucha karma</MenuItem>
                                    <MenuItem value="m_karma">Mokra karma</MenuItem>
                                    <MenuItem value="przysmaki">Przysmaki</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="shop-form-first-row-right">
                            {/*Prawa strona*/}
                            <img alt="cat 1" src={catTop} className="shop-form-first-row-right-img"/>
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
                                        value={valueBreeds}
                                        label="Rasa"
                                        onChange={handleChangeBreeds}
                                    >
                                        <MenuItem value="all"><em>Wszystkie</em></MenuItem>
                                        <MenuItem value="domowy">Domowy</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="age-container">
                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Wiek</InputLabel>
                                    <Select
                                        className={classes.selectStylesAge}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueAges}
                                        label="Wiek"
                                        onChange={handleChangeAges}
                                    >
                                        <MenuItem value="all"><em>Wszystkie</em></MenuItem>
                                        <MenuItem value="age1">1</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="weight-container">
                                <TextField
                                    /*type="number"*/
                                    label="Waga"
                                    variant="outlined"
                                    className={classes.textFieldStyle}
                                />

                                <p className="kilograms">kg</p>
                            </div>
                        </div>

                        <div className="shop-form-third-row">
                            <Link to="/choose-option/koty">
                                <button className="btn-cancel-shop-form">
                                    Anuluj
                                </button>
                            </Link>
                            <Link to="/shop/koty/products/sucha-karma">
                                <button className="btn-search-shop-form">
                                    SZUKAJ
                                </button>
                            </Link>
                        </div>

                    </div>
                </form>

                <div className="shop-form-fourth-row">
                    <img alt="cat 2" src={firstCatBottom} className="shop-form-fourth-row-left-img"/>
                    <img alt="cat 3" src={secondCatBottom} className="shop-form-fourth-row-right-img"/>
                </div>
            </div>
        </div>
    );
};

export default ShopForm;
