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
import {PortfolioTableHeader} from "./PortfolioTableHeader";
import {PortfolioTableBody} from "./PortfolioTableBody";
import {RootState} from "../../redux/ReduxStore";

const PortfolioTable = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: RootState) => state.myPortfolio)

    return (
        <Box sx={{marginTop: "20px", marginBottom: "20px"}}>
            <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{background: "red", paddingTop: "120px"}}>
                            <PortfolioTableHeader
                                myCurrentPortfolioDataFB={myCurrentPortfolioDataFB}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <PortfolioTableBody
                            myCurrentPortfolioDataFB={myCurrentPortfolioDataFB}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PortfolioTable;



