import React from 'react';
import {Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import AddTransactionContainer from "./AddTransactionContainer";
import {useSelector} from "react-redux";
import {formattedPrice} from "../../../commons/formattedPrice";

const PortfolioTable = () => {
    const {myCurrentPortfolioData} = useSelector((state: any) => state.myPortfolio)
    const portfolioTableHead = [
        {key: "Id", label: "Id"},
        {key: "Name", label: "Name"},
        {key: "Price", label: "Price"},
        {key: "Total Holdings Amount", label: "Total Holdings Amount"},
        {key: "Holdings", label: "Holdings"},
        {key: "Avg. buy Price", label: "Avg. buy Price"},
        {key: "Profit/Loss", label: "Profit/Loss"},
        {key: "Actions", label: "Actions"},
    ]


    return (
        <Box sx={{marginTop: "20px", marginBottom: "20px"}}>
            <Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🚀 Current Portfolio</Typography>
            <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{background: "red", paddingTop: "120px"}}>
                            {/*TABLE HEAD*/}
                            {
                                portfolioTableHead.map((item: any) => (
                                    <TableCell sx={{textAlign: "center"}}>
                                        {item.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody
                    >
                        {myCurrentPortfolioData.map((item: any, index: any) => (
                            <TableRow key={item.id} sx={{textAlign: "center"}}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Box sx={{display: "flex", gap: 1, alignItems: "center",}}>
                                        <Avatar src={item.icon}/>
                                        <Box sx={{fontWeight: "bold"}}> {item.name}</Box>
                                        <Box component='span' sx={{textTransform: "uppercase",}}> {item.symbol}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{formattedPrice(item.price)}$</TableCell>
                                <TableCell><Box>{formattedPrice(item.totalHoldingCoinAmountCash)}$</Box> </TableCell>
                                <TableCell>{item.totalHoldingCoins} {item.symbol} </TableCell>
                                <TableCell>{formattedPrice(item.averageBuyingPrice)}</TableCell>
                                <TableCell>{formattedPrice(item.profitLoss)}$</TableCell>
                                <TableCell sx={{display: "flex", justifyContent: "center"}}>
                                    <IconButton style={{backgroundColor: 'transparent'}}>
                                        {/*BUY AND SELL CRYPTO*/}
                                        <AddTransactionContainer
                                            coinId={item.id}
                                        />
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


