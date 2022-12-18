import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import './Style.css';
import catTop from '../../assets/cats-shop-form/img1.png';
import firstCatBottom from '../../assets/cats-shop-form/img2.png';
import secondCatBottom from '../../assets/cats-shop-form/img3.PNG';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    selectStyles: {
        width: 250,
        "&.MuiOutlinedInput-root": {
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
        width: 200,
        "&.MuiOutlinedInput-root": {
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
        "& label.Mui-focused": {
            color: '#464646',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        }
    },
    textFieldStyleMobile: {
        width: 250,
        "& label.Mui-focused": {
            color: '#464646',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        }
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

    /*Settings for weights*/
    const [valueWeights, setValueWeights] = React.useState('');

    const handleChangeWeights = (e: SelectChangeEvent) => {
        setValueWeights(e.target.value);
    };


    /*Function for form*/
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <div className="shop-form-container">

            <h1 className="shop-form-title">Witaj w naszym sklepie "House of pets"!</h1>
            <h1 className="shop-form-text">Powiedz nam czego szukasz</h1>
            <h1 className="shop-form-description">Proszę powiedz nam czego poszukujesz i dla kogo, wtedy będziemy mogli
                spersonalizować Twoje poszukiwania produktu.</h1>

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
                            <FormControl>
                                <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                <Select
                                    className={classes.selectStylesAge}
                                    IconComponent={ExpandMoreRoundedIcon}
                                    value={valueWeights}
                                    label="Waga"
                                    onChange={handleChangeWeights}
                                >
                                    <MenuItem value="all"><em>Wszystkie</em></MenuItem>
                                    <MenuItem value="age1">1</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="shop-form-third-row">
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
            <h1 className="shop-form-description">* każde pole musi zostać wypełnione</h1>

        </div>
    );
};

export default ShopForm;
