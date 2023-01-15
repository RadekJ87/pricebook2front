import React from 'react';
import Lathe from "../images/backgroundAdmin.avif";
import WallpaperDiv from "../components/WallpaperDiv";
import Box from "@mui/material/Box";
import {faMoneyBillTrendUp, faUsers, faDatabase} from '@fortawesome/free-solid-svg-icons';
import {styled} from "@mui/material/styles";
import SingleAdminOption from "../components/SingleAdminOption";


const OptionBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        '& > :not(style)': {
            margin: "10px",
            width: 165,
            height: 220,
        }
    },
    [theme.breakpoints.up('sm')]: {
        '& > :not(style)': {
            margin: "15px",
            width: 190,
            height: 250,
        }
    },
    [theme.breakpoints.up('md')]: {
        '& > :not(style)': {
            margin: "20px",
            width: 280,
            height: 400,
        }
    },
}));

const Options = () => {
    return (
        <WallpaperDiv image={Lathe}>
            <OptionBox>
                <SingleAdminOption faIcon={faUsers} text={"Użytkownicy"} url={"manage-users"} bounce/>
                <SingleAdminOption faIcon={faDatabase} primaryColor="slategray" secondaryColor="lightgray" text={"Produkty"} url={"manage-products"} bounce/>
                <SingleAdminOption faIcon={faMoneyBillTrendUp} text={"Ceny"} url={"manage-prices"} bounce/>
            </OptionBox>
        </WallpaperDiv>
    );
};

export default Options;