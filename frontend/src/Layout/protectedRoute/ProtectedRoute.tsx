import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

interface RouteProps {
    element: any;
    path: string;
}

const ProtectedRoute: React.FC<RouteProps> = ({ element: Element, path, ...rest }) => {
    const token = localStorage.getItem("token");

    return (

        token
            ?
            <Route {...rest} path={path} element={<Element />} />
            :
            <Navigate to="/" replace />
    )
};

export default ProtectedRoute;
