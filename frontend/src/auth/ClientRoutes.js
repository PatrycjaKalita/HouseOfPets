import React  from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuth} from './Helpers';

const ClientRoutes = ({comp: Component, ...rest}) => (
    <Route {...rest}
           render={(props) => isAuth() && isAuth().role === 'klient' ?
               (<Component {...props} />) : (<Redirect to={{
                   pathname: '/zaloguj-sie',
                   state: {from: props.location}
               }}/>)
           }>
    < /Route>
);

export default ClientRoutes;
