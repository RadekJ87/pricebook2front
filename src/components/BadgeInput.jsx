import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CameraIcon from "@mui/icons-material/Camera";

export const SmallImgBadge = styled(Avatar)(({theme}) => ({
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export const SmallCameraIconBadge = styled(CameraIcon)(({theme}) => ({
    cursor: "pointer",
    width: 38,
    height: 38,
    backgroundColor: `${theme.palette.background.paper}`,
    border: "2px solid black",
    borderRadius: "50%",
    padding: "1px",
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0px 0px 25px 7px rgba(255,0,0)',
    }
}));

const BadgeInput = ({badgeComponent}) => {
    return <Box>

        <label htmlFor="avatar">
            <Tooltip title="Dodaj zdjęcie">
                {badgeComponent}
            </Tooltip>
        </label>
        <input type="file" id="avatar" style={{display: "none"}}/>

    </Box>
}

export default BadgeInput;