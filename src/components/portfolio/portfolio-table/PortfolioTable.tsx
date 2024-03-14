import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {deleteCoinFromPortfolioApiFirebase, fetchPortfolioDataApiFirebase, PortfolioActions} from "../../redux/PortfolioReducer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {marketCapListArray} from "../../redux/CryptoTableReducer";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddTransactionContainer from "../add-crypto-transaction/AddTransactionContainer";

const PortfolioTable = () => {
    const dispatch: any = useDispatch()
    const {myCurrentPortfolioDataFB} = useSelector((state: any) => state.myPortfolio)
    const [selectedKey, setSelectedKey] = useState<null | string>(null) //Getting values from table head cells for filtration sortingFieldsHandler
    const [priceSort, setPriceSort] = useState<boolean>(true)
    const portfolioTableHead = [
        {key: "rank", label: "rank"},
        {key: "name", label: "name"},
        {key: "price", label: "Price"},
        {key: "totalHoldingCoinAmountCash", label: "Total Holdings Amount"},
        {key: "totalHoldingCoins", label: "Holdings"},
        {key: "averageBuyingPrice", label: "Avg. buy Price"},
        {key: "profitLoss", label: "Profit/Loss"},
        {key: "Actions", label: "Actions"},
    ]

    const sortingFieldsHandler = (key: string) => {
        setPriceSort((PrevValue: boolean) => !PrevValue)
        myCurrentPortfolioDataFB.sort((a: any, b: any) => priceSort ? b[key] - a[key] : a[key] - b[key])
        if (key === "name") {
            myCurrentPortfolioDataFB.sort((a: any, b: any) => (priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }
    }
    // console.log('myCurrentPortfolioDataFB' , myCurrentPortfolioDataFB)
    return (
        <Box sx={{marginTop: "20px", marginBottom: "20px"}}>
            {/*<Typography variant='h6' sx={{color: "#fff", marginBottom: "20px"}}>🚀 Current Portfolio</Typography>*/}
            <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{background: "red", paddingTop: "120px"}}>
                            {/*TABLE HEADER*/}
                            {
                                portfolioTableHead.map((item: any, index: any) => (
                                    <TableCell
                                        sx={{textAlign: "center", cursor: "pointer"}}
                                        key={index}
                                        onClick={() => {
                                            sortingFieldsHandler(item.key)
                                            setSelectedKey(item.key)
                                        }}>
                                        {item.label}
                                        {selectedKey === item.key && priceSort ?
                                            <ArrowDropUpIcon/>
                                            :
                                            <ArrowDropDownIcon/>
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody
                    >
                        {/*TABLE BODY*/}
                        {myCurrentPortfolioDataFB.map((item: any, index: any) => (
                            <TableRow key={index} sx={{textAlign: "center"}}>
                                <TableCell>{item.rank}</TableCell>
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
                                        <Box sx={{display: "flex", gap: 2}}>
                                            <Button sx={{padding: 0}} onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(true))}>
                                                {/*/!*<AddTransactionContainer/>*!/ - OPENTS AFTER isPortfolioDialogOpenAC become true*/}
                                                <AddCircleOutlineIcon/>
                                            </Button>

                                            <Button
                                                onClick={() => dispatch(deleteCoinFromPortfolioApiFirebase(item.id))}
                                                sx={{padding: 0}}>
                                                <DeleteIcon/>
                                            </Button>
                                        </Box>
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

