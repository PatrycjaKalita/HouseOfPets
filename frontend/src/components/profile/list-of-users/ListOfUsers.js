import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import './Style.css'
import More from "../more/More";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getCookie, isAuth, signOut,} from "../../../auth/Helpers";

const ListOfUsers = (props) => {
    const history = useHistory()

    const [values, setValues] = useState({
        login: '',
        name: '',
        lastname: '',
        users: []
    })

    const token = getCookie('token');

    useEffect(() => {
        loadListOfUsers();
    });

    const loadListOfUsers = () => {
        axios({
            method: 'GET',
            /*url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,*/
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('List of users: ', response);
                const {
                    login,
                    name,
                    lastname,
                } = response.data;
                setValues({
                    ...values,
                    login,
                    name,
                    lastname,
                });
            })
            .catch(error => {
                console.log('List of users', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/');
                    });
                }
            });
    };

    return (
        <div className="main-LOP-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOU-container">
                <h1 className="LOU-title">Wszyscy użytkownicy</h1>

                <div className='LOU-list-container'>
                    <div className="LOU-one-part-container">
                        <More options={1}/>

                        <h1 className="LOU-login">Login: <b>Imię</b></h1>
                        <h1 className="LOU-name">Imię: <b>Imię</b></h1>
                        <h1 className="LOU-lastname">Nazwisko: <b>Imię</b></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfUsers;
