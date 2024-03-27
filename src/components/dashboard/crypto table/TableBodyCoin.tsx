import {Avatar, Box, TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import {changeCurrencyValue, marketCapListArray} from "../../redux/CryptoTableReducer";
import {formatCurrency} from "@coingecko/cryptoformat";


type TableBodyCoinPropsType = {
    navigateToCoinPageHandler :(id: string) => void
    filteredDataByName : marketCapListArray[]
    currencyValue : changeCurrencyValue
}
export const TableBodyCoin = ({navigateToCoinPageHandler, filteredDataByName, currencyValue}: TableBodyCoinPropsType) => {
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
                        <TableCell>{formatCurrency(item.price, "USD", "en") + currencyValue.symbol}</TableCell>
                        <TableCell>{formatCurrency(item.totalSupply, "USD", "en")}</TableCell>
                        <TableCell sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}>
                            {formatCurrency(item.priceChange1d, "USD", "en") + currencyValue.symbol} </TableCell>
                        <TableCell sx={{color: item.priceChange1w < 0 ? "#ea3943" : "#16c784"}}>
                            {formatCurrency(item.priceChange1w, "USD", "en") + currencyValue.symbol}
                        </TableCell>
                        <TableCell>{formatCurrency(item.marketCap, "USD", "en") + currencyValue.symbol}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

