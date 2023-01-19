import React from 'react';
import {Box, Fab, FormControlLabel, Input, Switch} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UserCreator = () => {
    return (
        <Box className="form" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: "10px",
            width: "55%",  //te dwa do skalowania
            height: "500px",
            // backgroundColor: "lightGreen",
            border: "1px solid #cccccc",
            boxShadow: "2px 3px 10px 0px rgba(161,161,161,0.7)",
            transition: "all ease 0.2s",
            borderRadius: "5px",
            '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0px 10px 20px rgba(161,161,161,0.7)',
            }
        }}>
            <Box className="wrapper"
                 sx={{
                     display: "flex",
                     flexDirection: "row",
                     // backgroundColor: "lightGreen",
                     height: "85%",
                 }}>
                <Box className="image-box" sx={{
                    display: "flex",
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "darkGreen"
                }}>
                    <Box sx={{ height: "50%", backgroundColor: "red"}}>
                        <Input name="profilePicture" placeholder="input od uploadu zdjecia"/>
                        Zdjecie
                    </Box>
                </Box>
                <Box className="data-box" sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    // justifyContent: "space-around",
                    flex: 3,
                    // backgroundColor: "green"
                }}>
                    <Box sx={{
                        display: "flex",
                        flex: 4,
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 4,
                        '&>: not(style)': {
                            width: "60%"}
                    }}>
                        <Input name="username" placeholder="Nazwa użytkownika"/>
                        <Input name="email" placeholder="Adres email"/>
                        <Input name="password" placeholder="Hasło"/>
                    </Box>
                    <Box sx={{flex: 1}}>
                        <FormControlLabel
                            control={
                                <Switch checked={true} onChange={()=>console.log('switch')} name="admin" />
                            }
                            label="Czy dodać uprawienienia administratora?"
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', alignContent: "center", justifyContent: "flex-end"}}>
                <Fab variant="extended" size="small" color="success"
                     onClick={() => console.log('Add new')}>
                    <CheckCircleIcon sx={{mr: 1}}/>
                    Dodaj do bazy
                </Fab>
            </Box>
        </Box>
    );
};

export default UserCreator;