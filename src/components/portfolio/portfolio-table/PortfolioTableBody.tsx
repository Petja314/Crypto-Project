import {useDispatch} from "react-redux";
import {Avatar, Box, Button, IconButton, TableCell, TableRow} from "@mui/material";
import {deleteCoinFromPortfolioApiFirebase, PortfolioActions, portfolioFirebaseDataType} from "../../../redux/PortfolioReducer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {AppDispatch} from "../../../redux/ReduxStore";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/portfolio/portfolio.module.css";

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
                <TableRow key={index} className={styles.portfolioTableBodyRow}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className={styles.tableStickyCoin} onClick={() => navigateToCoinPageHandler(item.id)}>
                        <Box className={styles.tableNameTableCell}>
                            <Avatar src={item.icon}/>
                            <Box className={styles.coinName}>
                                {item.name}
                            </Box>
                            <Box component='span'> {item.symbol}</Box>
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
                            <Box className={styles.purchaseActions}>
                                <Button onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(true))}>
                                    {/*/!*<AddTransactionContainer/>*!/ - OPENTS AFTER isPortfolioDialogOpenAC become true*/}
                                    <AddCircleOutlineIcon/>
                                </Button>

                                <Button onClick={() => dispatch(deleteCoinFromPortfolioApiFirebase(item.id))}>
                                    <DeleteIcon/>
                                </Button>
                            </Box>
                    </TableCell>
                </TableRow>
            ))
            }
        </>
    )
}
export default PortfolioTableBody;
