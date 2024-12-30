import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    // Usamos useSelector para acceder al accessToken del estado de Redux
    const accessToken = useSelector((state) => state.auth.accessToken);

    // Si no hay token de acceso, redirigimos al login
    if (!accessToken) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;