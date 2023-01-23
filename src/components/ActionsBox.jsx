import React from 'react';
import {Box, Fab} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ActionsBox = (onClick) => {
    return (
            <Box sx={{
                display: 'flex',
                alignContent: "center",
                justifyContent: "flex-end"
            }}>
                <Fab variant="extended" size="small" color="success"
                     onClick={() => console.log('Add new')}>
                    <CheckCircleIcon sx={{mr: 1}}/>
                    Dodaj do bazy
                </Fab>
            </Box>
    );
};

export default ActionsBox;