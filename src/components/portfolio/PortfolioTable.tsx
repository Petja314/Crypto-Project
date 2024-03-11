import React from 'react';
import {Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import AddTransactionContainer from "./add-transaction/AddTransactionContainer";
import {useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import {formattedPrice} from "../../commons/formattedPrice";

const PortfolioTable = () => {
    const {myCurrentPortfolioData} = useSelector((state: any) => state.myPortfolio)
    // console.log('PortfolioTable myCurrentPortfolioData : ', myCurrentPortfolioData)



    return (
        <Box sx={{
            marginTop: "20px",
            marginBottom: "20px"
        }}>

            <Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🚀 Current Portfolio</Typography>

            <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{background: "red", paddingTop: "120px"}}>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total Holdings Amount</TableCell>
                            <TableCell>Holdings</TableCell>
                            <TableCell>Avg. buy Price</TableCell>
                            <TableCell>Profit/Loss</TableCell>
                            <TableCell sx={{textAlign : "center" }} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                    >
                        {myCurrentPortfolioData.map((item: any, index: any) => (
                            <TableRow
                                key={item.id}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                                        <Avatar src={item.icon}/>
                                        <Box sx={{fontWeight: "bold"}}> {item.name}</Box>
                                        <Box component='span' sx={{textTransform: "uppercase",}}> {item.symbol}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {formattedPrice(item.price)}$
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Box>{formattedPrice(item.totalHoldingCoinAmountCash)}$</Box>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>{item.totalHoldingCoins} {item.symbol}</Box>
                                </TableCell>

                                <TableCell>{formattedPrice(item.averageBuyingPrice)}</TableCell>

                                <TableCell>{formattedPrice(item.profitLoss)}$</TableCell>
                                <TableCell sx={{display : "flex",justifyContent : "center"}} >
                                    <IconButton   style={{ backgroundColor: 'transparent' }} >
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


