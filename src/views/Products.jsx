import axios from "axios";
import React, {useEffect, useState} from 'react';
import WallpaperDiv from '../components/WallpaperDiv';
import test from '../images/backgroundLogin.avif';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CustomizableTableHead from "../components/CustomizableTableHead";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {OutlinedInput} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {faker} from "@faker-js/faker";
import LoadingModal from "../components/LoadingModal";


// for mockup
// const columns = [
//     {id: 'description', label: 'Opis', minWidthXS: 25, minWidthMD: 170, align: 'center'},
//     {id: 'drawing', label: 'Numer\u00a0rysunku', minWidthXS: 20, minWidthMD: 80, align: 'center'},
//     {id: 'rev', label: 'Rewizja', displayXS: "none", displayMD: "table-cell", minWidthXS: 10, minWidthMD: 40, align: 'center'},
//     {id: 'material', label: 'Numer\u00a0materiału\u00a0klienta', displayXS: "none", displayMD: "table-cell", minWidthXS: 20, minWidthMD: 150, align: 'center'},
//     {id: 'moq', label: 'MOQ', minWidthXS: 10, minWidthMD: 40, align: 'center'},
//     {id: 'price', label: 'Cena', minWidthXS: 10, minWidthMD: 40, align: 'right', format: (value) => value.toLocaleString('pl')},
// ];

// const createRandomProduct = () => {
//     return {
//         productID: faker.datatype.uuid(),
//         description: faker.commerce.product(),
//         drawing: faker.datatype.number({min: 100000, max: 99999999, precision: 1}),
//         rev: faker.datatype.number({min: 0, max: 99, precision: 1}),
//         material: faker.datatype.number({min: 100000, max: 9999999999, precision: 1}),
//         moq: faker.datatype.number({min: 1, max: 1000, precision: 1}),
//         price: faker.finance.amount(0.01, 1000, 2, '€'),
//     };
// }
//
// export const products = [];
//
// Array.from({length: 50}).forEach(() => {
//     products.push(createRandomProduct());
// });

// API
const columns = [
    {id: 'description', label: 'Opis', minWidthXS: 25, minWidthMD: 170, align: 'center'},
    {id: 'drawingNumber', label: 'Numer\u00a0rysunku', minWidthXS: 20, minWidthMD: 80, align: 'center'},
    {
        id: 'revision',
        label: 'Rewizja',
        displayXS: "none",
        displayMD: "table-cell",
        minWidthXS: 10,
        minWidthMD: 40,
        align: 'center'
    },
    {
        id: 'itemNumber',
        label: 'Numer\u00a0materiału\u00a0klienta',
        displayXS: "none",
        displayMD: "table-cell",
        minWidthXS: 20,
        minWidthMD: 150,
        align: 'center'
    },
    {id: 'moq', label: 'MOQ', minWidthXS: 10, minWidthMD: 40, align: 'center'},
    {
        id: 'price',
        label: 'Cena',
        minWidthXS: 10,
        minWidthMD: 40,
        align: 'right',
        format: (value) => value.toLocaleString('pl')
    },
];


const Products = () => {
    // @TODO reducer, rozważyć użycie LoadingModal
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        // setIsLoading(true);
        const fetchProducts = async () => {
            const res = await axios.get(`https://pricebooktwo-api.onrender.com/api/products/${search}`);
            setProducts(res.data)
            // setIsLoading(false);
        }
        fetchProducts().catch(console.error);
    }, [search])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <WallpaperDiv position="absolute" image={test}>
            <Box sx={{
                width: {xs: '380px', md: "1024px", xl: "1600px"},
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
                <Box className="search" sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 1,
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
                }}>
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
                    <OutlinedInput onChange={handleInputChange} sx={{flex: 2, fontSize: {xs: "0.8rem", md: "1rem"}}}
                                   placeholder="Podaj numer rysunku"/>
                </Box>
                {/*<LoadingModal isLoading={isLoading}/>*/}
                {!!products.length ? (<Paper sx={{width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 640}}>
                            <Table stickyHeader aria-label="sticky table">
                                <CustomizableTableHead columns={columns}/>
                                <TableBody>
                                    {products
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {_id: productID, description} = row;
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={productID}
                                                          onClick={() => console.log(`Klinknięto product ${description} o ID ${productID} `)}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} sx={{
                                                                display: {
                                                                    xs: column.displayXS,
                                                                    md: column.displayMD
                                                                }
                                                            }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            labelRowsPerPage='Produktów na stronę:'
                            component="div"
                            count={products.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelDisplayedRows={(from = page) => (`${from.from}-${from.to === -1 ? from.count : from.to} z ${from.count}`)}
                        />
                    </Paper>)
                    :
                    (<Paper sx={{
                        fontFamily: 'Oswald',
                        width: '100%',
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                    }}>
                        <ErrorOutlineIcon/>
                        <Typography variant="h6">Nie znaleziono w bazie produktu o numerze rysunku {search}</Typography>
                    </Paper>)}
            </Box>
        </WallpaperDiv>
    );
};

export default Products;

