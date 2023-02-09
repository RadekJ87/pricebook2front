import React, {useEffect, useState} from "react";
import axios from "axios";
import {styled} from "@mui/material/styles";
import {
    Box,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SingleUserPaper from "../components/SingleUserPaper";
import WallpaperDiv from "../components/WallpaperDiv";
import UserCreator from "../components/UserCreator";
import Lathe from "../images/backgroundAdmin.avif";
import UserCreatorReactHookForm from "../components/UserCreatorReactHookForm";

const fakeUsers = [
    {
        _id: 123,
        username: 'John User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
        admin: false,
    },
    {
        _id: 2131,
        username: 'Adam User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
        admin: false,
    },
    {
        _id: 2351,
        username: 'Edward User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
        admin: true,
    },
    {
        _id: 3431,
        username: 'John Admin',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
        admin: true,
    },
    {
        _id: 214531,
        username: 'Adrian User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/12.jpg",
        admin: false,
    },
    {
        _id: 2312351,
        username: 'Zenek Admininstrator',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/44.jpg",
        admin: true,
    },
    {
        _id: 323431,
        username: 'Alan User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/8.jpg",
        admin: true,
    },
]

const MainContainer = styled(Box)(({theme}) => ({
    width: "80vw",
    height: "75vh",
    borderRadius: "15px",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "24px",
    padding: "8px",
    backgroundColor: "#fafafa",
    [theme.breakpoints.up('sm')]: {
        width: "80vw",
        height: "75vh",
    },
    [theme.breakpoints.up('md')]: {
        height: "50vh",
    },
    [theme.breakpoints.up('lg')]: {
        height: "75vh",
    },
}));

const MainDiv = styled(Box)(({theme}) => ({
    display: 'inline-flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
        justifyContent: "center",
        fontSize: "12px",
        overflow: "scroll"
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: "14px",
    },
    [theme.breakpoints.up('md')]: {
        fontSize: "16px",
        justifyContent: "space-between",
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: "18px",
        overflow: "inherit"
    },
    [theme.breakpoints.up('xl')]: {
        fontSize: "20px",
        justifyContent: "flex-start",
        marginLeft: "55px"
    },
}));


const OptionsUsers = () => {
    const [users, setUsers] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${process.env.REACT_APP_WEBSERVICE_URL}/options/manage-users/`);
            setUsers(res.data);
        }
        fetchUsers().catch(console.error);

        return () => {
        }
    }, [isCreated]);


    const toggle = () => {
        setIsCreated(!isCreated);
    }

    return (
        <WallpaperDiv image={Lathe}>
            <MainContainer className="main-container">
                <Box className="top-bar">
                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography
                            component="h6"
                            variant="h6"
                            sx={{
                                fontFamily: "Oswald",
                                fontWeight: 400,
                                fontSize: {xs: '18px', sm: "22px", md: "24px"},
                                letterSpacing: "1px"
                            }}>
                            Użytkownicy
                        </Typography>
                        <Button sx={{fontSize: {xs: '8px', sm: "10px", md: "12px", lg: "14px"}}}
                                variant="outlined" startIcon={isCreated ? <NotInterestedIcon/> : <PersonAddIcon/>}
                                onClick={toggle}>
                            {isCreated ? "Anuluj dodawanie" : "Dodaj użytkownika"}
                        </Button>
                    </Toolbar>
                </Box>
                {isCreated ?
                    (<MainDiv className="main-div" sx={{
                        marginLeft: {xl: 0},
                        overflow: {xs: "inherit"},
                        justifyContent: {xs: "center"},
                    }}>
                        {/* two versions avalable without and with validation*/}
                        {/*<UserCreator onSuccessfulCreate={toggle}/>*/}
                        <UserCreatorReactHookForm onSuccessfulCreate={toggle}/>
                    </MainDiv>)
                    :
                    (<MainDiv className="main-div">
                        {users.map(user => (<SingleUserPaper key={user._id} user={user}/>))}
                    </MainDiv>)
                }
            </MainContainer>
        </WallpaperDiv>
    );
};

export default OptionsUsers;
