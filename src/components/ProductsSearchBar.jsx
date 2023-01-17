import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {OutlinedInput} from "@mui/material";
import {styled} from "@mui/material/styles";

export const SearchBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    padding: "8px",
    minWidth: "40%",
    height: "40px",
    marginBottom: "25px",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    border: "1px solid #cccccc",
    boxShadow: "0px 5px 10px 0px rgba(255,255,255,0.7)",
    transition: "all ease 0.2s",
    borderRadius: "5px",
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0px 10px 20px 2px rgba(255,255,255,0.7)'
    }
}));

const ProductsSearchBar = ({onInputChange}) => {
    return (
        <SearchBox>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
                <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                        mr: 2,
                        flex: 1,
                        fontFamily: 'Oswald',
                        fontSize: "24px",
                        textTransform: "uppercase",
                    }}>Wyszukaj produkt</Typography>
            </Box>
            <OutlinedInput onChange={onInputChange} sx={{flex: 2, fontSize: {xs: "0.8rem", md: "1rem"}}}
                           placeholder="Podaj numer rysunku"/>
        </SearchBox>
    );
};

export default ProductsSearchBar;