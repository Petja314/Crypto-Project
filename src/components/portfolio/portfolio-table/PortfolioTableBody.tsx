import {useDispatch} from "react-redux";
import {Avatar, Box, Button, IconButton, TableCell, TableRow} from "@mui/material";
import {deleteCoinFromPortfolioApiFirebase, PortfolioActions, portfolioFirebaseDataType} from "../../../redux/PortfolioReducer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {AppDispatch} from "../../../redux/ReduxStore";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/dashboard/table.module.css";

type PortfolioTableBodyPropsType = {
    myCurrentPortfolioDataFB: portfolioFirebaseDataType[]
}

const PortfolioTableBody = ({myCurrentPortfolioDataFB}: PortfolioTableBodyPropsType) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const navigateToCoinPageHandler = (id: string) => {
        navigate(`/coin_info/${id}?`)
    }
    return (
        <>
            {/*TABLE BODY*/}
            {myCurrentPortfolioDataFB.map((item: portfolioFirebaseDataType, index: number) => (
                <TableRow key={index} sx={{textAlign: "center", cursor: "pointer" }}>

                    <TableCell>{item.rank}</TableCell>
                    <TableCell className={styles.tableStickyCoin} onClick={() => navigateToCoinPageHandler(item.id)}>
                        <Box sx={{display: "flex", gap: 1, alignItems: "center",flexWrap : "wrap"}}>
                            <Avatar src={item.icon}/>
                            <Box sx={{fontWeight: "bold"}}> {item.name}</Box>
                            <Box component='span' sx={{textTransform: "uppercase",}}> {item.symbol}</Box>
                        </Box>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price, "USD", "en")}</TableCell>
                    <TableCell><Box>{formatCurrency(item.totalHoldingCoinAmountCash, "USD", "en")}</Box> </TableCell>
                    <TableCell>{item.totalHoldingCoins} {item.symbol} </TableCell>
                    <TableCell>{formatCurrency(item.averageBuyingPrice, "USD", "en")}</TableCell>
                    <TableCell>{formatCurrency(item.profitLoss, "USD", "en")}</TableCell>

                    <TableCell >
                        {/*<IconButton style={{backgroundColor: 'transparent'}}>*/}
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
                        {/*</IconButton>*/}
                    </TableCell>
                </TableRow>
            ))
            }
        </>
    )
}
export default PortfolioTableBody;
