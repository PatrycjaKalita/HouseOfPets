import React, {useEffect, useState} from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import './Style.css'
import More from "../more/More";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getCookie, isAuth, signOut,} from "../../../auth/Helpers";

const ListOfUsers = (props) => {
    const history = useHistory()
    const token = getCookie('token');

    useEffect(() => {
        loadListOfUsers();
    }, []);

    const [availableUsersList, setAvailableUsersList] = useState(false);
    const loadListOfUsers = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAvailableUsersList(response.data.availableUsersList);
            })
            .catch(error => {
                console.log('Blad wyswietlania', error.response.data.error);
                if (error.response.status === 401) {
                    signOut(() => {
                        history.push('/zaloguj-sie');
                    })
                }
            });
    };

    return (
        <div className="main-LOP-container">
            <ProfileNavigation choose={props.choose}/>

            <div className="LOU-container">
                <h1 className="LOU-title">Wszyscy użytkownicy</h1>

                <div className='LOU-list-container'>
                    {
                        availableUsersList.hasOwnProperty('user') === false ?
                            <h1>Loading..</h1>
                            :
                            availableUsersList.user.map((user) => {
                                return <div className="LOU-one-part-container">
                                    <More options={1}/>

                                    <h1 className="LOU-login">Login: <b>{user.login}</b></h1>
                                    <h1 className="LOU-name">Imię: <b>{user.name}</b></h1>
                                    <h1 className="LOU-lastname">Nazwisko: <b>{user.lastname}</b></h1>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default ListOfUsers;
