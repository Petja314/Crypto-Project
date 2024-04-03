import React, {ReactNode, useState} from "react";
import {Avatar, Box, MenuItem, Select, SelectChangeEvent, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import usd from "../../../assets/images/icons/currency_icons/USD.svg";
import gbp from "../../../assets/images/icons/currency_icons/GBP.svg";
import eur from "../../../assets/images/icons/currency_icons/EUR.svg";
import cad from "../../../assets/images/icons/currency_icons/CAD.svg";
import aud from "../../../assets/images/icons/currency_icons/AUD.svg";
import {actionsCryptoTable, changeCurrencyValue, getAllCoinsListThunk} from "../../../redux/CryptoTableReducer";
import {AppDispatch, RootState} from "../../../redux/ReduxStore";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../../css/dashboard/table.module.css"


type TableHeadPropsType = {
    rowNumberHandler: (event: any) => void
    sortingFieldsHandler: (key: string) => void
    priceSort: boolean,
    selectedKey : null | string
}
type tableHeaderColumnsType = {
    key: string,
    label: string,
}
export const TableHeadComponent = ({rowNumberHandler, sortingFieldsHandler, priceSort,selectedKey}: TableHeadPropsType) => {
    const tableHeaderColumns: tableHeaderColumnsType[] = [
        {key: "rank", label: "Rank"},
        {key: "name", label: "Coin"},
        {key: "price", label: "Current Price"},
        {key: "totalSupply", label: "Total Supply"},
        {key: "priceChange1d", label: "Price change 1d"},
        {key: "priceChange1w", label: "Price Change 1w"},
        {key: "market_cap", label: "Market Cap"},
    ]
    return (
        <TableHead>
            <TableHeadFiltration rowNumberHandler={rowNumberHandler}/>
            <TableRow className={styles.tableHeadRow}>
                {
                    tableHeaderColumns.map((item, index: number) => (
                        <TableCell key={index}
                                   onClick={() => {
                                       sortingFieldsHandler(item.key)
                                   }}
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


type TableHeadFiltrationPropsType = {
    rowNumberHandler: (event: any) => void
}
const TableHeadFiltration = ({rowNumberHandler}: TableHeadFiltrationPropsType) => {
    const {currencyValue, rowsPerPage, rows} = useSelector((state: RootState) => state.marketCoinList)
    const dispatch: AppDispatch = useDispatch()
    const currency: changeCurrencyValue[] = [
        {value: 'USD', symbol: "$", icon: usd},
        {value: 'GBP', symbol: "£", icon: gbp},
        {value: 'EUR', symbol: "€", icon: eur},
        {value: 'AUD', symbol: "$", icon: cad},
        {value: 'CAD', symbol: "$", icon: aud},
    ]
    // Filtration by currency
    const changeCurrencyHandler =  (event: SelectChangeEvent<any>, child: ReactNode) => {
        const selectedValue = event.target?.value
        if (selectedValue) {
            const filteredCurrency = currency.find((item): boolean => item.value === selectedValue) //find the currency to change it with api call
            dispatch(actionsCryptoTable.setCurrencyValueAC(filteredCurrency))
            dispatch(actionsCryptoTable.clearRecentApiCallDataValue()); // clearing current array to display new values
        }
            dispatch(getAllCoinsListThunk(selectedValue, rowsPerPage, 1)) // display new values
    }

    return (
        <TableRow
            // sx={{borderBottom: "none"}}
        >
            {/*FILTRATION*/}
            <TableCell align="center" colSpan={5} className={styles.tableFiltrationCell}>
                <Box className={styles.filtrationBoxContent}>
                    <Box component={'span'}>Search by name: </Box>
                    <TextField
                        className={styles.filterByNameInput}
                        onChange={(event: React.ChangeEvent<any>) => dispatch(actionsCryptoTable.setCoinSearchValueAC(event.target.value))}
                        type={"text"}
                    />
                    <Box className={styles.searchFilterWrapper}>
                        <Avatar className={styles.currencyIcon} src={currencyValue.icon}/>
                        <Select onChange={changeCurrencyHandler} className={styles.filterCurrencySelector} value={currencyValue.value}>
                            {
                                currency.map((item, index: number) => (
                                    <MenuItem value={item.value} key={index}>
                                        {item.value}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Box>
                </Box>
            </TableCell>

            {/*ROWS*/}
            <TableCell align="center" colSpan={2} className={styles.filterRowsCell}>
                <Box component={'span'}>Rows per page: </Box>
                <Select
                    className={styles.filterRowSelector}
                    value={rowsPerPage || rows[0]}
                    onChange={rowNumberHandler}
                >
                    {rows.map((item: number, index: number) => (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
        </TableRow>
    )
}