import React, {useEffect, useState} from 'react';
import {Badge, Box, FormControlLabel, Input, Switch} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import BadgeInput, {SmallCameraIconBadge} from "./BadgeInput";
import ActionsBox from "./ActionsBox";

// test
const avatar = "https://randomuser.me/api/portraits/men/75.jpg";
// const avatar = "https://picsum.photos/id/237/200/300";
const badge = "https://randomuser.me/api/portraits/thumb/men/76.jpg";


const BigAvatar = styled(Avatar)(({theme}) => ({
    backgroundSize: "cover",
    boxShadow: "4px 6px 15px 5px rgba(110,110,110,0.8)",
    [theme.breakpoints.up('xs')]: {
        width: 100,
        height: 100,
    },
    [theme.breakpoints.up('sm')]: {
        width: 135,
        height: 135,
    },
    [theme.breakpoints.up('md')]: {
        width: 155,
        height: 155,
    },
    [theme.breakpoints.up('lg')]: {
        width: 200,
        height: 200,
    },
}));

const FormBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "rgba(7, 7, 12, 0.05)",
    border: "1px solid #cccccc",
    boxShadow: "2px 3px 10px 0px rgba(161,161,161,0.7)",
    transition: "all ease 0.2s",
    borderRadius: "5px",
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0px 10px 20px rgba(161,161,161,0.7)',
    }
}));

const WrapperBox = styled(Box)(({theme}) => ({
    display: "flex",
    height: "85%",
    [theme.breakpoints.up('xs')]: {
        flexDirection: "column",
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: "row",
    },
}));

const ImageBox = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
}));

const DataBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    flex: 3,
}));

const Inputs = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up('xs')]: {
        gap: "16px",
        '&>: not(style)': {
            fontSize: "13px",
            width: "80%",
            margin: "0 auto"
        },
    },
    [theme.breakpoints.up('sm')]: {
        gap: "21px",
        '&>: not(style)': {
            fontSize: "16px",
        },
    },
    [theme.breakpoints.up('md')]: {
        gap: "18px",
        '&>: not(style)': {
            fontSize: "14px",
            width: "80%"
        },
    },
    [theme.breakpoints.up('lg')]: {
        gap: "22px",
        '&>: not(style)': {
            fontSize: "16px",
            marginLeft: "10px",
            width: "70%"
        },
    },
}));


const UserCreator = () => {
    const [file, setFile] = useState(null);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        admin: false,
        // tutaj sciezka do pliku ze zdjeciem, upload chyba na front do public/assets/images? do sprawdzenia
    });

    useEffect(() => {
        console.log('file -> ', file);
        console.log('user -> ', newUser);
    }, [file, newUser])

    const handleUploadImage = (image) => {
        setFile(image);
    }

    const handleInputChange = (event) => {
        const isSwitchEvent = event.target.name === 'admin' ? true : false;
        const key = event.target.name;
        const value = isSwitchEvent ? !newUser.admin : event.target.value;

        setNewUser({
            ...newUser,
            [key]: value,
        });
    }

    return (
        <FormBox className="form-box" sx={{
            width: {xs: "90%", md: "70%", lg: "55%"}, // wrapper do dodawania
            height: {xs: "55vh", md: "35vh", lg: "55vh"},
        }}>
            <WrapperBox className="wrapper-box">
                <ImageBox className="image-box">
                    <Box className="wrapper-image-box" sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "50%",
                    }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={<BadgeInput onChange={handleUploadImage}
                                                      badgeComponent={<SmallCameraIconBadge/>}/>}
                        >
                            <BigAvatar alt="" src={file ? URL.createObjectURL(file) : ""}/>
                        </Badge>
                    </Box>
                </ImageBox>
                <DataBox className="data-box">
                    <Inputs className="inputs-box">
                        <Input name="username" placeholder="Nazwa użytkownika" onChange={handleInputChange}/>
                        <Input name="email" placeholder="Adres email" onChange={handleInputChange}/>
                        <Input name="password" placeholder="Hasło" onChange={handleInputChange}/>
                        <Box>
                            <FormControlLabel
                                sx={{'& .MuiFormControlLabel-label': {fontSize: "0.8em"}}}
                                control={
                                    <Switch name="admin" checked={newUser.admin} onChange={handleInputChange}/>
                                }
                                label="Czy dodać uprawienienia administratora?"
                            />
                        </Box>
                    </Inputs>
                </DataBox>
            </WrapperBox>
            <ActionsBox/>
        </FormBox>
    );
};

export default UserCreator;