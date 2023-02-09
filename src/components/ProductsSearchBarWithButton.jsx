import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {OutlinedInput} from "@mui/material";
import {SearchBox} from "./ProductsSearchBar";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';

const ProductsSearchBarWithButton = ({onSearch}) => {
    const searchForm = useRef("");


    const handleSearchEvent = () => {
        const form = searchForm.current
        onSearch(`${form['search'].value}`);
    }

    const handleClearEvent = () => {
        searchForm.current.reset();
        searchForm.current.value = '';
        // console.log(searchForm.current.value === undefined ? "jest undefined" : "nie jest undefined");
        // console.log('jest', searchForm.current.value);
        onSearch(searchForm.current.value);
    }

    return (
        <SearchBox sx={{
            flexDirection: {xs: "column", sm: "row"},
            alignItems : {xs: "center"},
            minWidth: {sm: "97%", md: "50%"},
            gap: {xs: "8px", md: "16px"},
            marginBottom: {xs: "10px", md: "25px"}
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
            }}>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                        // mr: 2,
                        flex: 1,
                        fontFamily: 'Oswald',
                        fontSize: {xs: "14px", md: "24px"},
                        textTransform: "uppercase",
                    }}>Podaj numer rysunku</Typography>
            </Box>
            <form ref={searchForm}>
                <OutlinedInput name="search" size="small"/>
            </form>
            <Button variant="outlined" color="inherit" startIcon={<SearchIcon />} type="submit" onClick={handleSearchEvent}>
                Wyszukaj
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<BackspaceIcon />} onClick={handleClearEvent}>
                Wyczyść
            </Button>
        </SearchBox>

    );
};

export default ProductsSearchBarWithButton;

// onChange={(e)=>setInput(e.target.value)}