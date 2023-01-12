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
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/products",
                element: <Products/>,
            },
            {
                path: "/options",
                element: <Options/>,
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