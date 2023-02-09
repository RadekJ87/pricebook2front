import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Products from "./views/Products";
import Options from "./views/Options";
import Error from "./views/Error";
import {Box} from "@mui/material";
import OptionsUsers from "./views/OptionsUsers";
import OptionsProducts from "./views/OptionProducts";
import OptionsPrices from "./views/OptionsPrices";
import TestView from "./views/TestView";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import {userRoles} from "./utils/user-roles";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "products",
                element: <ProtectedRoute expectedRole={[userRoles.admin, userRoles.basic]} element={<Products/>}/>,
            },
            {
                path: "options",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute expectedRole={[userRoles.admin]} element={<Options/>}/>,
                    },
                    {
                        path: "manage-users",
                        children: [
                            {
                                index: true,
                                element: <ProtectedRoute expectedRole={[userRoles.admin]} element={<OptionsUsers/>}/>,
                            },
                            {
                                path: ':id',
                                element: <ProtectedRoute expectedRole={[userRoles.admin]} element={<TestView/>}/>,
                            },
                        ]
                    },
                    {
                        path: "manage-products",
                        element: <ProtectedRoute expectedRole={[userRoles.admin]} element={<OptionsProducts/>}/>,
                    },
                    {
                        path: "manage-prices",
                        element: <ProtectedRoute expectedRole={[userRoles.admin]} element={<OptionsPrices/>}/>,
                    },
                ]
            },
        ]
    },
]);


const App = () => {
    return (
        <Box>
                <RouterProvider router={router}/>
        </Box>
    );
}

export default App;