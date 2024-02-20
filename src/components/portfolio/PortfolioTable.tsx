import React from 'react';
import {Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import AddTransaction from "./AddTransaction";

const PortfolioTable = () => {
    return (
        <Box sx={{
            marginTop: "20px",
            marginBottom : "20px"
        }} >

            <Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🚀 Current Portfolio</Typography>

            <TableContainer component={Paper}sx={{borderRadius: '20px'}}  >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{background: "red", paddingTop: "120px"}} >
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Holdings</TableCell>
                            <TableCell>Avg. buy Price</TableCell>
                            <TableCell>Profit/Loss</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                    >
                        {tableDataPortfolio.map(item => (
                                <TableRow
                                    key={item.id}
                                >
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.holdings}</TableCell>
                                    <TableCell>{item.average_price}</TableCell>
                                    <TableCell>{item.profit}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <AddTransaction/>
                                            {/*<AddIcon/>*/}
                                            {/*BUY AND SELL CRYPTO*/}
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default PortfolioTable;


export const tableDataPortfolio = [{
    "id": 1,
    "name": "ZEN",
    "price": 2.93,
    "holdings": "4000",
    "average_price": 2.20,
    "profit": 1523.99,
}, {
    "id": 2,
    "name": "BTC",
    "price": 2.22,
    "holdings": "350",
    "average_price": 2.20,
    "profit": 1523.99,
},
    {
        "id": 3,
        "name": "XRP",
        "price": 5.85,
        "holdings": "321",
        "average_price": 2.20,
        "profit": 1523.99,
    }, {
        "id": 4,
        "name": "ETH",
        "price": 2900.36,
        "holdings": "444",
        "average_price": 2.20,
        "profit": 1523.99,
    },
    {
        "id": 5,
        "name": "ETC",
        "price": 157.00,
        "holdings": "213",
        "average_price": 2.20,
        "profit": 1523.99,
    },
]
