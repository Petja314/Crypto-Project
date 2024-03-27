import {Avatar, Box, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import {ListSkeleton} from "../widgets/ListSkeleton";
import styles from "../../css/coin-info/skeleton-coinInfo.module.css"
import {formatCurrency} from "@coingecko/cryptoformat";

type tableBodyInfoType = {
    label: string
    value: string | number
}
type CoinTableInfoPropsType = {
    currencyValue: any,
    isLoading : boolean
}
export const CoinTableInfo = ({ currencyValue , isLoading }: CoinTableInfoPropsType) => {
    const {coinData } = useSelector((state: RootState) => state.coinDetails)

    return (
        <Box>
            {/*TABLE*/}
            {!isLoading ? (
                <ListSkeleton columns={1}
                              skeletonClass={styles.skeletonCoinTableDesc}
                              variant={"rectangle"}
                />
            ) : (
                <Paper sx={{width: "450px", borderRadius: '20px', height: "550px"}}>
                {coinData.map((item: any , index : any) => (
                    <Table key={index}>
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
                                    <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formatCurrency(item.price, "USD", "en") + currencyValue.symbol} </Box>
                                    <Box
                                        sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}
                                    >
                                        {formatCurrency(item.priceChange1d, "USD", "en")}%(24h)
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableBodyCoinInfo
                                currencyValue={currencyValue}
                                item={item}
                            />
                        </TableBody>
                    </Table>
                    ))}
                </Paper>

            )
            }


        </Box>
    )
}


const TableBodyCoinInfo = ({item,currencyValue} : any) => {
    //tableBodyInfo was made to make JSX more clear
    const tableBodyInfo: tableBodyInfoType[] = [
        {label: 'Market cap Rank', value: item.rank},
        {label: 'Market Cap', value: formatCurrency(item.marketCap, "USD", "en") + currencyValue.symbol},
        {label: 'Volume', value: formatCurrency(item.volume, "USD", "en")},
        {label: 'Available Supply', value: `${item.availableSupply} ${item.symbol}`},
        {label: 'Total supply', value: `${item.totalSupply} ${item.symbol}`},
        {label: 'Price change 1d', value: formatCurrency(item.priceChange1d, "USD", "en") + "%"},
        {label: 'Price change 1w', value: formatCurrency(item.priceChange1w, "USD", "en") + "%"},
    ];


    return (
        <Box>
            {tableBodyInfo.map((item, index: number) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
                        {item.label}
                    </TableCell>
                    <TableCell>
                        <Typography component="span" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                            <Box sx={{color: item.label === 'Price change 1d' || item.label === 'Price change 1w' ? (item.value < 0 ? "#ea3943" : "#16c784") : "#fff"}}>
                                {item.value}
                            </Box>
                        </Typography>
                    </TableCell>
                </TableRow>
            ))}
        </Box>
    )
}
