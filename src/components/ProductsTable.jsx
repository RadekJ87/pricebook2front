import React, {useState} from 'react';
import {Paper, TableContainer, Table, Typography, TablePagination, TableBody, TableCell, TableRow} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomizableTableHead from "./CustomizableTableHead";

const ProductsTable = ({products, columns, search}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
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
        </>
    );
};

export default ProductsTable;