import jwt_decode from "jwt-decode";
import {userRoles} from "./user-roles";

export function getUserRole(user) {
    if (user) {
        const {admin} = jwt_decode(user.token);
        return admin ? userRoles.admin : userRoles.basic;
    }
    return userRoles.guest;
}