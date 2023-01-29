import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {getUserRole} from "./admin-tools";

export const ProtectedRoute = ({expectedRole, element}) => {
    const {user} = useContext(AuthContext);
    const isAuthenticated = !!user;
    const areRolesRequired = !!expectedRole?.length;
    const userRole = [getUserRole(user)];
    const roleMatch = areRolesRequired ? expectedRole.some(r => userRole.indexOf(r) >= 0) : true;

    if (!isAuthenticated || !roleMatch) {
        return <Navigate to="/" replace/>;
    }
    return element;
};







