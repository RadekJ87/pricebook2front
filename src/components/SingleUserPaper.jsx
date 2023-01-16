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
            to={`${user.id}`}
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                m: 1,
                width: 280,
                height: 100,
                cursor: "pointer",
                textDecoration: "none",
            }}>
            <Avatar
                alt="Remy Sharp"
                src={user?.profilePic}
                sx={{width: 45, height: 45, margin: "0 20px",}}/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Typography variant="h6" component="h6">{user.username}</Typography>
                <Typography variant="caption" component="span" color="gray">{user.admin ? "Admin" : "User"}</Typography>
            </Box>
        </Paper>
    );
};

export default SingleUserPaper;