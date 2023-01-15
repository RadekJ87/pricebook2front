import React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";


const SingleAdminOption = ({faIcon, text, url, primaryColor ='#fafafa', secondaryColor='slateblue', ...props}) => {
    return (
        <Paper
            elevation={3}
            component={Link}
            to={url}
            sx={{
                cursor: "pointer",
                textDecoration: "none",
                backgroundColor: `${secondaryColor}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
            <Typography
                variant="h4" sx={{color: `${primaryColor}`}}>
                {text}
            </Typography>
            <FontAwesomeIcon icon={faIcon} size="5x" style={{color: `${primaryColor}`, "--fa-animation-duration": "5s"}} {...props}/>
        </Paper>
    );
};

export default SingleAdminOption;