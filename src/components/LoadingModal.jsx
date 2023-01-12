import React from 'react';
import Paper from "@mui/material/Paper";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {GridLoader} from "react-spinners";

const LoadingModal = ({isLoading}) => {
    return (
            <Paper>
                <Modal
                    keepMounted
                    open={isLoading}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        textAlign: "center",
                        p: 4,
                    }}>
                        <GridLoader size={50} color="#36d7b7"/>
                    </Box>
                </Modal>
            </Paper>
    );
};

export default LoadingModal;