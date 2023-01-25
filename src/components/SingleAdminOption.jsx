import React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";


const SingleAdminOption = ({faIcon, text, url, primaryColor = '#fafafa', secondaryColor = 'slateblue', ...props}) => {
    return (
        <Paper
            elevation={3}
            component={Link}
            to={url}
            sx={{
                fontSize: {xs: "20px", sm: "28px", md: "32px", lg: "36px"},
                width: {xs: "180px", sm: "190px", md: "230px", lg: "280px"},
                height: {xs: "200px", sm: "250px", md: "320px", lg: "400px"},
                cursor: "pointer",
                textDecoration: "none",
                backgroundColor: `${secondaryColor}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
            <Typography
                variant="h4" sx={{fontSize: "1em", color: `${primaryColor}`}}>
                {text}
            </Typography>
            <FontAwesomeIcon
                icon={faIcon}
                // size="5x"
                style={{
                    fontSize: "2.35em",
                    color: `${primaryColor}`,
                    "--fa-animation-duration": "5s"
                }} {...props}/>
        </Paper>
    );
};

export default SingleAdminOption;