import {Avatar, Box, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {formattedPrice} from "../../commons/formattedPrice";
import React from "react";
import {CoinDataLinksWidget} from "./coin-info-widgets/CoinDataLinksWidget";

export const CoinTableInfo = ({item}: any) => {
    const tableBodyInfo = [
        ['Market cap Rank', item.rank],
        ['Market Cap', formattedPrice(item.marketCap) + ' $'],
        ['Volume', formattedPrice(item.volume)],
        ['Available Supply', `${item.availableSupply} ${item.symbol}`],
        ['Total supply', `${item.totalSupply} ${item.symbol}`],
        ['Price change 1d', formattedPrice(item.priceChange1d) + ' $'],
        ['Price change 1w', formattedPrice(item.priceChange1w) + ' $'],
    ]


    return (
        <Box>
            {/*TABLE*/}
            <Paper sx={{width: "450px", borderRadius: '20px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box sx={{display: "flex", alignItems: "center", gap: 1.5}}>
                                    <Avatar sx={{width: "60px", height: "60px"}} src={item.icon}/>
                                    <Box sx={{fontWeight: "bold", fontSize: "20px"}} component={"span"}>{item.name}</Box>
                                    <Box sx={{textTransform: "uppercase"}}>{item.symbol}</Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formattedPrice(item.price)} $</Box>
                                <Box
                                    sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}
                                >
                                    {formattedPrice(item.priceChange1d)}%(24h)
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBodyInfo.map(([label, value], index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
                                    {label}
                                </TableCell>
                                <TableCell>
                                    <Typography component="span" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                                        {value}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </Box>
    )
}