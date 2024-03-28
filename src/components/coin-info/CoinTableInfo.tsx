import {Avatar, Box, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import React, {memo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import {ListSkeleton} from "../widgets/ListSkeleton";
import styles from "../../css/coin-info/skeleton-coinInfo.module.css"
import {formatCurrency} from "@coingecko/cryptoformat";
import {formatPercent} from "../../commons/functions/percentFormatter";

type tableBodyInfoType = {
    label: string
    value: string | number
}
type CoinTableInfoPropsType = {
    currencyValue: any,
    isLoading : boolean
}

/**
 * CoinTableInfo Component:
 * Displays the selected Coin data in a table format
 */


const CoinTableInfo = ({ currencyValue , isLoading }: CoinTableInfoPropsType) => {
    // coinData - An array containing data of the selected coin including price, name, symbol, etc.
    const {coinData } = useSelector((state: RootState) => state.coinDetails)
    const symbol = currencyValue.value
    return (
        <Box>
            {/*TABLE - Renders a skeleton based on the loading state.*/}
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
                                    <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formatCurrency(item.price, symbol ,"en")} </Box>
                                    <Box
                                        sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}
                                    >
                                        {formatPercent(item.priceChange1d)}
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

export default React.memo(CoinTableInfo);




const TableBodyCoinInfo = memo(({item} : any) => {
    //tableBodyInfo was made to make JSX more clear
    const tableBodyInfo: tableBodyInfoType[] = [
        {label: 'Market cap Rank',      value: item.rank},
        {label: 'Market Cap',           value: formatCurrency(item.marketCap, "USD", "en")},
        {label: 'Volume',               value: formatCurrency(item.volume, "USD", "en")},
        {label: 'Available Supply',     value: `${item.availableSupply} ${item.symbol}`},
        {label: 'Total supply',         value: `${item.totalSupply} ${item.symbol}`},
        {label: 'Price change 1d',      value: formatPercent(item.priceChange1d)},
        {label: 'Price change 1w',      value: formatPercent(item.priceChange1w)},
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
)