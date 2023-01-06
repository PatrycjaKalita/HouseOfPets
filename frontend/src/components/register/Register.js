import React, {useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import "./Style.css"
import register from "../../assets/register.png"

const useStyles = makeStyles({
    textFieldStyle: {
        width: 350,
        color: '#666666',
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D"
            }
        },
        "& input": {
            "&:-webkit-autofill": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
            "&:-webkit-autofill:focus": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
            "&:-webkit-autofill:hover": {
                transition:
                    "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
            },
        },
    },    inputLabelStyle: {
        '&.MuiInputLabel-root': {
            "&.Mui-focused": {
                color: '#464646',
            },
        },
    },
})

const Register = () => {
    const classes = useStyles()

    const [values, setValues] = useState({
        login: '',
        name: '',
        lastname: '',
        email: '',
        phone_number: '',
        street_and_number: "",
        postcode_and_city: "",
        password: '',
        buttonText: 'Zarejestruj się'
    })

    const {
        login,
        name,
        lastname,
        email,
        phone_number,
        street_and_number,
        postcode_and_city,
        password,
        buttonText,
    } = values

    const handleChange = (name) => (event) => {
        console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {
                login,
                name,
                lastname,
                email,
                phone_number,
                street_and_number,
                postcode_and_city,
                password,
            }
        }).then(response => {
            setValues({
                ...values,
                login: '',
                name: '',
                lastname: '',
                email: '',
                phone_number: '',
                street_and_number: '',
                postcode_and_city: '',
                password: '',
                buttonText: 'Zarejestrowano'
            })
            toast.success(response.data.message)

        }).catch(error => {
            //console.log("Register error: ", error.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <div className="main-register-container">
            <ToastContainer/>

            <div className="register-img-container">
                <img alt="register" src={register} className="register-image"/>
            </div>

            <div className="register-form-container">
                <h1 className="register-title">Stwórz swoje konto</h1>
                <h1 className="register-title-desc">Proszę wypełnij pola swoimi danymi.</h1>

                <form className="register-form">
                    <div className="register-form-inputs">
                        <TextField
                            label="Login"
                            onChange={handleChange('login')}
                            value={login}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <TextField
                            label="Imię"
                            onChange={handleChange('name')}
                            value={name}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <TextField
                            label="Nazwisko"
                            onChange={handleChange('lastname')}
                            value={lastname}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <TextField
                            label="Email"
                            onChange={handleChange('email')}
                            value={email}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <FormControl>
                            <InputLabel className={classes.inputLabelStyle}>Hasło</InputLabel>
                            <OutlinedInput
                                onChange={handleChange('password')}
                                value={password}
                                label="Hasło"
                                type={showPassword ? 'text' : 'password'}
                                className={classes.textFieldStyle}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{
                                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        color: '#666666',
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#8D451D",
                                        color: '#666666',
                                    },
                                }}
                            />
                        </FormControl>

                        <TextField
                            label="Numer telefonu"
                            onChange={handleChange('phone_number')}
                            value={phone_number}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <TextField
                            label="Ulica i numer domu/mieszkania"
                            onChange={handleChange('street_and_number')}
                            value={street_and_number}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />

                        <TextField
                            label="Kod pocztowy i Miasto"
                            onChange={handleChange('postcode_and_city')}
                            value={postcode_and_city}
                            variant="outlined"
                            className={classes.textFieldStyle}
                        />
                    </div>

{/*                    <div className="">
                        check
                        <span>Wyrażam zgodę na to, żeby moje dane personalne i informacje o wykorzystaniu ofert przez
                            firmę House of pets i jej partnerów, były do odwołania rejestrowane w centralnym profilu użytkownika
                            i wykorzystywane przez firmę House of pets do optymalizacji (personalizacji) ofert.</span>
                    </div>*/}

                    <button className="register-btn" onClick={clickSubmit}>{buttonText}</button>
                </form>

                <div className="signin-link-container">
                    <h1 className="signin-link-question">Masz już konto?</h1>
                    <Link to="/zaloguj-sie">
                        <h1 className="signin-link">Zaloguj się</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
