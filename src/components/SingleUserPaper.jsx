import React from 'react';
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SingleUserPaper = ({user}) => {
    return (
        <Paper
            elevation={6}
            component={Link}
            to={`${user._id}`}
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                m: 1,
                width: {xs: '85%', md: "47%", lg: "31%", xl: "23%"},
                height: {xs: '10vh', md: "10vh", xl: "12vh"},
                cursor: "pointer",
                textDecoration: "none",
            }}>
            <Avatar
                alt="Remy Sharp"
                src={user?.profilePic ?? null}
                sx={{width: 45, height: 45, margin: "0 20px",}}/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Typography variant="h6" sx={{fontSize: "1em"}} component="h6">{user.username}</Typography>
                <Typography variant="caption" sx={{fontSize: "0.8em"}} component="span" color="gray">{user.admin ? "Admin" : "User"}</Typography>
            </Box>
        </Paper>
    );
};

export default SingleUserPaper;