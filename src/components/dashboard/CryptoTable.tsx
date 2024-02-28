import React, {useEffect, useRef, useState} from 'react';
import {Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, Avatar, IconButton} from "@mui/material";
import BtcPriceWidget from "./BtcPriceWidget";
import {useDispatch, useSelector} from "react-redux";
import {getAllCoinsListThunk} from "../redux/CryptoTableReducer";
import {RootState} from "../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useNavigate} from "react-router-dom";


const CryptoTable = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const {marketCapList} = useSelector((state: RootState) => state.marketCoinList)
    const [fetching, setFetching] = useState(true)
    const pageSize = 100
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("usd")
    const [priceSort, setPriceSort] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (fetching) {
            dispatch(getAllCoinsListThunk(currency, pageSize, page))
            setPage((prevState) => prevState + 1)
            setTimeout(() => {
                setFetching(false)
            }, 5000)
        }
    }, [fetching])


    const scrollHandler = (event: any) => {
        const element = event.currentTarget
        const bottomOfPage = element.scrollHeight - (element.scrollTop + element.clientHeight)
        if (bottomOfPage < 200) {
            setFetching(true)
        }
    }

    const sortingMultiFunction = (key: any) => {
        console.log('key - ', key)
        setPriceSort((PrevValue) => !PrevValue)
        marketCapList.sort((a: any, b: any) => priceSort ? b[key] - a[key] : a[key] - b[key])
        if (key === "name") {
            marketCapList.sort((a: any, b: any) => (priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }
    }
    const formattedPrice = (price: any) => {
        return Number(price).toLocaleString('en-US')
    }
    const navigateToCoinPageHandler = (id : any) => {
        console.log('id' , id)
        navigate(`/coin_info/${id}`)
    }

    // console.log('marketCapList', marketCapList)
    return (
        <Box>
            <BtcPriceWidget/>
            <TableContainer
                component={Paper}
                sx={{borderRadius: '20px', height: "1000px", overflowY: "auto"}}
                onScroll={scrollHandler}
            >
                <Table
                    stickyHeader
                >
                    {/*TABLE HEAD*/}
                    <TableHeadComponent
                        sortingMultiFunction={sortingMultiFunction}
                        priceSort={priceSort}
                    />

                    <TableBody
                    >
                        {
                            marketCapList.map((item: any, index: any) => (
                                <TableRow
                                    key={index}
                                    onClick={() => navigateToCoinPageHandler(item.id)}
                                >
                                    <TableCell>{item.market_cap_rank}</TableCell>
                                    <TableCell>
                                        <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                                            <Avatar src={item.image}/>
                                            <Box sx={{fontWeight: "bold"}}> {item.name}</Box>
                                            <Box component='span' sx={{textTransform: "uppercase",}}> {item.symbol}</Box>
                                        </Box>

                                    </TableCell>
                                    <TableCell>{formattedPrice(item.current_price)} $</TableCell>
                                    <TableCell>{formattedPrice(item.low_24h)} $</TableCell>
                                    <TableCell> {formattedPrice(item.high_24h)} $</TableCell>
                                    <TableCell>
                                        <Box component={'span'} sx={{color: item.price_change_24h < 0 ? "#ea3943" : "#16c784"}} > {formattedPrice(item.price_change_24h)} $</Box>

                                    </TableCell>
                                    <TableCell>$ {formattedPrice(item.market_cap)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {fetching &&
                    <Box>Loading...</Box>
                }
            </TableContainer>


        </Box>
    );
};

export default CryptoTable;

const TableHeadComponent = ({sortingMultiFunction, priceSort}: any) => {
    const tableHeaderColumns = [
        {key: "market_cap_rank", label: "Rank"},
        {key: "name", label: "Coin"},
        {key: "current_price", label: "Current Price"},
        {key: "low_24h", label: "Low 24h"},
        {key: "high_24h", label: "High 24h"},
        {key: "price_change_24h", label: "Price change 24h"},
        {key: "market_cap", label: "Market Cap"}
    ]
    const [selectedKey, setSelectedKey] = useState(null)

    return (
        <TableHead>
            <TableRow
                sx={{background: "red", paddingTop: "120px"}}
            >
                {
                    tableHeaderColumns.map((item: any, index: any) => (
                        <TableCell
                            key={index}
                            onClick={() => {
                                sortingMultiFunction(item.key)
                                setSelectedKey(item.key)
                            }
                            }
                        >

                            {item.label}
                            {selectedKey === item.key && priceSort ?
                                <ArrowDropUpIcon/>
                                :
                                <ArrowDropDownIcon/>
                            }
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}
