import React from 'react';
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableHead from "@mui/material/TableHead";

const CustomizableTableHead = ({columns}) => {
    return (
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                                display: {xs: column.displayXS, md: column.displayMD},
                                minWidth: {xs: column.minWidthXS, md: column.minWidthMD},
                                fontFamily: 'Oswald',
                                fontSize: '16px',
                                letterSpacing: '0.5px',
                                backgroundColor: "#E8F0FE"}}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
    );
};

export default CustomizableTableHead;