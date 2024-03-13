import {Avatar, Box, TableBody, TableCell, TableRow} from "@mui/material";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import React from "react";
import {changeCurrencyValue, marketCapListArray} from "../../redux/CryptoTableReducer";


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
                        <TableCell>{formattedPrice(item.price) + currencyValue.symbol}</TableCell>
                        <TableCell>{formattedPrice(item.totalSupply)}</TableCell>
                        <TableCell sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}>
                            {formattedPrice(item.priceChange1d) + currencyValue.symbol} </TableCell>
                        <TableCell sx={{color: item.priceChange1w < 0 ? "#ea3943" : "#16c784"}}>
                            {formattedPrice(item.priceChange1w) + currencyValue.symbol}
                        </TableCell>
                        <TableCell>{formattedPrice(item.marketCap) + currencyValue.symbol}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

