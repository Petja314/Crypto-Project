import React, {useEffect, useRef, useState} from 'react';
import {Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button, Avatar, IconButton, TextField, Select, MenuItem, CircularProgress} from "@mui/material";
import PortfolioBalanceWidget from "../../widgets/PortfolioBalanceWidget";
import {useDispatch, useSelector} from "react-redux";
import {actionsCryptoTable, getAllCoinsListThunk, handlingTableByRowNumbersThunk, marketCapListArray} from "../../redux/CryptoTableReducer";
import {RootState} from "../../redux/ReduxStore";
import {ThunkDispatch} from "redux-thunk";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import usd from "../../../assets/images/icons/currency_icons/USD.svg";
import gbp from "../../../assets/images/icons/currency_icons/GBP.svg";
import eur from "../../../assets/images/icons/currency_icons/EUR.svg";
import cad from "../../../assets/images/icons/currency_icons/CAD.svg";
import aud from "../../../assets/images/icons/currency_icons/AUD.svg";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import {TableHeadComponent} from "./TableHeadComponent";
import {TableBodyCoin} from "./TableBodyCoin";

const CryptoTable = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const {marketCapList, coinValue, currencyValue, rowsPerPage, fetching, page} = useSelector((state: RootState) => state.marketCoinList)
    const [priceSort, setPriceSort] = useState<boolean>(true)

    useEffect(() => {
        //Fetching coin list data
        if (fetching) {
            dispatch(getAllCoinsListThunk(currencyValue.value, rowsPerPage, page))
            dispatch(actionsCryptoTable.setPageAC(page + 1))
            setTimeout(() => {
                dispatch(actionsCryptoTable.setFetchingAC(false))
            }, 1000)
        }
    }, [fetching, rowsPerPage])

    const navigateToCoinPageHandler = (id: string) => {
        navigate(`/coin_info/${id}`)
    }

    //Function for filtering rows per page
    const rowNumberHandler = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRowValue = Number(event.target?.value)
        console.log('selectedRowValue' , selectedRowValue)
        dispatch(handlingTableByRowNumbersThunk(true, selectedRowValue,1))
    }
    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const element = event.currentTarget
        const bottomOfPage = element.scrollHeight - (element.scrollTop + element.clientHeight)
        if (bottomOfPage < 200) {
            // console.log('hit 200!')
            dispatch(actionsCryptoTable.setFetchingAC(true))
        }
    }

    // Function to sort table fields alphabetically or numerically
    const sortingFieldsHandler = (key: string) => {
        // console.log('key - ', key)
        setPriceSort((PrevValue: boolean) => !PrevValue)
        marketCapList.sort((a : marketCapListArray, b: marketCapListArray)  => priceSort ? b[key] - a[key] : a[key] - b[key])
        if (key === "name") {
            marketCapList.sort((a:marketCapListArray, b:marketCapListArray) => (priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }
    }
    // Function that creates a new array with the ability to search by name
     const findCoinHandler = () => {
        const filteredDataName : marketCapListArray[] = marketCapList.filter((item) => item.name.toUpperCase().includes(coinValue.toUpperCase()))
        return filteredDataName
    }
    //New array to display in JSX
    const filteredDataByName: marketCapListArray[] = findCoinHandler()

    // console.log('fetching , ' ,fetching)
    return (
        <TableContainer
            component={Paper}
            sx={{borderRadius: '20px', height: "1000px", overflowY: "auto", cursor: "pointer"}}
            onScroll={scrollHandler}
        >
            <Table stickyHeader>
                {/*TABLE HEAD*/}
                <TableHeadComponent
                    sortingFieldsHandler={sortingFieldsHandler}
                    priceSort={priceSort}
                    rowNumberHandler={rowNumberHandler}
                />
                {/*TABLE BODY*/}
                <TableBodyCoin
                    navigateToCoinPageHandler={navigateToCoinPageHandler}
                    filteredDataByName={filteredDataByName}
                    currencyValue={currencyValue}
                />
            </Table>

            {/*PRELOADER && NOTIFICATIONS */}
            <Box sx={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
                {fetching ? (
                    <CircularProgress/>
                ) : (
                    filteredDataByName.length <= 0 && <Box>No matching results found. <CircularProgress/> </Box>
                )}
            </Box>
        </TableContainer>
    );
};

export default CryptoTable;





