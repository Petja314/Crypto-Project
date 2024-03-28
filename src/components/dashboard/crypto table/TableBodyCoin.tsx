import {Avatar, Box, TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import {actionsCryptoTable, changeCurrencyValue, marketCapListArray} from "../../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";
import {memo} from "react"
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {formatPercent} from "../../../commons/functions/percentFormatter";

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
                        <TableCell>
                            <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                                <Avatar src={item.icon}/>
                                <Box sx={{fontWeight: "bold"}}> {item.name}</Box>
                                <Box component='span' sx={{textTransform: "uppercase",}}> {item.symbol}</Box>
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

