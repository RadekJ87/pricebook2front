import React from 'react';
import Lathe from "../images/backgroundAdmin.avif";
import WallpaperDiv from "../components/WallpaperDiv";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {IconButton} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoneyBillTrendUp} from '@fortawesome/free-solid-svg-icons/faMoneyBillTrendUp';


const Options = () => {
    // kafelka refactor do komponentu SingleAdminOption
    return (
        <WallpaperDiv image={Lathe}>
            <Box
                sx={{
                    // backgroundColor: "cyan",
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    '& > :not(style)': {
                        xs: {
                            margin: "10px",
                            width: 165,
                            height: 220,
                        },
                        sm: {
                            margin: "15px",
                            width: 190,
                            height: 250,
                        },
                        md: {
                            margin: "20px",
                            width: 280,
                            height: 400,
                        }
                    },
                }}
            >
                <Paper elevation={3}>
                    <Typography
                    variant="h4">
                        Zmiana cen
                    </Typography>
                </Paper>
            </Box>
        </WallpaperDiv>
    );
};

export default Options;