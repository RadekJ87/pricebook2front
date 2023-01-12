import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Brand from '../images/logo_jasne.png';
import {IconButton, Menu, MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/authContext";
import jwt_decode from "jwt-decode";
import {logout} from "../actions/authActions";


// do opcji menu poza auth
const pages = [
    {
        desc: 'Strona główna',
        url: "/",
        access: 'basic',
    },
    {
        desc: 'Produkty',
        url: "/products",
        access: 'basicUser',
    },
    {
        desc: 'Panel administratora',
        url: "/options",
        access: 'adminOnly',
    },
];

// dane testowe do user
const fakeNormalUser = {
    username: 'John User',
    img: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    admin: false,
}

const fakeAdmin = {
    username: 'John Admin',
    img: "https://randomuser.me/api/portraits/thumb/men/73.jpg",
    admin: true,
}


function isAdmin(user) {
    if (!user) {
        return null;
    } else {
        const {admin} = jwt_decode(user.token);
        return admin;
    }
}

function createNavbar(user, arrayCategories) {
    if(user) {
        const admin = isAdmin(user);
        if (admin) {
            return arrayCategories
        } else {
            return arrayCategories.filter(category => category.access !== 'adminOnly');
        }
    }
    return arrayCategories.filter(category => category.access === 'basic');
}


const Navbar = () => {
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    // @TODO - do zrobienia reducer
    const [activeMenu, setActiveMenu] = useState('Strona główna');
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [navbar, setNavbar] = useState(createNavbar(user, pages));


    useEffect(()=>{
        setNavbar(createNavbar(user, pages));
        setActiveMenu('Strona główna');
    }, [user]);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const isActive = descritption => {
        return descritption === activeMenu;
    }

    const handleLogout = () => {
        if(anchorElNav){
            handleCloseNavMenu();
        }
        try{
            setIsLoggingOut(true);
            setTimeout(()=> {
                dispatch(logout());
                setIsLoggingOut(false);
                navigate('/', { replace: true});
            }, 2000);
            // dispatch(logout());
        } catch (e){
            console.log(e);
        }
    }


    // klasy 'mui-*' do usunięcia przy refactor
    return (
        <AppBar className="mui-header" sx={{position: "static", backgroundColor: "#fafafa"}}>
            <Container className="mui-container" maxWidth="xxl">
                <Toolbar className="mui-toolbar" disableGutters>
                    {/* widok dla desktop */}
                    <Box sx={{flex: 2, display: {xs: 'none', md: 'flex'}, justifyContent: "flex-start"}}>
                        <img width="70px" src={Brand} alt=""/>
                    </Box>
                    <Box sx={{
                        flex: 8,
                        display: {xs: 'none', md: 'flex'},
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}>
                        {/*stworzyc komponent, aby nie duplikować stylowania*/}
                        {navbar.map(page => (
                            <Button
                                onClick={() => setActiveMenu(page.desc)}
                                component={Link}
                                to={page.url}
                                key={page.desc}
                                sx={{my: 2, color: 'black', display: 'block', fontFamily: "Oswald", fontWeight: "200"}}
                            >
                                {isActive(page.desc) ?
                                    (<Typography sx={{
                                        fontWeight: 400,
                                        fontFamily: "Oswald",
                                        fontSize: "15px"
                                    }}>{page.desc}</Typography>)
                                    : page.desc}
                            </Button>

                        ))}
                        {!user ?
                            (<Button
                                component={Link}
                                to={`/login`}
                                sx={{my: 2, color: 'black', display: 'block', fontFamily: "Oswald", fontWeight: "200"}}
                            >
                                Logowanie
                            </Button>)
                            : (<Button
                                component={Link}
                                onClick={handleLogout}
                                sx={{my: 2, display: 'flex', justifyContent: "center", color: 'black', fontFamily: "Oswald", fontWeight: "200"}}
                            >Wyloguj{isLoggingOut && <CircularProgress sx={{ml: 1}} size={'15px'} />}
                            </Button>)}
                    </Box>
                    {user ? (<Box sx={{
                        display: {xs: 'none', md: 'flex'},
                        flex: 2,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        backgroundColor: "#eef1f4",
                        borderRadius: "27px",
                        transition: "0.3s linear",
                        '&:hover': {
                            color: '#0971f1',
                            backgroundColor: '#fafafa',
                        }
                    }}>
                        < Typography
                            variant="h6"
                            noWrap
                            component="p"
                            sx={{
                                mr: 2,
                                p: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: "0.9rem",
                                letterSpacing: "1px",
                                color: "black",
                            }}
                        >
                            {user.username}
                        </Typography>
                        <Avatar sx={{marginRight: "10px"}} alt={user.username} src={user.img}/>
                    </Box>) : (<Box sx={{flex: 2}}></Box>)}

                    {/* widok dla mobile*/}

                    <Box className="mui-options-sm" sx={{flex: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                                color: "black"
                            }}
                        >
                            {navbar.map((page) => (
                                <MenuItem
                                    component={Link}
                                    to={page.url}
                                    key={page.desc}
                                    onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.desc}</Typography>
                                </MenuItem>
                            ))}
                            {user ?
                                (<MenuItem
                                    component={Link}
                                    onClick={handleLogout}>
                                    <Typography textAlign="center">Wyloguj</Typography>
                                </MenuItem>)
                                :
                                (<MenuItem
                                    component={Link}
                                    to={'/login'}
                                    onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Logowanie</Typography>
                                </MenuItem>)}
                        </Menu>
                    </Box>
                    <Box sx={{flex: 5, display: {xs: 'flex', md: 'none'}, justifyContent: "flex-start"}}>
                        <img width="40px" src={Brand} alt=""/>
                    </Box>
                    {user ? (<Box className="mui-user-sm" sx={{
                        display: {xs: 'flex', md: 'none'},
                        flex: 100,
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        < Typography
                            variant="p"
                            noWrap
                            component="p"
                            sx={{
                                mr: 2,
                                p: 1,
                                display: {xs: 'flex', md: 'none'},
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: "0.7rem",
                                letterSpacing: "1px",
                                color: "black",
                            }}
                        >
                            {user.username}
                        </Typography>
                        <Avatar sx={{marginRight: "10px"}} alt={user.username} src={user.img}/>
                    </Box>) : (<Box sx={{
                        flex: 100,
                        display: {xs: 'flex', md: 'none'},
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        < Typography
                            variant="p"
                            noWrap
                            component="p"
                            sx={{
                                mr: 2,
                                p: 1,
                                display: {xs: 'flex', md: 'none'},
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: "0.7rem",
                                letterSpacing: "1px",
                                color: "black",
                            }}
                        >
                            Proszę się zalogować
                        </Typography>
                        <Avatar sx={{marginRight: "10px"}} alt="?">?</Avatar>
                    </Box>)}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;