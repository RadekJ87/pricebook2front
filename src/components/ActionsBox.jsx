import React from 'react';
import {Box, Fab} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ActionsBox = (onClick) => {
    return (
        <Box sx={{
            fontSize: {xs: '8px', sm: "10px", md: "12px", lg: "14px"},
            display: 'flex',
            alignContent: "center",
            justifyContent: "flex-end"
        }}>
            <Fab
                variant="extended"
                size="small"
                color="success"
                sx={{fontSize: "1.1em",}}
                onClick={() => console.log('Add new')}>
                <CheckCircleIcon sx={{fontSize: "2em", mr: 1}}/>
                Dodaj do bazy
            </Fab>
        </Box>
    );
};

export default ActionsBox;