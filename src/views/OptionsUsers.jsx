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

// mozna by zrobić refactor do osobnego komponentu, ale czy jest sens jak to jednorazowe wykorzystanie?
const MainDiv = styled(Box)(({theme}) => ({
    display: 'inline-flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
        minHeight: '200px',
        margin: 'auto 42px',
    },
    [theme.breakpoints.up('md')]: {
        minHeight: '400px',
        margin: 'auto 68px',
    },
    [theme.breakpoints.up('xl')]: {
        minHeight: '600px',
        margin: 'auto 10px',
    },
}));

const MainContainer = styled(Box)(({theme}) => ({
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "24px",
    padding: "8px",
    backgroundColor: "#fafafa",
    [theme.breakpoints.up('xs')]: {
        width: "380px",
    },
    [theme.breakpoints.up('md')]: {
        width: "1024px",
    },
    [theme.breakpoints.up('xl')]: {
        width: "1500px",
    },
}));

const OptionsUsers = () => {
    const [users, setUsers] = useState([]);
    const [isCreated, setIsCreated] = useState(false);

    // not yet, still fake data
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const res = await axios.get(`/options/manage-users/`);
    //         setUsers(res.data);
    //     }
    //     fetchUsers().catch(console.error);
    //
    //     return () => {
    //     }
    // }, []);


    const toggle = () => {
        setIsCreated(!isCreated);
    }

    return (
        <WallpaperDiv image={Lathe}>
            <MainContainer>
                <Box>
                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography
                            component="h6"
                            variant="h6"
                            sx={{
                                fontFamily: "Oswald",
                                fontWeight: 400,
                                fontSize: "24px",
                                letterSpacing: "1px"
                            }}>
                            Użytkownicy
                        </Typography>
                        <Button variant="outlined" startIcon={isCreated ? <NotInterestedIcon/> : <PersonAddIcon/>}
                                onClick={toggle}>
                            {isCreated ? "Anuluj dodawanie" : "Dodaj użytkownika"}
                        </Button>
                    </Toolbar>
                </Box>
                {isCreated ?
                    (<MainDiv sx={{ alignContent: 'space-between',justifyContent: "center"}}>
                        <UserCreator/>
                    </MainDiv>)
                    :
                    (<MainDiv>
                        {fakeUsers.map(user => (<SingleUserPaper key={user._id} user={user}/>))}
                    </MainDiv>)
                }
            </MainContainer>
        </WallpaperDiv>
    );
};
export default OptionsUsers;