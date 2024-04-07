import {Avatar, Box, TableBody, TableCell, TableRow} from "@mui/material";
import React, {memo} from "react";
import {changeCurrencyValue, marketCapListArray} from "../../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {formatPercent} from "../../../commons/functions/percentFormatter";
import styles from "../../../css/dashboard/table.module.css"

type TableBodyCoinPropsType = {
    filteredDataByName : marketCapListArray[]
    currencyValue : changeCurrencyValue
}
export const TableBodyCoin = memo(({ filteredDataByName, currencyValue}: TableBodyCoinPropsType) => {
    const navigate: NavigateFunction = useNavigate();
    const navigateToCoinPageHandler = (id: string) => {
        navigate(`/coin_info/${id}`)
    }
    const symbol : any = currencyValue.value
    return (
        <TableBody>
            {
                filteredDataByName.map((item, index: number) => (
                    <TableRow key={index} onClick={() => navigateToCoinPageHandler(item.id)}>
                        <TableCell>{item.rank}</TableCell>
                        <TableCell className={styles.tableStickyCoin}>
                            <Box className={styles.tableBodyContentBox}>
                                <Avatar src={item.icon}/>
                                <Box className={styles.coinName}>
                                    {item.name}
                                </Box>
                                <Box component='span' className={styles.coinSymbol}>
                                    {item.symbol}
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>{formatCurrency(item.price, symbol, "en")}</TableCell>
                        <TableCell>{formatCurrency(item.totalSupply, symbol, "en")}</TableCell>
                        <TableCell sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}>
                            {formatPercent(item.priceChange1d)} </TableCell>
                        <TableCell sx={{color: item.priceChange1w < 0 ? "#ea3943" : "#16c784"}}>
                            {formatPercent(item.priceChange1w)}
                        </TableCell>
                        <TableCell>{formatCurrency(item.marketCap, symbol, "en")}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
})

