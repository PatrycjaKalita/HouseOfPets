import React from 'react';
import ProfileNavigation from "../profile-navigation/ProfileNavigation";
import {useHistory} from "react-router-dom";
import {getCookie} from "../../../auth/Helpers";
import axios from "axios";
import {toast} from "react-toastify";

const DeleteProduct = (props) => {
    const history = useHistory()
    const token = getCookie('token');

    const clickNoButton = () => {
        history.push(`/profil/pracownik/produkty`)
    }

    const clickYesButton = () => {
        let id = window.location.href.replace('http://localhost:3000/profil/pracownik/produkty/usun/', '')
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API}/delete/product-from-shop`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
            }
        }).then(response => {
            console.log('Produkt usunięty');
            history.push('/profil/pracownik/produkty')
        }).catch(error => {
            toast.error(error.response.data.error)
        })
    }

    return (
        <div className="w-4/5 mt-50 mb-100 mx-auto flex">
            <ProfileNavigation choose={props.choose}/>

            <div className="w-4/5">
                <h1 className="mb-35 mt-100 text-2xl font-semibold text-center">Czy chcesz usunąć ten produkt ze
                    sklepu?</h1>

                <div className="flex mx-auto w-full">
                    <div className="mx-auto block">
                        <button className="cancel-delete-element-btn" onClick={() => clickNoButton()}>NIE</button>
                        <button className="delete-element-btn" onClick={() => clickYesButton()}>TAK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
