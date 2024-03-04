import React, {useEffect, useRef, useState} from 'react';
import {Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, Avatar, IconButton, TextField, Select, MenuItem} from "@mui/material";
import BtcPriceWidget from "./BtcPriceWidget";
import {useDispatch, useSelector} from "react-redux";
import {actionsCryptoTable, getAllCoinsListThunk} from "../redux/CryptoTableReducer";
import {RootState} from "../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link, useNavigate} from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import usd from "../../assets/images/icons/currency_icons/USD.svg";
import gbp from "../../assets/images/icons/currency_icons/GBP.svg";
import eur from "../../assets/images/icons/currency_icons/EUR.svg";
import cad from "../../assets/images/icons/currency_icons/CAD.svg";
import aud from "../../assets/images/icons/currency_icons/AUD.svg";
import {formattedPrice} from "../../commons/formattedPrice";




const CryptoTable = () => {

    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const {marketCapList} = useSelector((state: RootState) => state.marketCoinList)
    const [fetching, setFetching] = useState(true)

    // PAGINATION
    const pageSize = 100
    const [page, setPage] = useState(1)
    //CURRENCY
    const [currencyValue, setCurrencyValue] = useState<any>({value: 'USD', symbol: "$", icon: usd})
    const currency = [
        {value: 'USD', symbol: "$", icon: usd},
        {value: 'GBP', symbol: "£", icon: gbp},
        {value: 'EUR', symbol: "€", icon: eur},
        {value: 'AUD', symbol: "$", icon: cad},
        {value: 'CAD', symbol: "$", icon: aud},
    ]

    // PRICE SORT FILTRATION
    const [priceSort, setPriceSort] = useState(true)
    // COIN FILTRATION
    const [coinValue, setCoinValue] = useState('')
    //ROW FILTRATION

    const [rowNumber, setRowNumber] = useState<any>(25)
    const rows = [25, 50, 100]

    const navigate = useNavigate();

    useEffect(() => {
        if (fetching) {
            dispatch(getAllCoinsListThunk(currencyValue.value, rowNumber, page))
            setPage((prevState) => prevState + 1)
            console.log('page' , page)
            setTimeout(() => {
                setFetching(false)
            },1000)
        }
    }, [fetching,rowNumber])

    const rowNumberHandler = async (event : any) => {
        setFetching(true)
        setRowNumber(event.target?.value)
        setPage(1);
        dispatch(actionsCryptoTable.clearRecentApiCallDataValue());
    }



    const scrollHandlerDebounced = (event: any) => {
        const element = event.currentTarget
        const bottomOfPage = element.scrollHeight - (element.scrollTop + element.clientHeight)
        if (bottomOfPage < 200) {
            console.log('hit 200!')
            setFetching(true)
        }
    }


    const sortingMultiFunction = (key: any) => {
        // console.log('key - ', key)
        setPriceSort((PrevValue) => !PrevValue)
        marketCapList.sort((a: any, b: any) => priceSort ? b[key] - a[key] : a[key] - b[key])
        if (key === "name") {
            marketCapList.sort((a: any, b: any) => (priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }
    }

    const changeCurrencyHandler = async (event : any) => {
        const selectedValue =    event.target?.value
        await dispatch(getAllCoinsListThunk(selectedValue, pageSize, 1))
        if(selectedValue) {
            const filteredCurrency = currency.find((item : any) => item.value === selectedValue)
            setCurrencyValue(filteredCurrency)
        }
    }

    const navigateToCoinPageHandler = (id: any) => {
        // console.log('id', id)
        navigate(`/coin_info/${id}`)
    }

    const findCoinHandler = () => {
        const filteredDataName = marketCapList.filter((item: any) => item.name.toUpperCase().includes(coinValue.toUpperCase()))
        return filteredDataName
    }
    const filteredDataByName = findCoinHandler()
    return (
        <Box>
            <BtcPriceWidget/>
            <TableContainer
                component={Paper}
                sx={{borderRadius: '20px', height: "1000px", overflowY: "auto"}}
                onScroll={scrollHandlerDebounced}
            >
                <Table
                    stickyHeader
                >
                    {/*TABLE HEAD*/}
                    <TableHeadComponent
                        sortingMultiFunction={sortingMultiFunction}
                        priceSort={priceSort}
                        setCoinValue={setCoinValue}
                        rowNumber={rowNumber}
                        rows={rows}
                        currencyValue={currencyValue}
                        currency={currency}
                        changeCurrencyHandler={changeCurrencyHandler}
                        rowNumberHandler={rowNumberHandler}
                    />

                    <TableBody
                    >
                        {
                            filteredDataByName.map((item: any, index: any) => (
                                <TableRow
                                    key={index}
                                    onClick={() => navigateToCoinPageHandler(item.id)}
                                >
                                    {/*<Link to={`/coin_info/${item.id}`}>*/}
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
                                    <TableCell component={'span'}
                                               sx={{color: item.priceChange1d < 0 ? "#ea3943" : "#16c784"}}>  {formattedPrice(item.priceChange1d) + currencyValue.symbol} </TableCell>
                                    <TableCell>
                                        <Box component={'span'} sx={{color: item.priceChange1w < 0 ? "#ea3943" : "#16c784"}}> {formattedPrice(item.priceChange1w) + currencyValue.symbol} </Box>
                                    </TableCell>
                                    <TableCell>{formattedPrice(item.marketCap) + currencyValue.symbol}</TableCell>
                                    {/*</Link>*/}
                                </TableRow>
                            ))
                        }
                        {
                            filteredDataByName.length <= 0 &&
                            <Box mt={2}>No matching results found.</Box>
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

const TableHeadComponent = ({ sortingMultiFunction, priceSort, setCoinValue, rowNumber, rows, currencyValue, currency,changeCurrencyHandler,rowNumberHandler}: any) => {
    const tableHeaderColumns = [
        {key: "rank", label: "Rank"},
        {key: "name", label: "Coin"},
        {key: "price", label: "Current Price"},
        {key: "totalSupply", label: "Total Supply"},
        {key: "priceChange1d", label: "Price change 1d"},
        {key: "priceChange1w", label: "Price Change 1w"},
        {key: "market_cap", label: "Market Cap"},
    ]
    const [selectedKey, setSelectedKey] = useState(null)
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" colSpan={2} sx={{background: "none"}}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <Box component={'span'}>Search by name: </Box>
                        <TextField sx={{maxWidth: "100%", width: "150px"}} onChange={(event: any) => setCoinValue(event.target.value)} type={"text"}/>

                        <Box  sx={{display: "flex", alignItems: "center", gap: 2}} >
                            <Avatar sx={{width : "30px" , height : "30px"}} src={currencyValue.icon} />
                            <Select
                                onChange={changeCurrencyHandler}
                                sx={{height : "40px"}}
                                value={currencyValue.value}
                            >
                                {
                                    currency.map((item: any, index: any) => (
                                        <MenuItem value={item.value} key={index}>
                                            {item.value}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Box>

                    </Box>
                </TableCell>

                <TableCell align="center" colSpan={2} sx={{background: "none"}}>
                    <Box component={'span'}>Rows per page: </Box>
                    <Select
                        sx={{height : "40px"}}
                        // value={rowNumber}
                        value={rowNumber || rows[0]}
                        // onChange={(event) => setRowNumber(event.target?.value)}
                        onChange={rowNumberHandler}
                    >
                        {rows.map((item: any, index: any) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>


            </TableRow>

            <TableRow
                sx={{paddingTop: "120px"}}
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
