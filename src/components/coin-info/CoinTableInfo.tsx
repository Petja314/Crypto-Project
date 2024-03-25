import {Avatar, Box, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {formattedPrice} from "../../commons/functions/formattedPrice";
import React from "react";
import {CoinDataLinksWidget} from "./coin-info-widgets/CoinDataLinksWidget";
import {useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import {ListSkeleton} from "../widgets/ListSkeleton";
import {inspect} from "util";
import styles from "../../css/coin-info/skeleton-coinInfo.module.css"

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
                                    <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formattedPrice(item.price) + currencyValue.symbol} </Box>
                                    <Box
                                        sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}
                                    >
                                        {formattedPrice(item.priceChange1d)}%(24h)
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
        {label: 'Market Cap', value: formattedPrice(item.marketCap) + currencyValue.symbol},
        {label: 'Volume', value: formattedPrice(item.volume)},
        {label: 'Available Supply', value: `${item.availableSupply} ${item.symbol}`},
        {label: 'Total supply', value: `${item.totalSupply} ${item.symbol}`},
        {label: 'Price change 1d', value: formattedPrice(item.priceChange1d) + "%"},
        {label: 'Price change 1w', value: formattedPrice(item.priceChange1w) + "%"},
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


// import {Avatar, Box, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
// import {formattedPrice} from "../../commons/functions/formattedPrice";
// import React from "react";
// import {useSelector} from "react-redux";
// import {RootState} from "../redux/ReduxStore";
// import {ListSkeleton} from "../widgets/ListSkeleton";
// import styles from "../widgets/leaderboard.module.css"
//
// type tableBodyInfoType = {
//     label: string
//     value: string | number
// }
// type CoinTableInfoPropsType = {
//     item: any,
//     currencyValue: any,
// }
// export const CoinTableInfo = ({item, currencyValue }: CoinTableInfoPropsType) => {
//     const {coinData, isLoading} = useSelector((state: RootState) => state.coinDetails)
//
//     //tableBodyInfo was made to make JSX more clear
//     const tableBodyInfo: tableBodyInfoType[] = [
//         {label: 'Market cap Rank', value: item.rank},
//         {label: 'Market Cap', value: formattedPrice(item.marketCap) + currencyValue.symbol},
//         {label: 'Volume', value: formattedPrice(item.volume)},
//         {label: 'Available Supply', value: `${item.availableSupply} ${item.symbol}`},
//         {label: 'Total supply', value: `${item.totalSupply} ${item.symbol}`},
//         {label: 'Price change 1d', value: formattedPrice(item.priceChange1d) + "%"},
//         {label: 'Price change 1w', value: formattedPrice(item.priceChange1w) + "%"},
//     ];
//
//     // console.log('coinData', coinData)
//     // console.log('isLoading' , isLoading)
//     return (
//         <Box>
//             {/*TABLE*/}
//             {!isLoading ? (
//                 <ListSkeleton columns={1}
//                               skeletonClass={styles.skeletonCoinTableDesc}
//                               variant={"rectangle"}
//                 />
//             ) : (
//                 <Paper sx={{width: "450px", borderRadius: '20px', height: "550px"}}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>
//                                     <Box sx={{display: "flex", alignItems: "center", gap: 1.5}}>
//                                         <Avatar sx={{width: "60px", height: "60px"}} src={item.icon}/>
//                                         <Box sx={{fontWeight: "bold", fontSize: "20px"}} component={"span"}>{item.name}</Box>
//                                         <Box sx={{textTransform: "uppercase"}}>{item.symbol}</Box>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Box sx={{fontWeight: "bold", fontSize: "20px", marginBottom: "5px"}}>{formattedPrice(item.price) + currencyValue.symbol} </Box>
//                                     <Box
//                                         sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}
//                                     >
//                                         {formattedPrice(item.priceChange1d)}%(24h)
//                                     </Box>
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tableBodyInfo.map((item, index: number) => (
//                                 <TableRow key={index}>
//                                     <TableCell component="th" scope="row" sx={{fontWeight: 'bold'}}>
//                                         {item.label}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography component="span" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
//                                             <Box sx={{color: item.label === 'Price change 1d' || item.label === 'Price change 1w' ? (item.value < 0 ? "#ea3943" : "#16c784") : "#fff"}}>
//                                                 {item.value}
//                                             </Box>
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//
//
//                         </TableBody>
//                     </Table>
//                 </Paper>
//
//             )
//             }
//
//
//         </Box>
//     )
// }