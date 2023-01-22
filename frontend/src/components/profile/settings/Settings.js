import React, {useState, useEffect} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import './Style.css'
import TextField from "@mui/material/TextField";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {getCookie, isAuth, signOut, updateUser} from '../../../auth/Helpers';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Input} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useStyles} from "../adding-product/MUIStyle";

const Settings = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const [values, setValues] = useState({
        login: isAuth().login,
        name: isAuth().name,
        lastname: isAuth().lastname,
        email: isAuth().email,
        phone_number: isAuth().phone_number,
        street_and_number: isAuth().street_and_number,
        postcode_and_city: isAuth().postcode_and_city,
        password: isAuth().password,
        buttonText: 'Aktualizuj'
    })

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    });


    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);

            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    });
                }
            });
    };

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
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
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
            console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
            updateUser(response, () => {
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
                    buttonText: 'Zaktualizowano'
                })
                /*toast.success('Profile updated successfully');*/
            });
        }).catch(error => {
            //console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
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
        <div className="main-settings-container">
            <ProfileNavigation choose={props.choose}/>
            <ToastContainer/>
            <div className="settings-container">
                <h1 className="settings-title">Ustawienia konta</h1>

                <form>
                    <h1 className="box-title-update">Dane do logowania:</h1>
                    <div className="login-data-update">
                        <TextField
                            sx={{marginBottom: '35px'}}
                            className={classes.root}
                            label="Nazwa użytkownika"
                            value={login}
                            onChange={handleChange('login')}
                            variant="standard"
                        />
                        <br/>
                        <FormControl variant="standard">
                            <InputLabel className={classes.inputLabelStyle}>Hasło</InputLabel>
                            <Input
                                className={classes.rootInput}
                                value={password}
                                onChange={handleChange('password')}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                    </div>

                    <h1 className="box-title-update">Dane osobowe:</h1>
                    <div className="personal-data-update">
                        <TextField
                            sx={{marginBottom: '35px'}}
                            className={classes.root}
                            label="Imię"
                            value={name}
                            onChange={handleChange('name')}
                            variant="standard"
                        />
                        <br/>
                        <TextField
                            sx={{marginBottom: '35px'}}
                            className={classes.root}
                            label="Nazwisko"
                            value={lastname}
                            onChange={handleChange('lastname')}
                            variant="standard"
                        />
                        <br/>
                        <TextField
                            sx={{marginBottom: '35px'}}
                            className={classes.root}
                            label="Mail"
                            value={email}
                            onChange={handleChange('email')}
                            variant="standard"
                        />
                        <br/>
                        <TextField
                            className={classes.root}
                            label="Numer telefonu"
                            value={phone_number}
                            onChange={handleChange('phone_number')}
                            variant="standard"
                        />
                    </div>

                    <h1 className="box-title-update">Adres dostawy:</h1>
                    <div className="address-data-update">
                        <TextField
                            sx={{marginBottom: '35px'}}
                            className={classes.root}
                            label="Ulica i numer domu/mieszkania"
                            value={street_and_number}
                            onChange={handleChange('street_and_number')}
                            variant="standard"
                        />
                        <br/>
                        <TextField
                            className={classes.root}
                            label="Kod pocztowy i Miasto"
                            value={postcode_and_city}
                            onChange={handleChange('postcode_and_city')}
                            variant="standard"
                        />
                    </div>

                    <div className="update-btn-container">
                        <button className="update-profile-btn" onClick={clickSubmit}>{buttonText}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
