import React, {useState} from 'react';
import './Style.css';

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    selectStyles: {
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
    }
});

const ChangingSearchingOptions = () => {
    const [showed, setShowed] = useState(false);
    const classes = useStyles();

    /*Settings for categories*/
    const [valueCategories, setValueCategories] = React.useState('');

    const handleChangeCategories = (e: SelectChangeEvent) => {
        setValueCategories(e.target.value);
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

    /*Settings for weight*/
    const [valueWeights, setValueWeights] = React.useState('');

    const handleChangeWeights = (e: SelectChangeEvent) => {
        setValueWeights(e.target.value);
    };

    /*Function for form*/
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="changing-searching-options-container">
            <div className="changing-searching-options open">
                <div
                    className={showed ? "changing-searching-options-top-part-open" : "changing-searching-options-top-part"}>
                    <div className="searching-options">
                        <p className="top-part-options">OPCJE:</p>

                        <p className="top-part-selected-options">Rasa:</p>
                        <p className="top-part-selected-options-answer">Europejski</p>

                        <p className="top-part-selected-options">Wiek:</p>
                        <p className="top-part-selected-options-answer">1-2 lata</p>

                        <p className="top-part-selected-options">Waga:</p>
                        <p className="top-part-selected-options-answer">3-6 kg</p>

                        <p className="top-part-selected-options">Kategoria:</p>
                        <p className="top-part-selected-options-answer">Sucha karma</p>
                    </div>

                    <span className={showed ? "top-part-options-chevron-none" : "top-part-options-chevron-down"}
                          onClick={() => setShowed(true)}>
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </span>

                    <span className={showed ? "top-part-options-chevron-up" : "top-part-options-chevron-none"}
                          onClick={() => setShowed(false)}>
                                        <ion-icon name="chevron-up-outline"></ion-icon>
                    </span>
                </div>
                <div className={showed ? "top-part-hidden-box" : "top-part-options-chevron-none"}>
                    <form onSubmit={handleSubmit}>
                        <div className="csof-first-row">
                            <p className="csof-description">
                                Wszystkie pola NIE są wymagane.
                                <br/>Domyślną wartością są dane z poprzedniego formularza.</p>
                        </div>

                        <div className="csof-second-row">
                            <div className="csof-breed-container">
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

                            <div className="csof-age-container">
                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Wiek</InputLabel>
                                    <Select
                                        className={classes.selectStyles}
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
                        </div>

                        <div className="csof-third-row">
                            <div className="csof-category-container">
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

                            <div className="csof-weight-container">
                                <FormControl>
                                    <InputLabel className={classes.inputLabelStyle}>Waga</InputLabel>
                                    <Select
                                        className={classes.selectStyles}
                                        IconComponent={ExpandMoreRoundedIcon}
                                        value={valueWeights}
                                        label="Waga"
                                        onChange={handleChangeWeights}
                                    >
                                        <MenuItem value="all"><em>Waga</em></MenuItem>
                                        <MenuItem value="op1">0.0kg - 0.5kg</MenuItem>
                                        <MenuItem value="op2">0.5kg - 1kg</MenuItem>
                                        <MenuItem value="op3">1kg</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="csof-fourth-row">
                            <Link to="/shop/koty/products/sucha-karma">
                                <button className="btn-search-changing-options">
                                    SZUKAJ
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangingSearchingOptions;
