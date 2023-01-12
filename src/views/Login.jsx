import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WallpaperDiv from "../components/WallpaperDiv";
import {Card, CardContent, Stack, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Box, Typography} from "@mui/material";
import {AuthContext} from "../context/authContext";
import Laser from '../images/backgroundLogin.avif'
import {loginFailure, loginSuccess, startLoggingUser} from "../actions/authActions";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const {isLogInBeingProcessed, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputs = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(startLoggingUser());
        try {
            const res = await axios.post('https://pricebooktwo-api.onrender.com/api/auth/login', credentials);
            dispatch(loginSuccess(res.data));
            navigate('/');
        } catch (err) {
            dispatch(loginFailure());
            throw new Error(err);
        }
    }

    return (
        <WallpaperDiv image={Laser}>
            <Card sx={{
                padding: "20px",
                width: {xs: 200, md: 330},
                height: {xs: 280, md: 380}
            }}>
                <CardContent sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <Box sx={{
                        margin: {xs: "0px", md: "15px 0"}
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: "center",
                                fontFamily: 'Oswald',
                                fontSize: {xs: "28px", md: "34px"},
                                fontWeight: 400,
                                textTransform: "uppercase",
                            }}>Zaloguj się</Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: {xs: "15px 0", md: "25px 0"}
                        }}
                    >
                        <Stack spacing={3} sx={{marginBottom: {xs: "30px", md: "50px"}}}>
                            <TextField required name="username" label="Nazwa użytkownika" variant="standard"
                                       onChange={handleInputs}/>
                            <TextField required name="password" label="Hasło" variant="standard" type="password"
                                       onChange={handleInputs}/>
                        </Stack>
                        <LoadingButton
                            loading={isLogInBeingProcessed}
                            loadingIndicator="Uwierzytelnianie..."
                            variant="contained"
                            size="large"
                            type="submit"
                        >Zaloguj</LoadingButton>
                    </Box>
                    {error && (<Typography
                        variant="caption"
                        sx={{color: "red", textAlign: "center"}}
                        >Podany login lub hasło są nieprawidłowe</Typography>)}
                </CardContent>
            </Card>
        </WallpaperDiv>
    );
};

export default Login;