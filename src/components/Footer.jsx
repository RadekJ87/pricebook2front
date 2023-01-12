import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                display: {xs: "none", md: "flex"},
                position: "fixed",
                bottom: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                backgroundColor: "transparent",
                height: `calc(100vh - 940px)`,
            }}
        >
            <Typography variant="p" component="h5" fontWeight="200">
                © 2022 Pricebook | Designed by
                <Link href="https://github.com/RadekJ87" sx={{textDecoration: "none", color: "black",  fontWeight: 400}}> RadekJ87</Link>
            </Typography>

        </Box>
    );
};

export default Footer;
