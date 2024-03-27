import React from 'react';
import {Navigate, Outlet, Route} from "react-router-dom";

//PrivateRoutes Component secure the routes and keep them privately base on the state  - isPrivate true/false
const PrivateRoutes = ({authUser} : any) => {
    return (
        !authUser ? <Outlet/>  : <Navigate to={'/login'} />
    );
};

export default PrivateRoutes;