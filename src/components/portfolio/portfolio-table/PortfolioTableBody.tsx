import {useDispatch} from "react-redux";
import {Avatar, Box, Button, IconButton, TableCell, TableRow} from "@mui/material";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {deleteCoinFromPortfolioApiFirebase, PortfolioActions, portfolioFirebaseDataType} from "../../redux/PortfolioReducer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {AppDispatch} from "../../redux/ReduxStore";

type PortfolioTableBodyPropsType = {
    myCurrentPortfolioDataFB : portfolioFirebaseDataType[]
}

export const PortfolioTableBody = ({myCurrentPortfolioDataFB}: PortfolioTableBodyPropsType) => {
    const dispatch: AppDispatch = useDispatch()
    return (
        <>
            {/*TABLE BODY*/}
            {myCurrentPortfolioDataFB.map((item: portfolioFirebaseDataType , index: number) => (
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
        </>
    )
}