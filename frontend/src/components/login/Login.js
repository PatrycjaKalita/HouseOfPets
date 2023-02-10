import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";


import loginImg from "../../assets/login.jpg";
import './Style.css';
import {authenticate, isAuth} from '../../auth/Helpers';

const useStyles = makeStyles({
    textFieldStyle: {
        width: 400,
        color: '#666666',
        "& label.Mui-focused": {
            color: '#666666',
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#8D451D",
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
    }, inputLabelStyle: {
        '&.MuiInputLabel-root': {
            "&.Mui-focused": {
                color: '#464646',
            },
        },
    },
})

const Login = () => {
    const classes = useStyles()
    const history = useHistory()

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const [values, setValues] = useState({
        login: '',
        password: '',
        buttonText: 'Zaloguj się'
    })

    const {
        login,
        password,
        buttonText,
    } = values

    const handleChange = (name) => (event) => {
        //console.log(event.target.value);
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Zalogowano'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {
                login,
                password,
            }
        }).then(response => {
            console.log("Login success: ", response)

            //save the response (user, token)
            //localstorage/cookie
            authenticate(response, () => {
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

                toast.success(`Witaj ${response.data.user.name}!`)
                isAuth() && isAuth().role === 'klient' ? history.push('/profil/zamowienia') : history.push('/profil/pracownik/zamowienia');
            });
        }).catch(error => {
            console.log("Login error: ", error.response.data)
            setValues({...values, buttonText: 'Zaloguj'})
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="main-login-container">
            <ToastContainer/>
            <div className="left-login-container">
                <h1 className="login-title">Witaj ponownie w House of pets</h1>
                <h1 className="login-title-desc">Zaloguj się, aby kontynuować przygodę z nami</h1>

                <form>
                    <div className="login-input-container">
                        <TextField
                            label="Login"
                            onChange={handleChange('login')}
                            value={login}
                            variant="outlined"
                            className={classes.textFieldStyle}

                        />
                    </div>

                    <FormControl>
                        <InputLabel className={classes.inputLabelStyle}>Hasło</InputLabel>
                        <OutlinedInput
                            onChange={handleChange('password')}
                            value={password}
                            label="Hasło"
                            className={classes.textFieldStyle}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
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

                    <Link to="/nie-pamietam-hasla">
                        <h1 className="forget-password-link">Nie pamiętasz hasła?</h1>
                    </Link>

                    <button className="login-btn" onClick={clickSubmit}>{buttonText}</button>
                </form>
            </div>

            <div className="right-login-container">
                <h1 className="login-title">Jesteś u nas po raz pierwszy?</h1>

                <div className="signup-link-container">
                    <Link to="/zarejestruj-sie">
                        <h1 className="signup-link">Zarejestruj się</h1>
                    </Link>

                    <h1 className="signup-link-question">i odkryj swoje nowe możliwości!</h1>
                </div>

                <img alt="login-pic" src={loginImg} className="login-image"/>
            </div>
        </div>
    );
};

export default Login;
