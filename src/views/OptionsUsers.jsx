import React from "react";
import {Box, Toolbar, Typography, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SingleUserPaper from "../components/SingleUserPaper";
import WallpaperDiv from "../components/WallpaperDiv";
import Lathe from "../images/backgroundAdmin.avif";

const fakeUsers = [
    {
        id: 123,
        username: 'John User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
        admin: false,
    },
    {
        id: 2131,
        username: 'Adam User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
        admin: false,
    },
    {
        id: 2351,
        username: 'Edward User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
        admin: true,
    },
    {
        id: 3431,
        username: 'John Admin',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
        admin: true,
    },
    {
        id: 214531,
        username: 'Adrian User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/12.jpg",
        admin: false,
    },
    {
        id: 2312351,
        username: 'Zenek Admininik II',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/44.jpg",
        admin: true,
    },
    {
        id: 323431,
        username: 'Al User',
        profilePic: "https://randomuser.me/api/portraits/thumb/men/8.jpg",
        admin: true,
    },
]

// mozna by zrobić refactor do osobnego komponentu, ale czy jest sens jak to jednorazowe wykorzystanie?
const UsersList = styled(Box)(({theme}) => ({
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

const OptionsUsers = () => {
    return (
        <WallpaperDiv image={Lathe}>
            <Box
                sx={{
                    width: {xs: "380px", md: "1024px", xl: "1500px"},
                    borderRadius: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: 3,
                    p: 1,
                    backgroundColor: "#fafafa"
                }}
            >
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
                        <Button variant="outlined" startIcon={<PersonAddIcon/>} onClick={() => {
                            console.log("button clicked")
                        }}>
                            Dodaj użytkownika
                        </Button>
                    </Toolbar>
                </Box>
                <UsersList>
                    {fakeUsers.map(user => (<SingleUserPaper key={user.id} user={user} onClick={() => { console.log("button clicked")}}/>))}
                </UsersList>
            </Box>
        </WallpaperDiv>
    );
};

export default OptionsUsers;