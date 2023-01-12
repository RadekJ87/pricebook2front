import React from 'react';
import Box from '@mui/material/Box';
import Logo from '../images/jasne.png';
import Cast from '../images/backgroundHome.avif';

import WallpaperDiv from "../components/WallpaperDiv";


const Home = () => {
    return (
        <WallpaperDiv image={Cast}>
                <img width="350px" src={Logo} alt=""/>
        </WallpaperDiv>
    );
};

export default Home;