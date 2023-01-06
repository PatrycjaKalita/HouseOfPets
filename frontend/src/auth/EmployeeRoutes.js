import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {isAuth} from "./Helpers";

const EmployeeRoutes = ({comp: Component, ...rest}) => (
    <Route {...rest}
           render={(props) =>
               isAuth() && isAuth().role === 'pracownik' ?
                   (<Component {...props} />) :
                   (<Redirect to={{
                       pathname: '/zaloguj-sie',
                       state: {from: props.location}
                   }}/>)
           }>

    </Route>
);

export default EmployeeRoutes;
