import React from 'react';
import {Box, Fab, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ActionsBox = ({errorMessage, onCreate, isDisabled}) => {
    return (
        <Box sx={{
            fontSize: {xs: '8px', sm: "10px", md: "12px", lg: "14px"},
            display: 'flex',
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Typography
                variant="h6"
                component="span"
                sx={{
                    color: "red",
                    fontWeight: 400,
                    fontSize: {xs: "0.9em", md: "0.7em", lg: "0.65em", xl: "0.8em"},
                    marginLeft: "1em"
                }}>
                {errorMessage ?? null}
            </Typography>
            <Fab
                disabled={isDisabled}
                variant="extended"
                size="small"
                color="success"
                sx={{fontSize: {xs: "0.9em", md: "0.7em", xl: "0.8em"}}}
                onClick={onCreate}
            >
                {isDisabled ?
                    (<>
                        <CloudUploadIcon sx={{fontSize: {xs: "2em"}, mr: "8px"}}/>
                        Upload to Firebase
                    </>)
                    :
                    (
                        <>
                            <CheckCircleIcon sx={{fontSize: {xs: "2em"}, mr: "8px"}}/>
                            Dodaj do bazy
                        </>
                    )
                }
            </Fab>
        </Box>
    );
};

export default ActionsBox;